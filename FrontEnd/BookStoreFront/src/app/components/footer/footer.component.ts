import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isAdmin: boolean = false;
  isLogin: boolean = false;
  userData: any;
  imageUrl: any = 'http://localhost:8080/images/';
  images: any = '';
  profileImage: any = JSON.parse(localStorage.getItem('userProfile') || 'null');
  name: any;
  constructor(private auth: AuthenticationService) {
    this.profileImage;
    console.log("hhhhhhhhhhh")
    console.log(this.profileImage);
    this.images = this.profileImage?.imagePaths[0];
    this.name = this.profileImage?.name;

    console.log(this.images);
    auth.userData.subscribe({
      next: (res:any) => {
        res ? (this.isLogin = true) : (this.isLogin = false);
      },
    });
    this.auth.checkRole().subscribe({
      next: (isAdmin:any) => {
        this.isAdmin = isAdmin;

        console.log(this.isAdmin);
      },
    });
  }
  logout() {
    this.isAdmin = false;
    this.auth.logOut();
    localStorage.clear;
  }

  ngAfterViewInit() {
    this.initializeNavbarLinks();
  }

  private initializeNavbarLinks() {
    const navbarLinks = document.querySelectorAll('.navbar-nav a');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarCollapse) {
      navbarLinks.forEach((link: Element) => {
        link.addEventListener('click', () => {
          if (
            window.getComputedStyle(document.querySelector('.navbar-toggler')!)
              .display !== 'none'
          ) {
            navbarCollapse.classList.remove('show');
          }
        });
      });
    }
  }
  closeNavbar() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }
}
