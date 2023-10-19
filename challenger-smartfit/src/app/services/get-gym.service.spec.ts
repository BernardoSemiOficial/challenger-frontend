import { TestBed } from '@angular/core/testing';

import { GetGymService } from './get-gym.service';

describe('GetGymService', () => {
  let service: GetGymService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGymService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
