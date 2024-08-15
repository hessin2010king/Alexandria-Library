import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storeToken(token: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:4200/admin/login'; // Your API endpoint

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  logout(): void {
    // Clear local storage or any other logout-related tasks
    localStorage.removeItem('token');
  }
}
