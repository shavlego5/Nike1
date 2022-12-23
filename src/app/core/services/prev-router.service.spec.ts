import {TestBed} from '@angular/core/testing';

import {PrevRouterService} from './prev-router.service';

describe('PrevRouterService', () => {
  let service: PrevRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
