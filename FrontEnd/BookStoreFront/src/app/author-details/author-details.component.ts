import { Component } from '@angular/core';
import { AuthorServiceService } from '../services/authorService/author-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookserviceService } from '../services/bookService/bookservice.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, FormsModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css',
})
export class AuthorDetailsComponent {
  authorById: any = '';
  dataDetailse: any = {};
  imageUrl: any = 'http://localhost:8080/images/';
  images: any = '';
  DateOfBirth: any = '';
  dataOfBooksByAuthorId: any = [];
  rating: any = 0;
  showRating: any = [];
  finalRating: any = '';
  books: any = [];
  imagesBooks: any = [];
  selectedStatus: string = '';
  selectedIdBookToAdd: any = '';
  // this.userdata.token
  token: any = localStorage.getItem('userToken');
  decodedToken: any = jwtDecode(this.token);
  parentSelect: any = 'no-Reading';

  item = {
    rating: 0,
    _id: 'some-id',
  };
  constructor(
    private authorservise: AuthorServiceService,
    private route: Router,
    private bookservise: BookserviceService,
    private activeRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.selectedStatus = '';
    this.parentSelect = 'no-Reading';
    console.log(this.decodedToken);
    // console.log(this.);
  }

  ngOnInit(): void {
    this.getAuthorData();
    this.getBooksOfAuthor();
  }

  getAuthorData() {
    this.authorById = this.activeRoute.snapshot.paramMap.get('id');
    console.log("author id")
    console.log(this.authorById);
    this.authorservise.getAuthorById(this.authorById).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataDetailse = response.data;
        this.images = response.data.imagePaths[0];
        console.log(response.data, 'data');
        console.log(response.data.imagePaths, 'sksnjkdnsjnb');
        this.DateOfBirth = this.formatDate(response.data.DateOfBirth);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  formatDate(dateString: string | null): string {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return '';
  }

  getBooksOfAuthor() {
    this.bookservise.getBooksByAuthorId(this.authorById).subscribe({
      next: (response: any) => {
        console.log(response);
        // this.dataOfBooksByAuthorId = response.data;
        this.rating = response.data;

        console.log(response.data, 'data books of auther');
        this.books = response.data.map((book: any) => {
          // console.log()
          const bookWithRating = {
            ...book,
            starRating: this.convertRatingToStars(book.rating),
          };

          return bookWithRating;
        });

        console.log(this.books, 'booksssssss');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  convertRatingToStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      '★'.repeat(fullStars) + '★'.repeat(halfStar) + '☆'.repeat(emptyStars)
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
  }

  updateBookWithStars(newRating: any, itemId?: any) {
    console.log('New rating:', newRating, 'for item:', itemId);
    console.log(newRating);
    this.bookservise.updateBook(itemId, newRating).subscribe(
      (response) => {
        console.log('Data sent successfully', response);
      },
      (error) => {
        console.error('Error sending data', error);
      }
    );
  }
}
