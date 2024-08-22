import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  standalone: true,
  imports :[CommonModule]
})
export class BooksListComponent implements OnInit {
  booksList: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.booksList = this.dataService.getBooksList();
  }
}
