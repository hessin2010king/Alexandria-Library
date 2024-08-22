import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/admin/login';

  constructor(private http: HttpClient) {}

  adminlogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  logout(): void {
    localStorage.removeItem('user'); // Clear user state
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Check if user is logged in
  }
}
