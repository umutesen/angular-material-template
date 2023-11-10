import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    ui: firebaseui.auth.AuthUI;
    loginForm!: UntypedFormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
        private afAuth: AngularFireAuth,
        private userService: UserService) {
    }

    ngOnInit() {
        this.afAuth.app.then(app => {
            const uiConfig = {
                signInOptions: [
                    EmailAuthProvider.PROVIDER_ID,
                    GoogleAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    signInSuccessWithAuthResult: (authResult: any) => {
                        this.onLoginSuccessful(authResult);
                        return true;
                      },
                }
            };
            uiConfig.callbacks.signInSuccessWithAuthResult.bind(this);

            this.ui = new firebaseui.auth.AuthUI(app.auth());

            this.ui.start("#login-container", uiConfig);

            this.ui.disableAutoSignIn();
        });

        this.titleService.setTitle('Setlist Songs - Login');

        this.authenticationService.logout();
        this.createForm();
    }

    ngOnDestroy() {
        this.ui.delete();
    }

    onLoginSuccessful(authResult: any) {
        console.log('Firebase UI result:', authResult);
        this.userService.getUser(authResult.user.uid).subscribe((user) => {
            if(!user){
                this.userService.addUser(authResult.user);
            }
            this.router.navigateByUrl("/dashboard");
        });
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new UntypedFormControl('', Validators.required),
            rememberMe: new UntypedFormControl(savedUserEmail !== null)
        });
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;

        this.loading = true;
        this.authenticationService
            .login(email.toLowerCase(), password)
            .subscribe(
                data => {
                    if (rememberMe) {
                        localStorage.setItem('savedUserEmail', email);
                    } else {
                        localStorage.removeItem('savedUserEmail');
                    }
                    this.router.navigate(['/']);
                },
                error => {
                    this.notificationService.openSnackBar(error.error);
                    this.loading = false;
                }
            );
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
