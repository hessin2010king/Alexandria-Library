import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5000/admin/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  updateBook(id: number, book: Partial<Book>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPopularBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books/popular`);
  }
}
