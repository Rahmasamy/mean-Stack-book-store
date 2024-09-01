import { Component } from '@angular/core';
import { CategoryserviceService } from '../services/categoryService/categoryservice.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryResponse } from './category';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent {
  imageUrl: any = 'http://localhost:8080/images/';

  categoryDeials: CategoryResponse | any = null;
  categoryId: string | null = null;
  Books: any[] = [];
  constructor(
    private CategoryService: CategoryserviceService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getCatgoryData();
    this.getBooksOFcategory();
  }
  getCatgoryData() {
    this.categoryId = this.activeRoute.snapshot.paramMap.get('id');
    this.CategoryService.getCategoryById(this.categoryId).subscribe(
      (response: CategoryResponse | any) => {
        this.categoryDeials = response.data; // Access the 'data' key
        // console.log(this.categoryDeials);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
  getBooksOFcategory() {
    this.categoryId = this.activeRoute.snapshot.paramMap.get('id');
    this.CategoryService.getBookByCategoryId(this.categoryId).subscribe(
      (response: any) => {
        this.Books = response.data;
         console.log(this.Books);
      },
      (error) => {
        console.error('error', error);
      }
    );
  }
}
