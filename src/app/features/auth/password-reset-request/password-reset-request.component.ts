import {Router} from '@angular/router';
import {Component, inject, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from "../../../core/services/auth.service";
import {NotificationService} from "../../../core/services/notification.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-password-reset-request',
    templateUrl: './password-reset-request.component.html',
    styleUrls: ['./password-reset-request.component.css'],
    standalone: false
})
export class PasswordResetRequestComponent implements OnInit {
    form!: UntypedFormGroup;
    loading!: boolean;
    private email!: string;
    private authService = inject(AuthenticationService);
    private notificationService = inject(NotificationService);
    private titleService = inject(Title);
    private router = inject(Router);

    ngOnInit() {
        this.titleService.setTitle(environment.applicationName + " - " + $localize`:@@password-reset-request.title:Password Reset Request`);

        this.form = new UntypedFormGroup({
            email: new UntypedFormControl('', [Validators.required, Validators.email])
        });

        this.form.get('email')?.valueChanges
            .subscribe((val: string) => {
                this.email = val.toLowerCase();
            });
    }

    resetPassword() {
        this.loading = true;
        this.authService
            .passwordResetRequest(this.email)
            .subscribe({
                next: (_) => {
                    this.router.navigate(['/auth/login']);
                    this.notificationService.openSnackBar('Password verification mail has been sent to your email address.');
                },
                error: (error) => {
                    this.loading = false;
                    this.notificationService.openSnackBar(error.error);
                }
            });
    }

    cancel() {
        this.router.navigate(['/']);
    }
}
