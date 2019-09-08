import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { AuthenticationService } from '../../core/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  private token: string;
  email: string;
  form: FormGroup;
  loading: boolean;
  hideNewPassword: boolean;
  hideNewPasswordConfirm: boolean;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private titleService: Title) {

    this.titleService.setTitle('angular-material-admin - Password Reset');
    this.hideNewPassword = true;
    this.hideNewPasswordConfirm = true;
  }

  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
      this.email = params.get('email');

      if (!this.token || !this.email) {
        this.router.navigate(['/']);
      }
    });

    this.form = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirm: new FormControl('', Validators.required)
    });
  }

  resetPassword() {

    const password = this.form.get('newPassword').value;
    const passwordConfirm = this.form.get('newPasswordConfirm').value;

    if (password !== passwordConfirm) {
      this.notificationService.openSnackBar('Passwords do not match');
      return;
    }

    this.loading = true;

    this.authService.passwordReset(this.email, this.token, password, passwordConfirm)
      .subscribe(
        data => {
          this.notificationService.openSnackBar('Your password has been changed.');
          this.router.navigate(['/auth/login']);
        },
        error => {
          this.notificationService.openSnackBar(error.error);
          this.loading = false;
        }
      );
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
