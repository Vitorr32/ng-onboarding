import { TestBed } from '@angular/core/testing';

import { NgOnboardingService } from './ng-onboarding.service';

describe('NgOnboardingService', () => {
  let service: NgOnboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgOnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
