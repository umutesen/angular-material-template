import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUsersComponent } from './account-users.component';

describe('AccountUsersComponent', () => {
  let component: AccountUsersComponent;
  let fixture: ComponentFixture<AccountUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
