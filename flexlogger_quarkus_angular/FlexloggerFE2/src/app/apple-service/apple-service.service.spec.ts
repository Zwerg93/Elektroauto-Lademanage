import { TestBed } from '@angular/core/testing';

import { AppleServiceService } from './apple-service.service';

describe('AppleServiceService', () => {
  let service: AppleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
