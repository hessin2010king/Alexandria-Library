import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Book, Category, Author, Review } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksApiUrl = 'http://localhost:5000/admin/books';
  private categoriesApiUrl = 'http://localhost:5000/admin/categories';
  private authorsApiUrl = 'http://localhost:5000/admin/authors';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksApiUrl);
  }

  addBook(book: Book): Observable<any> {
    return this.http.post(this.booksApiUrl, book);
  }

  updateBook(id: number, book: Partial<Book>): Observable<any> {
    return this.http.put(`${this.booksApiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.booksApiUrl}/${id}`);
  }

  getPopularBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.booksApiUrl}/popular`);
  }

  getReviews(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`http://localhost:5000/admin/books/${bookId}/reviews`);
  }

  getBooksWithDetails(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksApiUrl).pipe(
      switchMap(books => 
        this.http.get<Category[]>(this.categoriesApiUrl).pipe(
          switchMap(categories => 
            this.http.get<Author[]>(this.authorsApiUrl).pipe(
              map(authors => 
                books.map(book => ({
                  ...book,
                  categoryName: categories.find(c => c.id === book.categoryId)?.name || 'Unknown',
                  authorName: authors.find(a => a.id === book.authorId)?.firstName + ' ' + (authors.find(a => a.id === book.authorId)?.lastName || '') || 'Unknown'
                }))
              )
            )
          )
        )
      )
    );
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksApiUrl}/${id}`).pipe(
      map(book => {
        return {
          ...book,
          // No need to map categoryName and authorName here if already included in the response
        };
      })
    );
  }
  
}
