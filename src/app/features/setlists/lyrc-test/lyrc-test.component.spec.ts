import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyrcTestComponent } from './lyrc-test.component';

describe('LyrcTestComponent', () => {
  let component: LyrcTestComponent;
  let fixture: ComponentFixture<LyrcTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyrcTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyrcTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
