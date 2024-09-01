import { NgClass, NgFor, NgForOf } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { TeamMember } from './teamMember';
import { NgOptimizedImage } from '@angular/common';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ContactInformationComponent } from '../contact-information/contact-information.component';
@Component({
  selector: 'app-aboutdetails',
  standalone: true,
  imports: [NgClass,NgFor,NgForOf, NgOptimizedImage,TestimonialsComponent,ContactInformationComponent],
  templateUrl: './aboutdetails.component.html',
  styleUrl: './aboutdetails.component.css'
})
export class AboutdetailsComponent {
  teamMembers: TeamMember[] = [
    { name: 'Rahma Samy', role: 'Full Stack developer', image: 'assets/rahmaUpWork.jpg' },
    { name: 'Ahmed Hussien', role: 'Full Stack developer', image: 'assets/ahmed.jpg'},
    { name: 'Gehad Gallo', role: 'Full Stack developer', image: 'assets/gehad.jpg' }
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

    this.teamMembers.forEach(member => member.show = false);
  }

  ngAfterViewInit(): void {
    const teamMemberElements = this.el.nativeElement.querySelectorAll('.team-member');

    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.renderer.addClass(entry.target, 'show');
          }, index * 200);
        }
      });
    }, observerOptions);

    teamMemberElements.forEach((member: Element) => observer.observe(member));
  }
}
