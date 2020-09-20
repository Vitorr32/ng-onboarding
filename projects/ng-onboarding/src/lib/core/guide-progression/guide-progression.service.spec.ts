import { TestBed } from '@angular/core/testing';

import { GuideProgressionService } from './guide-progression.service';

describe('GuideProgressionService', () => {
  let service: GuideProgressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuideProgressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
