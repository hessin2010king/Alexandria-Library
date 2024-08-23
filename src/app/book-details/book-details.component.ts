import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book, Review } from '../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  imports: [CommonModule]
})
export class BookDetailsComponent implements OnInit {
  book: Book = {} as Book;
  reviews: Review[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadBookDetails();
  }

  loadBookDetails(): void {
    const bookId = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(bookId).subscribe(
      data => {
        console.log('Book data:', data);  // Add this line

        this.book = data;
        this.loadReviews(bookId);
      },
    );
  }

  loadReviews(bookId: number): void {
    this.bookService.getReviews(bookId).subscribe(
      reviews => this.reviews = reviews,
    );
  }

  getStars(rating: number): string {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  
}
