import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsEditComponent } from './lyrics-edit.component';

describe('LyricsEditComponent', () => {
  let component: LyricsEditComponent;
  let fixture: ComponentFixture<LyricsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LyricsEditComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(LyricsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
