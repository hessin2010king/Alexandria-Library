import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule] // No need to import HttpClientModule here
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response.success && response.role === 'admin') {
          // No token management needed
          this.router.navigate(['/admin']);  // Redirect to admin page
        } else {
          alert('Invalid credentials or unauthorized access');
        }
      },
      (error: any) => {
        console.error('Login error:', error); // Log the error for debugging
        alert('Login failed');
      }
    );
  }
}
