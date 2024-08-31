import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Book } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://08e2-156-222-185-179.ngrok-free.app/admin/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
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
