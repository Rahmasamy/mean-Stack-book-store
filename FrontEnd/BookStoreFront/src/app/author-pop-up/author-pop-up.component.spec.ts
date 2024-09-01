import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPopUpComponent } from './author-pop-up.component';

describe('AuthorPopUpComponent', () => {
  let component: AuthorPopUpComponent;
  let fixture: ComponentFixture<AuthorPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
