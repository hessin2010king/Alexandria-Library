import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminApiUrl = 'http://localhost:5000/admin/login';
  private userApiUrl = 'http://localhost:5000/user/login'; // User login API URL
  private userSignupApiUrl = 'http://localhost:5000/user/signup'; // User signup API URL

  constructor(private http: HttpClient) {}

  // Admin login method
  adminLogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.adminApiUrl, { username, password });
  }

  // User login method
  userLogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.userApiUrl, { username, password });
  }

  // User signup method
  userSignup(username: string, password: string, firstName: string, lastName: string, email: string): Observable<any> {
    return this.http.post<any>(this.userSignupApiUrl, { username, password, firstName, lastName, email });
  }

  logout(): void {
    localStorage.removeItem('user'); // Clear user state
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Check if user is logged in
  }
}
