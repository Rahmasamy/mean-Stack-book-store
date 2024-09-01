import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserInterface } from '../../user/userInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl = 'http://localhost:8080/api';
  createUser = '  http://localhost:8080/api/userAuth/signup';
  loginApi = 'http://localhost:8080/api/userAuth/login';
  private token = localStorage.getItem('userToken');

  userData = new BehaviorSubject(null);
  private isAdmin = new BehaviorSubject<boolean>(
    localStorage.getItem('role') === 'true'
  );
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.decodeUserData();
    }
  }

  decodeUserData() {
    const encodeToken = localStorage.getItem('userToken');
    if (encodeToken) {
      try {
        const decodedToken: any = jwtDecode(encodeToken);

        this.userData.next(decodedToken);
        if (localStorage.getItem('role') !== null) {
          this.checkRole();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('No token found in localStorage.');
    }
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['./login']);
  }
  checkRole(): Observable<any> {
    const role = localStorage.getItem('role') === 'true' ? true : false;
    this.isAdmin.next(role);
    return this.isAdmin.asObservable();
  }
  getAllUsers(): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.apiUrl);
  }

  getUserById(id: any) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  deleteUserById(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  processRegisteration(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }

  processLogin(inputData: any) {
    return this.http.post(this.loginApi, inputData);
  }

  // updateUser(id: any, inputData: any) {
  //   return this.http.put(`${this.apiUrl}/update/user/${id}`, inputData);
  // }

  // createNewUser(inputData: any) {

  //   return this.http.post(`${this.createUser}`, inputData);
  // }

  createNewUser(inputData: any): Observable<any> {
    return this.http.post(this.createUser, inputData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  updateUserAdmin(id: any, inputData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(`${this.apiUrl}/${id}`, inputData, { headers });
  }
}
