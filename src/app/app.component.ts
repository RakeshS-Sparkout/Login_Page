import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Login_Page';
  router: Router = inject(Router);

ngOnInit(): void {
  initFlowbite();
  const user = localStorage.getItem('currentUser');
    if (user) {
      // If the user is logged in, redirect to the dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // If the user is not logged in, redirect to the login page
      this.router.navigate(['/login']);
    }
}
}
