import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurrentReadComponent } from './user-current-read.component';

describe('UserCurrentReadComponent', () => {
  let component: UserCurrentReadComponent;
  let fixture: ComponentFixture<UserCurrentReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCurrentReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCurrentReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
