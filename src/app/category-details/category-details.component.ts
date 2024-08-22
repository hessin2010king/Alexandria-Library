import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Book } from '../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-details',
  standalone: true,
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
  imports: [CommonModule],
})
export class CategoryDetailsComponent implements OnInit {
  books: Book[] = [];
  categoryId!: number;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadBooks();
    });
  }

  loadBooks() {
    this.categoryService.getBooksByCategory(this.categoryId).subscribe((data) => {
      this.books = data;
    });
  }
}
