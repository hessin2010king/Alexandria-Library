import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

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
  imports: [CommonModule, FormsModule, EditModalComponent, NgbModalModule]
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
    this.openEditModal(newCategory, 'Category', ['name']);
  }

  addAuthor() {
    const newAuthor: Author = { id: 0, photo: '', firstName: '', lastName: '', dateOfBirth: '' };
    this.openEditModal(newAuthor, 'Author', ['photo', 'firstName', 'lastName', 'dateOfBirth']);
  }

  addBook() {
    const newBook: Book = { id: 0, bookPhoto: '', bookName: '', categoryId: 0, authorId: 0, bookDescription: '' };
    this.openEditModal(newBook, 'Book', ['bookPhoto', 'bookName', 'categoryId', 'authorId', 'bookDescription']);
  }

  editCategory(category: Category) {
    this.openEditModal(category, 'Category', ['name']);
  }

  editAuthor(author: Author) {
    this.openEditModal(author, 'Author', ['photo', 'firstName', 'lastName', 'dateOfBirth']);
  }

  editBook(book: Book) {
    this.openEditModal(book, 'Book', ['bookPhoto', 'bookName', 'categoryId', 'authorId', 'bookDescription']);
  }

  private openEditModal(item: any, type: string, fields: string[]) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.item = { ...item };
    modalRef.componentInstance.fields = fields;
    modalRef.componentInstance.title = `Edit ${type}`;

    modalRef.componentInstance.save.subscribe((updatedItem: any) => {
      this.saveUpdatedItem(updatedItem, type);
      modalRef.close();
    });

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }

  private saveUpdatedItem(updatedItem: any, type: string) {
    switch (type) {
      case 'Category':
        if (updatedItem.id === 0) {
          this.categoryService.addCategory(updatedItem.name).subscribe(
            () => this.loadCategories(),
            (error) => this.handleError(error)
          );
        } else {
          this.categoryService.updateCategory(updatedItem.id, updatedItem.name).subscribe(
            () => this.loadCategories(),
            (error) => this.handleError(error)
          );
        }
        break;
      case 'Author':
        if (updatedItem.id === 0) {
          this.authorService.addAuthor(updatedItem).subscribe(
            () => this.loadAuthors(),
            (error) => this.handleError(error)
          );
        } else {
          this.authorService.updateAuthor(updatedItem.id, {
            photo: updatedItem.photo,
            firstName: updatedItem.firstName,
            lastName: updatedItem.lastName,
            dateOfBirth: updatedItem.dateOfBirth
          }).subscribe(
            () => this.loadAuthors(),
            (error) => this.handleError(error)
          );
        }
        break;
      case 'Book':
        if (updatedItem.id === 0) {
          this.bookService.addBook(updatedItem).subscribe(
            () => this.loadBooks(),
            (error) => this.handleError(error)
          );
        } else {
          this.bookService.updateBook(updatedItem.id, updatedItem).subscribe(
            () => this.loadBooks(),
            (error) => this.handleError(error)
          );
        }
        break;
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
