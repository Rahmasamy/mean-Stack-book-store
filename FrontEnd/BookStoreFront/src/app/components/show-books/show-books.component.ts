import { Component } from '@angular/core';
import { BookserviceService } from '../../services/bookService/bookservice.service';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../../coreService/core-service.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-show-books',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './show-books.component.html',
  styleUrl: './show-books.component.css'
})
export class ShowBooksComponent {
  books: any[] = [];
  imageUrl: any = 'http://localhost:8080/images/';
  constructor(private dialogRef: MatDialog, private bookService: BookserviceService, private _coreService: CoreService) {} // Inject the service

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.bookService.getBooks().subscribe(
      (response:any) => {

        this.books = response.data; // Access the 'data' key
        console.log(this.books)
      },
      (error:any) => {
        console.error('There was an error!', error);
      }
    );

  };
  convertRatingToStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      '★'.repeat(fullStars) + '★'.repeat(halfStar) + '☆'.repeat(emptyStars)
    );
  }
}
