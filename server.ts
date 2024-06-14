import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// Connect to MongoDB
const dbUri = 'mongodb://localhost:27017/LIFE'; // Replace with your MongoDB URI
mongoose.connect(dbUri);

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  policyType: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Middleware
  server.use(json());

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // API endpoint for registration
  server.post('/api/register', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to register user' });
    }
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
 