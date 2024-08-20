import { Component } from '@angular/core';
import { BooksListComponent } from '../books-list/books-list.component';
import { ReadListComponent } from '../read-list/read-list.component';
import { CurrentlyReadingComponent } from '../currently-reading/currently-reading.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [BooksListComponent, ReadListComponent, CurrentlyReadingComponent, CategoriesComponent, CategoryDetailsComponent]
})
export class UserProfileComponent {
  currentTab: string = 'books-list';  // Default tab

  setTab(tab: string) {
    this.currentTab = tab;
  }
}
