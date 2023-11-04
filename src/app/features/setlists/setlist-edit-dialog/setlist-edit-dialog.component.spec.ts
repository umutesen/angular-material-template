import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistEditDialogComponent } from './setlist-edit-dialog.component';

describe('SetlistEditDialogComponent', () => {
  let component: SetlistEditDialogComponent;
  let fixture: ComponentFixture<SetlistEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetlistEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetlistEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
