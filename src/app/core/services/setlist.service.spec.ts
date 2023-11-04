import { TestBed } from '@angular/core/testing';

import { SetlistService } from './setlist.service';

describe('SetlistService', () => {
  let service: SetlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
