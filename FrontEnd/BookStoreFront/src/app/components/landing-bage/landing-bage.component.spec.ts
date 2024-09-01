import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBageComponent } from './landing-bage.component';

describe('LandingBageComponent', () => {
  let component: LandingBageComponent;
  let fixture: ComponentFixture<LandingBageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingBageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingBageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
