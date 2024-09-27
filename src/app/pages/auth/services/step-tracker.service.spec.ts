import { TestBed } from '@angular/core/testing';

import { StepTrackerService } from './step-tracker.service';

describe('StepTrackerService', () => {
  let service: StepTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
