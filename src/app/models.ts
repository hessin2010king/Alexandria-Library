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
  photo: string;
  name: string;
  categoryId: number;
  authorId: number;
}
