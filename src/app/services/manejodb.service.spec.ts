import { TestBed } from '@angular/core/testing';

import { ManejodbService } from './manejodb.service';

describe('ManejodbService', () => {
  let service: ManejodbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejodbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
