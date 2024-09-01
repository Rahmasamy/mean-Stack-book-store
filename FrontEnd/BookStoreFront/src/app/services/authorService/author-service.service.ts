import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorServiceService {
  private apiUrl = 'http://localhost:8080/api/bookstore/authors';
  private token: any = localStorage.getItem('userToken');

  constructor(private http: HttpClient) {}

  getAuthorById(id: string) {
    console.log(id)
    return this.http.get<string>(`${this.apiUrl}/${id}`);
  }

  getAuthors(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  createAuthor(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });
    return this.http.post<any>(this.apiUrl, formData,{ headers });
  }

  updateAuthor(id: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });
    return this.http.put(`${this.apiUrl}/${id}`, data,{ headers });
  }

  deleteAuthor(id: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,

    });
    return this.http.delete(`${this.apiUrl}/${id}`,{headers});
  }
}
