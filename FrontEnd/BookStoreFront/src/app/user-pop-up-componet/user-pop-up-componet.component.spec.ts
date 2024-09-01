import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPopUpComponetComponent } from './user-pop-up-componet.component';

describe('UserPopUpComponetComponent', () => {
  let component: UserPopUpComponetComponent;
  let fixture: ComponentFixture<UserPopUpComponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPopUpComponetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPopUpComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
