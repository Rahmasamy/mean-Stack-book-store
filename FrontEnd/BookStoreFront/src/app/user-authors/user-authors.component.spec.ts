import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthorsComponent } from './user-authors.component';

describe('UserAuthorsComponent', () => {
  let component: UserAuthorsComponent;
  let fixture: ComponentFixture<UserAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuthorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
