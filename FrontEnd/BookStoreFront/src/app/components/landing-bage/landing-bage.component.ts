import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserCategoriesComponent } from '../../user-categories/user-categories.component';
import { AboutComponent } from '../about/about.component';
import { UserAuthorsComponent } from '../../user-authors/user-authors.component';
import { FooterComponent } from '../footer/footer.component';
import { SwiperContainer } from 'swiper/element';
import { SwiperSlide } from 'swiper/element';
@Component({
  selector: 'app-landing-bage',
  standalone: true,
  imports: [UserCategoriesComponent,AboutComponent,UserAuthorsComponent,FooterComponent],
  templateUrl: './landing-bage.component.html',
  styleUrl: './landing-bage.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingBageComponent {

}
