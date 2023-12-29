import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricAddDialogComponent } from './lyric-add-dialog.component';

describe('LyricAddDialogComponent', () => {
  let component: LyricAddDialogComponent;
  let fixture: ComponentFixture<LyricAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LyricAddDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(LyricAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
