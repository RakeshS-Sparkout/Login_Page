import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  router: Router = inject(Router);

  canActivate(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user) {
      // User is logged in
      return true; 
    } else {
      // User is not logged in, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
