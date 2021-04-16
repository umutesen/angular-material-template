import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutHomeComponent } from './about-home.component';

describe('AboutHomeComponent', () => {
  let component: AboutHomeComponent;
  let fixture: ComponentFixture<AboutHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
