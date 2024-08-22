import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../services/author.service';
import { Author } from '../models';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-authors',
  standalone: true,
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  imports: [CommonModule]
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];

  constructor(private authorService: AuthorService, private router: Router) {}

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }

  viewAuthorDetails(authorId: number) {
    this.router.navigate(['/author-details', authorId]);
  }
}
