import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../services/authenticationService/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterOutlet, RouterLink,NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  admin = {
    name: 'Admin Name',
    role: 'Administrator',
    email: 'admin&#64;example.com',
    phone: '+123 456 7890',
    joined: 'January 1, 2020',
    lastLogin: 'August 31, 2024'
  };
  isAdmin: boolean = false;
  isLogin: boolean = false;
  userData: any;
  imageUrl: any = 'http://localhost:8080/images/';
  images: any = '';
  profileImage: any = JSON.parse(localStorage.getItem('userProfile') || 'null');
  name: any;
  constructor(private auth: AuthenticationService) {
    this.profileImage;
    console.log("hello world")
    console.log(this.profileImage);
    this.images = this.profileImage?.imagePaths[0];
    this.name = this.profileImage?.name;

    console.log(this.images);
    auth.userData.subscribe({
      next: (res) => {
        res ? (this.isLogin = true) : (this.isLogin = false);
      },
    });
    this.auth.checkRole().subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;

        console.log(this.isAdmin);
      },
    });
  }





}
