import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  getBooksList() {
    return [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' }
    ];
  }

  getReadList() {
    return [
      { title: 'Read Book 1', author: 'Author A' },
      { title: 'Read Book 2', author: 'Author B' }
    ];
  }

  getCurrentlyReading() {
    return [
      { title: 'Reading Book 1', author: 'Author X' },
      { title: 'Reading Book 2', author: 'Author Y' }
    ];
  }

  getCategories() {
    return [
      { name: 'Category 1' },
      { name: 'Category 2' }
    ];
  }

  getCategoryDetails() {
    return {
      name: 'Category 1',
      description: 'Details about Category 1'
    };
  }
}
