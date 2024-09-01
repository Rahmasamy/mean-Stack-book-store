import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {
  private token = localStorage.getItem('userToken');
  private apiUrl = 'http://localhost:8080/api/bookstore/categories';
  private CategoryUrl="http://localhost:8080/api/bookstore/books/category";
  // private singleCategory="/api/bookstore/categories"
  // private AuthorUrl="http://localhost:8080/api/bookstore/books/author/66bcc24e4e4bc63881c34327"

  constructor(private http: HttpClient) {}

  
  getCategories(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
  getCategoryById(id:any){
   return this.http.get(`${this.apiUrl}/${id}`)
 }
  getBookByCategoryId(id:any){
    return this.http.get(`${this.CategoryUrl}/${id}`)
  }
  createCategory(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });
    return this.http.post(this.apiUrl, data,{ headers });
  }

  updateCategory(id: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });

    return this.http.put(`${this.apiUrl}/${id}`, data,{headers});
  }


  deleteCategory(id: any): Observable<any> {
  // Assuming the token is stored in localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
