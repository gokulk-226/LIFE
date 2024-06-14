import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      age: [null, Validators.required],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      amount: [null, Validators.required],
      policyType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post<any>('http://localhost:3000/api/register', this.registerForm.value)
        .subscribe(response => {
          console.log('Data sent to server:', response);
          this.registerForm.reset(); // Reset the form after successful submission
          this.errorMessage = ''; // Clear any previous error message
        }, error => {
          console.error('Error occurred:', error);
          this.errorMessage = 'An error occurred. Please try again later.'; // Display error message
        });
    }
  }
}
