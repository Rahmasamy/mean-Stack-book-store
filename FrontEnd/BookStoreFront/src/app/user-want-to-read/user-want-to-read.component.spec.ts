import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWantToReadComponent } from './user-want-to-read.component';

describe('UserWantToReadComponent', () => {
  let component: UserWantToReadComponent;
  let fixture: ComponentFixture<UserWantToReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWantToReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWantToReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
