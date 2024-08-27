import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../src/app/admin/admin.component';
import { LoginComponent } from '../src/app/login/login.component';
import { AuthGuard } from '../src/app/auth/admin.guard';  // Adjust the import path as needed
import { HomeComponent } from '../src/app/home/home.component';
import { AboutComponent } from '../src/app/about/about.component';
import { CategoriesComponent } from '../src/app/categories/categories.component';
import { AuthorsComponent } from '../src/app/authors/authors.component';
import { TermsConditionsComponent } from '../src/app/terms-conditions/terms-conditions.component';
import { UserProfileComponent } from '../src/app/user-profile/user-profile.component';
import { BooksComponent } from '../src/app/books/books.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
