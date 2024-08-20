import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component'; // Ensure AdminComponent is imported
import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
// import { CategoriesComponent } from './categories/categories.component';
// import { AuthorsComponent } from './authors/authors.component';
// import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent }, // Ensure AdminComponent is registered
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'about', component: AboutComponent },
  // { path: 'categories', component: CategoriesComponent },
  // { path: 'authors', component: AuthorsComponent },
  // { path: 'terms-conditions', component: TermsConditionsComponent },
];
