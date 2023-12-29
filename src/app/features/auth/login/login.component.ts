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
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FlexModule]
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

        
    }

    ngOnDestroy() {
        this.ui.delete();
    }

    onLoginSuccessful(authResult: any) {
        console.log('Firebase UI result:', authResult);
        this.userService.getUserById(authResult.user.uid).subscribe((user) => {
            if(!user){
                this.userService.addUser(authResult.user);
            }
            this.router.navigateByUrl("/dashboard");
        });
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
