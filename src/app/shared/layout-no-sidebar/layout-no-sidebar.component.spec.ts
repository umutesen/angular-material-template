import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNoSidebarComponent } from './layout-no-sidebar.component';

describe('LayoutNoSidebarComponent', () => {
  let component: LayoutNoSidebarComponent;
  let fixture: ComponentFixture<LayoutNoSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LayoutNoSidebarComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(LayoutNoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
