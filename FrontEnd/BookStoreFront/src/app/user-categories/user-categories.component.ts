import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryserviceService } from '../services/categoryService/categoryservice.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './user-categories.component.html',
  styleUrl: './user-categories.component.css',
})
export class UserCategoriesComponent {
  categories: any[] = [];
  desc2: any = '';
  imageUrl: any = 'http://localhost:8080/images/';
  constructor(
    private dialogRef: MatDialog,
    private categoryService: CategoryserviceService,
    private route: Router
  ) {} // Inject the service

  ngOnInit(): void {
    this.getCategories();
  }

  // getCategories(): void {
  //   this.categoryService.getCategories().subscribe(
  //     (response) => {
  //       this.categories = response.data; // Access the 'data' key
  //       console.log(this.categories);
  //       const desc2 = response.data.desc.slice(0, 20);

  //       this.categories = { ...this.categories, desc2 };
  //     },
  //     (error) => {
  //       console.error('There was an error!', error);
  //     }
  //   );
  // }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response.data.map((category:any) => {
          let desc2 = category.desc ? category.desc.slice(0, 20) : '';
          desc2 = desc2 + " "+ " ..."
          return { ...category, desc2 };
        });
        console.log(this.categories);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

}
