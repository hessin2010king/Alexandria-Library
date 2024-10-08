import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Category, Book } from '../models';
import { environment } from '../../environments/environment'; // Import the environment file

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/admin/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError('Error fetching categories. Please try again later.');
      })
    );
  }

  addCategory(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });
  }

  updateCategory(id: number, name: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { name });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPopularCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/popular`);
  }

  getBooksByCategory(categoryId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/${categoryId}/books`);
  }
}
