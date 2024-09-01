import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { PopUpComponent } from '../pop-up/pop-up.component';
import { BookserviceService } from '../services/bookService/bookservice.service';
import { CommonModule } from '@angular/common';
import { CoreService } from '../coreService/core-service.service';

@Component({
  selector: 'app-adminbooks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminbooks.component.html',
  styleUrl: './adminbooks.component.css'
})
export class AdminbooksComponent {
  books: any[] = [];
  currentPage: number = 1;
  limit: number = 5;
  pageSize:number=5;
  totalItems: number = 0;
  totalPages: number = 0;
  imageUrl: any = 'http://localhost:8080/images/';
  constructor(private dialogRef: MatDialog, private bookService: BookserviceService, private _coreService: CoreService) {} // Inject the service

  ngOnInit(): void {
    this.getBooks(this.currentPage);
  }

  getBooks(page: number = 1): void {
    this.bookService.getBooks(page, this.limit).subscribe(
      (response: any) => {
        console.log(response);
        this.books = response.data;
        this.currentPage = response.page;
        this.totalItems = response.count;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);

        if (this.totalPages < 1) {
          this.totalPages = 1;
        }

      },
      (error: any) => {
        console.error('There was an error!', error);
      }
    );
  }
  public goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getBooks(this.currentPage);
    }
  }
  public nextPage() {
    if (this.currentPage < this.totalPages) { // Check to avoid exceeding max page
      this.currentPage++;
      this.getBooks(this.currentPage);
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBooks(this.currentPage);
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

  openAddBookForm() {
    const dialogRef = this.dialogRef.open(PopUpComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBooks();
        }
      },
    });
  }



  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getBooks();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialogRef.open(PopUpComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBooks();
        }
      },
    });
  }
}
