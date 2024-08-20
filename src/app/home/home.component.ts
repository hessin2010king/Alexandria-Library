// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-home',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './home.component.html',
// //   styleUrl: './home.component.css'
// // })
// // export class HomeComponent {

// //}




// import { Component, OnInit } from '@angular/core';
// import { AuthorService } from '../services/author.service';
// import { BookService } from '../services/book.service';
// import { CategoryService } from '../services/category.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   authors: any[] = [];
//   books: any[] = [];
//   categories: any[] = [];

//   constructor(
//     private authorService: AuthorService,
//     private bookService: BookService,
//     private categoryService: CategoryService
//   ) {}

//   ngOnInit(): void {
//     this.loadPopularAuthors();
//     this.loadPopularBooks();
//     this.loadPopularCategories();
//   }

//   loadPopularAuthors(): void {
//     this.authorService.getPopularAuthors().subscribe((data: any) => {
//       this.authors = data;
//     });
//   }

//   loadPopularBooks(): void {
//     this.bookService.getPopularBooks().subscribe((data: any) => {
//       this.books = data;
//     });
//   }

//   loadPopularCategories(): void {
//     this.categoryService.getPopularCategories().subscribe((data: any) => {
//       this.categories = data;
//     });
//   }

//   currentTab: string = 'books-list';  // Default tab

//   setTab(tab: string) {
//     this.currentTab = tab;

// }
// }
import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { CategoryService } from '../services/category.service';

import { BooksListComponent } from '../books-list/books-list.component';
import { ReadListComponent } from '../read-list/read-list.component';
import { CurrentlyReadingComponent } from '../currently-reading/currently-reading.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BooksListComponent,
    ReadListComponent,
    CurrentlyReadingComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors: any[] = [];
  books: any[] = [];
  categories: any[] = [];

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadPopularAuthors();
    this.loadPopularBooks();
    this.loadPopularCategories();
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

  currentTab: string = 'books-list';  // Default tab

  setTab(tab: string) {
    this.currentTab = tab;
  }
}
