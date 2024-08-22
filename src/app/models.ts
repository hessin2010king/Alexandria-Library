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
  categoryName?: string; // Optional field for category name
  authorName?: string;  // Optional field for author name

  id: number;
  photo: string;
  name: string;
  categoryId: number;
  authorId: number;
  
}
