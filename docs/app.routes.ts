import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthorsComponent } from './authors/authors.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { BooksComponent } from '../books/books.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookDetailsComponent } from './book-details/book-details.component'; // Import BookDetailsComponent

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin-login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'about', component: AboutComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category-details/:id', component: CategoryDetailsComponent },
  { path: 'author-details/:id', component: AuthorDetailsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'book-details/:id', component: BookDetailsComponent }, // Add route for BookDetailsComponent
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
