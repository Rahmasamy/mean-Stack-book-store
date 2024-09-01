import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { json } from 'body-parser';
@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  private apiUrl = 'http://localhost:8080/api/bookstore/books';
  private bookIdUrl = 'http://localhost:8080/api/bookstore/books/book';
  private AuthorUrl = 'http://localhost:8080/api/bookstore/books/author';
  private token: any = localStorage.getItem('userToken');

  constructor(private http: HttpClient) {
  }

  getBooksByAuthorId(id: string) {
    return this.http.get(`${this.AuthorUrl}/${id}`);
  }

  getBooks(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getBookById(id: any) {
    return this.http.get(`${this.bookIdUrl}/${id}`);
  }

  createBook(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });
    return this.http.post(this.apiUrl, data , {headers});
  }

  updateBook(id: string, userRating: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });


    const body = JSON.stringify({
      userRating: userRating,
      title: 'js',
      Category: 'asmZ',
      Author_id: '66be3ed3262d376fc849079a',
      Category_id: '66be911c30d8927d88cd0463',
    });

    return this.http.put<any>(`${this.bookIdUrl}/${id}`, body, { headers });
  }

  AdminUpdateBook(id: string, data:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });


    return this.http.put<any>(`${this.bookIdUrl}/${id}`, data, { headers });
  }

  deleteBook(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });
    return this.http.delete(`${this.bookIdUrl}/${id}`,{headers});
  }
}
