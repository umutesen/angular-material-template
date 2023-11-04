import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistListComponent } from './setlist-list.component';

describe('SetlistListComponent', () => {
  let component: SetlistListComponent;
  let fixture: ComponentFixture<SetlistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetlistListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetlistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
