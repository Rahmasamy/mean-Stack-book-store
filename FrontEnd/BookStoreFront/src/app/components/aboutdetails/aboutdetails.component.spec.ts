import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutdetailsComponent } from './aboutdetails.component';

describe('AboutdetailsComponent', () => {
  let component: AboutdetailsComponent;
  let fixture: ComponentFixture<AboutdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
