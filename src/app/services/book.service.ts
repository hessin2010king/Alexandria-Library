import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return forkJoin([
      this.getBooks(),
      this.http.get<Category[]>(this.categoriesApiUrl),
      this.http.get<Author[]>(this.authorsApiUrl)
    ]).pipe(
      map(([books, categories, authors]) => {
        return books.map(book => ({
          ...book,
          categoryName: categories.find(c => c.id === book.categoryId)?.name || 'Unknown',
          authorName: authors.find(a => a.id === book.authorId)?.firstName + ' ' + (authors.find(a => a.id === book.authorId)?.lastName || '') || 'Unknown'
        }));
      })
    );
  }

  getBookById(id: number): Observable<Book> {
    return forkJoin([
      this.http.get<Book>(`${this.booksApiUrl}/${id}`),
      this.http.get<Category[]>(this.categoriesApiUrl),
      this.http.get<Author[]>(this.authorsApiUrl)
    ]).pipe(
      map(([book, categories, authors]) => {
        return {
          ...book,
          categoryName: categories.find(c => c.id === book.categoryId)?.name || 'Unknown',
          authorName: authors.find(a => a.id === book.authorId)?.firstName + ' ' + (authors.find(a => a.id === book.authorId)?.lastName || '') || 'Unknown'
        };
      })
    );
  }



  // Public methods for getting category and author names
  getCategoryName(categoryId: number, categories: Category[]): string {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  }

  getAuthorName(authorId: number, authors: Author[]): string {
    const author = authors.find(a => a.id === authorId);
    return author ? `${author.firstName} ${author.lastName || ''}` : 'Unknown';
  }
}
