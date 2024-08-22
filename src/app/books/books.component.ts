import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../services/book.service';
import { Book } from '../models';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  imports: [CommonModule]
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooksWithDetails().subscribe(data => {
      this.books = data;
    });
  }
}
