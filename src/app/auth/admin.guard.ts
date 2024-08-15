import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if there is a token in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // You might want to add more sophisticated token validation here
      // For example, decode the token and check the role
      const user = this.decodeToken(token);  // Decoding token to get user role
      if (user && user.role === 'admin') {
        return true;
      }
    }

    this.router.navigate(['/home']); // Redirect to login page if not authenticated or not an admin
    return false;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    } catch (e) {
      return null; // Return null if decoding fails
    }
  }
}
