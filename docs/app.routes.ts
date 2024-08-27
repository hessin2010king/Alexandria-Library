import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../src/app/login/login.component';
import { AdminComponent } from '../src/app/admin/admin.component';
import { HomeComponent } from '../src/app/home/home.component';
import { AboutComponent } from '../src/app/about/about.component';
import { CategoriesComponent } from '../src/app/categories/categories.component';
import { AuthorsComponent } from '../src/app/authors/authors.component';
import { TermsConditionsComponent } from '../src/app/terms-conditions/terms-conditions.component';
import { BooksComponent } from '../src/app/books/books.component';
import { CategoryDetailsComponent } from '../src/app/category-details/category-details.component';
import { AuthorDetailsComponent } from '../src/app/author-details/author-details.component';
import { UserProfileComponent } from '../src/app/user-profile/user-profile.component';
import { BookDetailsComponent } from '../src/app/book-details/book-details.component'; // Import BookDetailsComponent

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
