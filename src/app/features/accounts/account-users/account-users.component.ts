import { Component, Inject, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef as MatDialogRef } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource as MatTableDataSource } from "@angular/material/table";
import { AccountUser } from "src/app/core/model/AccountUser";
import { Account } from "src/app/core/model/account";
import { MEMBER, ROLES } from "src/app/core/model/roles";
import { BaseUser, User, UserHelper } from "src/app/core/model/user";
import { AccountService } from "src/app/core/services/account.service";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-account-users",
  templateUrl: "./account-users.component.html",
  styleUrls: ["./account-users.component.css"],
})
export class AccountUsersComponent {
  displayedColumns: string[] = ["email", "displayName", "role", "remove"];
  currentUser: BaseUser;
  roles: string[];
  searching = false;
  showUserNotfound = false;
  ownerUserId: string;
  accountId: string; //When the account is updated the id is deleted. This will make sure we have it.
  matcher = new MyErrorStateMatcher();
  dataSource = new MatTableDataSource<User>();
  sort: MatSort = new MatSort();
  addUserForm = new FormGroup({
    email: new FormControl("", Validators.email),
  });

  get email() {
    return this.addUserForm.get("email");
  }

  constructor(
    public dialogRef: MatDialogRef<AccountUsersComponent>,
    private accountService: AccountService,
    private authService: AuthenticationService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: Account
  ) {
    this.accountId = data.id ?? "";
    this.dataSource.sort = this.sort;
    this.accountService.getAccountUsers(this.data.id!).subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
    });
    this.roles = ROLES;

    this.authService.user$.subscribe((user) => {
      if(user && user.uid){
        this.currentUser = UserHelper.getForUpdate(user);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.searching = true;
    this.email?.setErrors(null);
    const emailToAdd = this.email?.value;
    if (emailToAdd) {
      this.userService.getUserByEmail(emailToAdd).subscribe((user) => {
        this.searching = false;
        if (user) {
          const accountUser = {role: MEMBER, ...user}
          this.accountService.addUserToAccount(this.data, this.currentUser, accountUser);
          this.email?.setValue("");
          this.email?.setErrors(null);
        } else {
          this.email?.setErrors({
            notMatched: true
          });
        }
      });
    }
  }

  onSelectRole(event: any, user: AccountUser, role: string): void {
    event.preventDefault();
    const accountUserWithNewRole = user;
    accountUserWithNewRole.role = role;
    this.accountService.updateAccountUserRole(this.data, accountUserWithNewRole);
  }

  onRemove(event: any, user: User): void {
    event.preventDefault();
    this.accountService.removeUserFromAccount(this.data, user);
  }

  
}
