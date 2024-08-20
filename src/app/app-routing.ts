import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/admin.guard';  // Adjust the import path as needed
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthorsComponent } from './authors/authors.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BooksComponent } from './books/books.component';


export const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'books', component: BooksComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


