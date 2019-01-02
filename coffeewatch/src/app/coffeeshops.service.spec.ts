import { TestBed } from '@angular/core/testing';

import { CoffeeshopsService } from './coffeeshops.service';

describe('CoffeeshopsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoffeeshopsService = TestBed.get(CoffeeshopsService);
    expect(service).toBeTruthy();
  });
});
