import { TestBed } from '@angular/core/testing';

import { HouseEntityService } from './house-entity.service';

describe('HouseEntityService', () => {
  let service: HouseEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
