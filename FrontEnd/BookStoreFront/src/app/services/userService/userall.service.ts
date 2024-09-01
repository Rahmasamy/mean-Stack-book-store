import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserallService {
  private userAllApi = 'http://localhost:8080/api/user/books';
  private useApi = `http://localhost:8080/api/user/books/66be930a5bfddd5215a747f0/status/current-read?page=1&limit=10`;
  constructor(private http: HttpClient) {}

  getAllBooksUser(id: any): Observable<any> {
    return this.http.get<any>(`${this.userAllApi}/${id}/?limit=100`);
  }

  getBooksByIdAndStatus(id: any, status: String): Observable<any> {
    return this.http.get<any>(
      `${this.userAllApi}/${id}/status/${status}?page=1&limit=100`
    );
  }
}
