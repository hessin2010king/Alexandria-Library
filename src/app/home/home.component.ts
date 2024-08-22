import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { CategoryService } from '../services/category.service';
import { AuthService } from '../services/auth.service';
import { BooksListComponent } from '../books-list/books-list.component';
import { ReadListComponent } from '../read-list/read-list.component';
import { CurrentlyReadingComponent } from '../currently-reading/currently-reading.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BooksListComponent,
    ReadListComponent,
    CurrentlyReadingComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors: any[] = [];
  books: any[] = [];
  categories: any[] = [];
  currentTab: string = 'books-list'; // Default tab
  username: string = ''; // Bind username
  password: string = ''; // Bind password
  isLoggedIn: boolean = false; // Track login status

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPopularAuthors();
    this.loadPopularBooks();
    this.loadPopularCategories();
    this.isLoggedIn = this.authService.isLoggedIn(); // Check login status on initialization
  }

  loadPopularAuthors(): void {
    this.authorService.getPopularAuthors().subscribe((data: any) => {
      this.authors = data;
    });
  }

  loadPopularBooks(): void {
    this.bookService.getPopularBooks().subscribe((data: any) => {
      this.books = data;
    });
  }

  loadPopularCategories(): void {
    this.categoryService.getPopularCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  onLogin(): void {
    this.authService.userLogin(this.username, this.password).subscribe(
      (response: any) => {
        if (response.success && response.role === 'user') {
          localStorage.setItem('user', JSON.stringify(response.user)); // Store user details in localStorage
          this.isLoggedIn = true; // Update login status
        } else {
          alert('Invalid credentials or not authorized'); // Show error message
        }
      },
      (error: any) => {
        console.error('Login error:', error); // Log error
        alert('Login failed'); // Show error message
      }
    );
  }

  logout(): void {
    this.authService.logout(); // Clear user session
    this.isLoggedIn = false; // Update login status
    localStorage.removeItem('user'); // Clear user from localStorage
  }

  navigateToProfile(): void {
    this.router.navigate(['/user-profile']); // Navigate to user-profile
  }
}
