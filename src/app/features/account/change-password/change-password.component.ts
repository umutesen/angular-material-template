import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Component, inject, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {AuthenticationService} from "../../../core/services/auth.service";
import {SpinnerService} from "../../../core/services/spinner.service";
import {NotificationService} from "../../../core/services/notification.service";


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
    standalone: false
})
export class ChangePasswordComponent implements OnInit {
    form!: UntypedFormGroup;
    hideCurrentPassword: boolean = true;
    hideNewPassword: boolean = true;
    currentPassword!: string;
    newPassword!: string;
    newPasswordConfirm!: string;
    disableSubmit!: boolean;
    private authService = inject(AuthenticationService);
    private logger = inject(NGXLogger);
    private spinnerService = inject(SpinnerService);
    private notificationService = inject(NotificationService);

    ngOnInit() {
        this.form = new UntypedFormGroup({
            currentPassword: new UntypedFormControl('', Validators.required),
            newPassword: new UntypedFormControl('', Validators.required),
            newPasswordConfirm: new UntypedFormControl('', Validators.required),
        });

        this.form.get('currentPassword')?.valueChanges
            .subscribe(val => {
                this.currentPassword = val;
            });

        this.form.get('newPassword')?.valueChanges
            .subscribe(val => {
                this.newPassword = val;
            });

        this.form.get('newPasswordConfirm')?.valueChanges
            .subscribe(val => {
                this.newPasswordConfirm = val;
            });

        this.spinnerService.visibility.subscribe((value) => {
            this.disableSubmit = value;
        });
    }

    changePassword() {
        if (this.newPassword !== this.newPasswordConfirm) {
            this.notificationService.openSnackBar('New passwords do not match.');
            return;
        }

        const email = this.authService.getCurrentUser().email;

        this.authService.changePassword(email, this.currentPassword, this.newPassword)
            .subscribe({
                next: (_) => {
                    this.logger.info(`User ${email} changed password.`);
                    this.form.reset();
                    this.notificationService.openSnackBar('Your password has been changed.');
                },
                error: (error) => {
                    this.notificationService.openSnackBar(error.error);

                }
            });
    }
}
