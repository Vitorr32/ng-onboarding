import { TestBed } from '@angular/core/testing';

import { QueueControllerService } from './queue-controller.service';

describe('QueueControllerService', () => {
  let service: QueueControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
