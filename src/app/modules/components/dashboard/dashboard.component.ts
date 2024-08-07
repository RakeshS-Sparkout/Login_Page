import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  router: Router = inject(Router);

  logout(){
    localStorage.removeItem('currentUser');

    alert("You are now logged out....")

    this.router.navigate(['/login']);
  }

}
