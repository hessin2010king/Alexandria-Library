import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoryService } from '../services/category.service';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';

import { Category, Author, Book } from '../models';
import { EditModalComponent } from '../shared/edit-modal/edit-modal.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, FormsModule, EditModalComponent]
})
export class AdminComponent implements OnInit {
  categories: Category[] = [];
  authors: Author[] = [];
  books: Book[] = [];

  constructor(
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private bookService: BookService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/admin-login']); // Redirect to login if not authenticated
      return;
    }
    this.loadCategories();
    this.loadAuthors();
    this.loadBooks();
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
    const newCategory: Category = { id: 0, name: '' };
    this.editCategory(newCategory);
  }

  addAuthor() {
    const newAuthor: Author = { id: 0, photo: '', firstName: '', lastName: '', dateOfBirth: '' };
    this.editAuthor(newAuthor);
  }

  addBook() {
    const newBook: Book = { id: 0, photo: '', name: '', categoryId: 0, authorId: 0 };
    this.editBook(newBook);
  }

  editCategory(category: Category) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.item = { ...category };
    modalRef.componentInstance.fields = ['name'];
    modalRef.componentInstance.title = 'Edit Category';

    modalRef.componentInstance.save.subscribe((updatedCategory: Category) => {
      if (updatedCategory.id === 0) {
        this.categoryService.addCategory(updatedCategory.name).subscribe(
          () => this.loadCategories(),
          (error) => this.handleError(error)
        );
      } else {
        this.categoryService.updateCategory(updatedCategory.id, updatedCategory.name).subscribe(
          () => this.loadCategories(),
          (error) => this.handleError(error)
        );
      }
    });

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }

  editAuthor(author: Author) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.item = { ...author };
    modalRef.componentInstance.fields = ['photo', 'firstName', 'lastName', 'dateOfBirth'];
    modalRef.componentInstance.title = 'Edit Author';

    modalRef.componentInstance.save.subscribe((updatedAuthor: Author) => {
      if (updatedAuthor.id === 0) {
        this.authorService.addAuthor(updatedAuthor).subscribe(
          () => this.loadAuthors(),
          (error) => this.handleError(error)
        );
      } else {
        this.authorService.updateAuthor(updatedAuthor.id, updatedAuthor).subscribe(
          () => this.loadAuthors(),
          (error) => this.handleError(error)
        );
      }
    });

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }

  editBook(book: Book) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.item = { ...book };
    modalRef.componentInstance.fields = ['photo', 'name', 'categoryId', 'authorId'];
    modalRef.componentInstance.title = 'Edit Book';

    modalRef.componentInstance.save.subscribe((updatedBook: Book) => {
      if (updatedBook.id === 0) {
        this.bookService.addBook(updatedBook).subscribe(
          () => this.loadBooks(),
          (error) => this.handleError(error)
        );
      } else {
        this.bookService.updateBook(updatedBook.id, updatedBook).subscribe(
          () => this.loadBooks(),
          (error) => this.handleError(error)
        );
      }
    });

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => this.loadCategories(),
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
    this.router.navigate(['/admin-login']);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    alert('An error occurred. Please try again later.');
  }

  getCategoryNameById(categoryId: number): string | undefined {
    return this.categories.find(c => c.id === categoryId)?.name;
  }

  getAuthorNameById(authorId: number): string | undefined {
    const author = this.authors.find(a => a.id === authorId);
    return author ? `${author.firstName} ${author.lastName}` : undefined;
  }
}
