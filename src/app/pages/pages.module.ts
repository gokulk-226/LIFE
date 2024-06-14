// pages.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component'; // Ensure correct path

@NgModule({
  declarations: [
    RegisterComponent // Declare RegisterComponent here
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisterComponent // Export RegisterComponent if needed in other modules
  ]
})
export class PagesModule { }
