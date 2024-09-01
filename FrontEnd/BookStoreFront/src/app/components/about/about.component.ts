import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShowBooksComponent } from '../show-books/show-books.component';
import { AboutdetailsComponent } from '../aboutdetails/aboutdetails.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink,ShowBooksComponent,RouterOutlet,AboutdetailsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
