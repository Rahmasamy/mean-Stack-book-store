import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutherizationService {
  private urlApi: string = 'http://localhost:8080/api/user/books';

  constructor(private http: HttpClient) {}

  getAllUserOprations() {
    return this.http.get(this.urlApi);
  }
}
