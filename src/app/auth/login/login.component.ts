import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  router: Router = inject(Router);

  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  login(){

    this.errorMessage = '';

    if (this.loginForm.invalid){
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u: any) => u.email ===this.loginForm.value.email);

    if (!user){
      this.errorMessage = 'Email is not registered yet';
      return;
    }

    if (user.password !== this.loginForm.value.password){
      this.errorMessage = 'Incorrect Password';
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user)); 

    alert("Welcome to the app...");

    this.router.navigate(['/dashboard']);

    console.log(this.loginForm.value);
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
