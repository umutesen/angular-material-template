import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditDialogComponent } from './song-edit-dialog.component';

describe('SongEditDialogComponent', () => {
  let component: SongEditDialogComponent;
  let fixture: ComponentFixture<SongEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
