import { TestBed } from '@angular/core/testing';

import { UserallService } from './userall.service';

describe('UserallService', () => {
  let service: UserallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
