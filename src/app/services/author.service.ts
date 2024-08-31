import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, Book } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'https://08e2-156-222-185-179.ngrok-free.app/admin/authors';

  constructor(private http: HttpClient) {}

  // Fetch all authors
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  // Add a new author
  addAuthor(author: Author): Observable<any> {
    return this.http.post(this.apiUrl, author);
  }

  // Update an existing author
  updateAuthor(id: number, author: Partial<Author>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, author);
  }

  // Delete an author
  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Get the most popular authors
  getPopularAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/popular`);
  }

  // Get books by a specific author
  getBooksByAuthor(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/${authorId}/books`);
  }
}
