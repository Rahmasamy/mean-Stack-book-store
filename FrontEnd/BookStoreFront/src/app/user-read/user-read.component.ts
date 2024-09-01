import { ChangeDetectorRef, Component } from '@angular/core';
import { UserallService } from '../services/userService/userall.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-read',
  standalone: true,
  imports: [CommonModule, FormsModule, StarRatingComponent],
  templateUrl: './user-read.component.html',
  styleUrl: './user-read.component.css',
})
export class UserReadComponent {
  token: any = localStorage.getItem('userToken');
  decodedToken: any = jwtDecode(this.token);
  AllBooksUser: any = [];
  imageUrl: any = 'http://localhost:8080/images/';
  selectedStatus: any = '';
  statuses: string[] = ['want_to_read', 'current_read', 'read'];
  error: any = false;
  message: any = 'no books here';

  constructor(
    private UsersService: UserallService,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.AllBooksUser);
    console.log(this.decodedToken);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    const status = 'read';
    this.UsersService.getBooksByIdAndStatus(
      this.decodedToken.userId,
      status
    ).subscribe(
      (response) => {
        this.AllBooksUser = response.data;
        console.log(this.AllBooksUser);
      },
      (error) => {
        this.error = true;
        this.message = error.error.message;
        console.error(error);
      }
    );
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
    const newStatus = target.value;

    this.http
      .put(`http://localhost:8080/api/user/books/${id}`, { status: newStatus })
      .subscribe(
        (response: any) => {
          console.log('Book status updated:', response);
          const updatedBook = this.AllBooksUser.find(
            (book: any) => book._id === id
          );
          if (updatedBook) {
            updatedBook.book_id.status = newStatus;
          }
          this.getAllData()
          // this.cd.detectChanges();
        },
        (error) => {
          console.error('Error updating book status:', error);
        }
      );
  }
}
