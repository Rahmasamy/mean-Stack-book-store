export interface Category {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
export interface CategoryResponse {
    data: Category;
  }