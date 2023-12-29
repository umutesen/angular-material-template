import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistSongsListComponent } from './setlist-songs-list.component';

describe('SetlistSongsListComponent', () => {
  let component: SetlistSongsListComponent;
  let fixture: ComponentFixture<SetlistSongsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SetlistSongsListComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SetlistSongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
