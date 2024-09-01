import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookserviceService } from '../services/bookService/bookservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { StarRatingComponent } from '../star-rating/star-rating.component';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, FormsModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  bookById: any;
  bookDetials: any = {};
  imageUrl: any = 'http://localhost:8080/images/';
  image: any = '';
  selectedStatus: string = '';
   token: any = localStorage.getItem('userToken');
   decodedToken: any = jwtDecode(this.token);
   parentSelect: any = 'no-Reading';

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private bookService: BookserviceService,
    private http: HttpClient
  ) {
    this.getBookData();
    // this.onStatusChange();
  }

  getBookData() {
    this.bookById = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.bookById);
    this.bookService.getBookById(this.bookById).subscribe(
      (response: any) => {
        console.log('hhhhhhhhhhhhh');
        console.log(response.data);
        this.bookDetials = response.data; // Access the 'data' key
        this.image = response.data.imagePaths[0];

        console.log(response.data, 'datata3124234');
        console.log(this.bookDetials, 'dasm,fncmsandmA ');
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
  updateBookWithStars(newRating: any, itemId?: any) {
    console.log('New rating:', newRating, 'for item:', itemId);
    console.log(newRating);
    this.bookService.updateBook(itemId, newRating).subscribe(
      (response) => {
        console.log('Data sent successfully', response);
      },
      (error) => {
        console.error('Error sending data', error);
      }
    );
  }

  onStatusChange(event: Event, id: any): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus = target.value;
    const userBook = {
      book_id: id,
      status: this.selectedStatus,
      user_id: this.decodedToken.userId,
    };
    console.log("userid")
    console.log(userBook.user_id);
    console.log(userBook.status);
    console.log(userBook.book_id);


    this.http
      .post('http://localhost:8080/api/user/books', userBook)
      .subscribe((response) => {
        console.log('Book added to user list:', response);
        // Optionally, handle UI updates or notifications here
      });
    // You can also perform additional actions here based on the selected value
  }
}
