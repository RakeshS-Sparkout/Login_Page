import { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

  // Custom Validator Function
  export function matchPasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirm')?.value;
  
      if (password !== confirmPassword) {
        return { passwordsMismatch: true }; // Return error object if passwords don't match
      }
  
      return null; // Return null if passwords match
    };
  }

  export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
  
      if (!password) {
        return null; 
      }
  
      // Check password conditions
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isValidLength = password.length >= 8;
  
      // Check if all conditions are met
      const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
  
      return !valid ? { passwordStrength: true } : null; // Return error object if invalid
    };
  }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  router: Router = inject(Router)

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      confirm: new FormControl('', Validators.required)
    }, { validators: matchPasswordsValidator()});
  }
  
  register(){

    this.errorMessage = '';

    if (this.registerForm.invalid){
      return
    }

    //Retrieve existing users from local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    //Creating new user
    const newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

     // Check if the email already exists
     const existingUser = users.find((user: any) => user.email === this.registerForm.value.email);
     if (existingUser) {
       this.errorMessage = 'Email is already registered';
       return;
     }

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/login']);

    console.log('Registered Users:', users);
  }

}

