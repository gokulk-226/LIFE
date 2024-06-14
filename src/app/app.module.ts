// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module'; // Import PagesModule

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PolicyComponent,
    AboutComponent,
    ContactComponent
    // RegisterComponent is removed from declarations here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PagesModule // Add PagesModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
