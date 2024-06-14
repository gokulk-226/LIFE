// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB (replace 'your-database-url' with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/LIFE', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema for registration data
const registrationSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  phoneNo: String,
  address: String,
  amount: Number,
  policyType: String
});

// Create a model based on the schema
const Registration = mongoose.model('Registration', registrationSchema);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST endpoint for registering users
app.post('/api/register', async (req, res) => {
  try {
    // Create a new Registration document based on the request body
    const newRegistration = new Registration(req.body);

    // Save the new registration to the database
    await newRegistration.save();

    // Send a success response back to the client
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
