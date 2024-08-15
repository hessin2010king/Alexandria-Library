import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'http://localhost:4200/admin/authors';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  addAuthor(author: Author): Observable<any> {
    return this.http.post(this.apiUrl, author);
  }

  updateAuthor(id: number, author: Author): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, author);
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPopularAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/authors/popular`);
  }
}
