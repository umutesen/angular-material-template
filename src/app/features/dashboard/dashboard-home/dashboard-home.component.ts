import { Component, OnInit, inject } from "@angular/core";
import { NotificationService } from "src/app/core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { NGXLogger } from "ngx-logger";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { AccountService } from "src/app/core/services/account.service";
import { Observable, from } from "rxjs";
import { Account } from "src/app/core/model/account";
import { MatDialog } from "@angular/material/dialog";
import { EditAccountDialogComponent } from "../edit-account-dialog/edit-account-dialog.component";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { Store } from "@ngxs/store";
import { AccountActions } from "src/app/core/store/account.state";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.css"],
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;
  accounts$: Observable<Account[]>;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private store:Store,
    private router: Router,
    private logger: NGXLogger,
    private accountService: AccountService,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.userService.user$.subscribe((user) => {
      if(user && user.uid){
        this.currentUser = user;
        this.accounts$ = this.accountService.getAccounts(user.uid);
      }
    });
    
  }

  ngOnInit() {
    this.titleService.setTitle("Edit Account");
  }

  onSelectAccount(selectAccount: Account) {
    this.store.dispatch(new AccountActions.selectAccount(selectAccount));
    this.router.navigate(['/songs/' + selectAccount.id]);
  }

  onAddAccount() {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      data: {},
      panelClass: "dialog-responsive",
    });
  }

  onEditAccount(account: Account) {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      data: account,
      panelClass: "dialog-responsive",
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.accounts$ = this.accountService.getAccounts(this.currentUser.uid);
    });
  }
}
