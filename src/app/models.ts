export interface Category {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  photo: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface Book {
  id: number;
  bookName: string;
  bookPhoto: string;
  bookDescription: string;
  authorId: number;
  categoryId: number;
  categoryName?: string; // Optional field for category name
  authorName?: string;  // Optional field for author name
  averageRating?: number; // Optional field for average rating
  reviewCount?: number; // Optional field for review count
}


export interface Review {
  id: number;
  bookId: number;
  reviewText: string;
  rating: number;
  stars: number;
}
