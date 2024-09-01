import { Component } from '@angular/core';
import { UserallService } from '../services/userService/userall.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-all',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, FormsModule],
  templateUrl: './user-all.component.html',
  styleUrl: './user-all.component.css',
})
export class UserAllComponent {
  token: any = localStorage.getItem('userToken');
  decodedToken: any = jwtDecode(this.token);
  AllBooksUser: any = [];
  imageUrl: any = 'http://localhost:8080/images/';
  selectedStatus: any = '';
  statuses: string[] = ['want_to_read', 'current_read', 'read'];

  error: any = false;
  masseage: any = 'no books here';

  constructor(private UsersService: UserallService, private http: HttpClient) {
    console.log(this.AllBooksUser);
    console.log(this.decodedToken);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.UsersService.getAllBooksUser(this.decodedToken.userId).subscribe(
      (responese) => {
        this.AllBooksUser = responese.data;
        console.log(this.AllBooksUser);
      },
      (error) => {
        console.error(error);
        this.error = true;
        console.log(this.error);
        console.log(error.error.message);
        this.masseage = error.error.message;
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
    this.selectedStatus = target.value;

    const userBook = {
      // book_id: id,
      status: this.selectedStatus,
      // user_id: this.decodedToken?.userId,
    };

    console.log('Updated book details:', userBook);

    this.http
      .put(`http://localhost:8080/api/user/books/${id}`, {
        status: this.selectedStatus,
      })
      .subscribe(
        (response: any) => {
          console.log('Book status updated:', response);
          // Optionally, handle UI updates or notifications here
        },
        (error) => {
          console.error('Error updating book status:', error);
        }
      );
  }
}
