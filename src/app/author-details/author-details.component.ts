import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../services/author.service';
import { Book } from '../models';

@Component({
  selector: 'app-author-details',
  standalone: true,
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css'],
  imports: [CommonModule]
})
export class AuthorDetailsComponent implements OnInit {
  books: Book[] = [];
  authorId!: number;

  constructor(private route: ActivatedRoute, private authorService: AuthorService) {}

  ngOnInit() {
    this.authorId = +this.route.snapshot.paramMap.get('id')!;
    this.loadBooksByAuthor();
  }

  loadBooksByAuthor() {
    this.authorService.getBooksByAuthor(this.authorId).subscribe(data => {
      this.books = data;
    });
  }
}
