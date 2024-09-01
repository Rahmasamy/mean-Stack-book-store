import { Component,OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { PopUpComponent } from '../../pop-up/pop-up.component';
import { CategoryPopUpComponent } from '../../category-pop-up/category-pop-up.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { CategoryserviceService } from '../../services/categoryService/categoryservice.service';
import { CoreService } from '../../coreService/core-service.service';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  limit: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  imageUrl: any = 'http://localhost:8080/images/';
  constructor(private dialogRef: MatDialog, private categoryService: CategoryserviceService,private _coreService:CoreService) {} // Inject the service

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(page: number = 1): void {
    this.categoryService.getCategories(page, this.limit).subscribe(
      (response) => {
        this.categories = response.data;
        this.currentPage = response.page;
        this.totalItems = response.count;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);

        if (this.totalPages < 1) {
          this.totalPages = 1;
        }

      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }


  public goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getCategories(this.currentPage);
    }
  }
  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getCategories(this.currentPage);
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCategories(this.currentPage);
    }
  }


   getPageButtons(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, this.currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }






  openAddCategoryForm() {
    const dialogRef = this.dialogRef.open(CategoryPopUpComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {

          this.getCategories();
        }
      },
    });
  }


  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        console.log(res)
        this.getCategories();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialogRef.open(CategoryPopUpComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategories();
        }
      },
    });
  }
}








