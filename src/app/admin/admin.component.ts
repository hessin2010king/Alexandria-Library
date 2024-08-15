import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CategoryService } from '../services/category.service';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { Category, Author, Book } from '../models'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule] // Add CommonModule to imports

})
export class AdminComponent implements OnInit {
  categories: Category[] = [];
  authors: Author[] = [];
  books: Book[] = [];

  newCategoryName: string = '';
  newAuthor: Author = { id: 0, photo: '', firstName: '', lastName: '', dateOfBirth: '' };
  newBook: Book = { id: 0, photo: '', name: '', categoryId: 0, authorId: 0 };

  constructor(
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private bookService: BookService,
    private authService: AuthService, // Add this line

    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadAuthors();
    this.loadBooks();
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    alert('An error occurred. Please try again later.');
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => this.categories = categories,
      (error) => this.handleError(error)
    );
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe(
      (authors) => this.authors = authors,
      (error) => this.handleError(error)
    );
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (books) => this.books = books,
      (error) => this.handleError(error)
    );
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.categoryService.addCategory(this.newCategoryName).subscribe(
        () => {
          this.newCategoryName = '';
          this.loadCategories();
        },
        (error) => this.handleError(error)
      );
    }
  }

  editCategory(id: number) {
    const newName = prompt('Enter new name:');
    if (newName?.trim()) {
      this.categoryService.updateCategory(id, newName).subscribe(
        () => this.loadCategories(),
        (error) => this.handleError(error)
      );
    }
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => this.loadCategories(),
        (error) => this.handleError(error)
      );
    }
  }

  addAuthor() {
    if (this.newAuthor.firstName.trim() && this.newAuthor.lastName.trim() && this.newAuthor.dateOfBirth.trim()) {
      this.authorService.addAuthor(this.newAuthor).subscribe(
        () => {
          this.newAuthor = { id: 0, photo: '', firstName: '', lastName: '', dateOfBirth: '' };
          this.loadAuthors();
        },
        (error) => this.handleError(error)
      );
    }
  }

  editAuthor(id: number) {
    const updatedAuthor: Author = {
      id,
      photo: prompt('Enter new photo URL:', '') || '',
      firstName: prompt('Enter new first name:', '') || '',
      lastName: prompt('Enter new last name:', '') || '',
      dateOfBirth: prompt('Enter new date of birth:', '') || ''
    };
    if (updatedAuthor.firstName && updatedAuthor.lastName && updatedAuthor.dateOfBirth) {
      this.authorService.updateAuthor(id, updatedAuthor).subscribe(
        () => this.loadAuthors(),
        (error) => this.handleError(error)
      );
    }
  }

  deleteAuthor(id: number) {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorService.deleteAuthor(id).subscribe(
        () => this.loadAuthors(),
        (error) => this.handleError(error)
      );
    }
  }

  addBook() {
    if (this.newBook.name.trim() && this.newBook.categoryId && this.newBook.authorId) {
      this.bookService.addBook(this.newBook).subscribe(
        () => {
          this.newBook = { id: 0, photo: '', name: '', categoryId: 0, authorId: 0 };
          this.loadBooks();
        },
        (error) => this.handleError(error)
      );
    }
  }

  editBook(id: number) {
    const updatedBook: Partial<Book> = {
      id,
      photo: prompt('Enter new photo URL:', '') || '',
      name: prompt('Enter new name:', '') || '',
      categoryId: Number(prompt('Enter new category ID:', '')),
      authorId: Number(prompt('Enter new author ID:', ''))
    };
  
    if (updatedBook.name && updatedBook.categoryId && updatedBook.authorId) {
      this.bookService.updateBook(id, updatedBook).subscribe(
        () => this.loadBooks(),
        (error) => this.handleError(error)
      );
    } else {
      alert('Invalid input. Please check your data.');
    }
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(
        () => this.loadBooks(),
        (error) => this.handleError(error)
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCategoryNameById(categoryId: number): string | undefined {
    return this.categories.find(c => c.id === categoryId)?.name;
  }

  getAuthorNameById(authorId: number): string | undefined {
    const author = this.authors.find(a => a.id === authorId);
    return author ? `${author.firstName} ${author.lastName}` : undefined;
  }
}
