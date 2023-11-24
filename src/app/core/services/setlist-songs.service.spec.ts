import { TestBed } from '@angular/core/testing';

import { SetlistSongsService } from './setlist-songs.service';

describe('SetlistSongsService', () => {
  let service: SetlistSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetlistSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
