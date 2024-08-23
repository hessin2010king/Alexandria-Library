import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../services/book.service';
import { Book } from '../models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  imports: [CommonModule]
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService, 
    private modalService: NgbModal,
    private router: Router

  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooksWithDetails().subscribe(data => {
      this.books = data;
    });
  }
  viewBookDetails(bookId: number) {
    this.router.navigate(['/book-details', bookId]);
  }
}
