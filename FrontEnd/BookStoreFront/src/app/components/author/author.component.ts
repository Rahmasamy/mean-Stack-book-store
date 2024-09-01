import { Component } from '@angular/core';
import { AuthorPopUpComponent } from '../../author-pop-up/author-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthorServiceService } from '../../services/authorService/author-service.service';
import { CoreService } from '../../coreService/core-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  currentPage: number = 1;
  pageSize: number = 5;
  limit: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  Authors: any[] = [];
  imageUrl: any = 'http://localhost:8080/images/';
  constructor(private dialogRef: MatDialog, private AuthorService: AuthorServiceService, private _coreService: CoreService) {} // Inject the service

  ngOnInit(): void {
    this.getAuthors(this.currentPage);
  }

  getAuthors(page: number = 1): void {
    this.AuthorService.getAuthors(page, this.limit).subscribe(
      (response: any) => {
        console.log(response);
        this.Authors = response.data;
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
      this.getAuthors(this.currentPage);
    }
  }
  public nextPage() {
    console.log(this.totalPages,"total pages");
    console.log(this.currentPage,"current page");
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAuthors(this.currentPage);
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAuthors(this.currentPage);
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




  openAddAuthorForm() {
    const dialogRef = this.dialogRef.open(AuthorPopUpComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAuthors(this.currentPage);
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

  deleteAuthor(id: number) {
    this.AuthorService.deleteAuthor(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getAuthors(this.currentPage);
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialogRef.open(AuthorPopUpComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAuthors(this.currentPage);
        }
      },
    });
  }
  openDialog(){
   this.dialogRef.open(AuthorPopUpComponent)
  }

}
