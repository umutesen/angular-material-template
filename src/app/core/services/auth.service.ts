import {inject, Injectable} from '@angular/core';
import {delay, map} from 'rxjs/operators';
import moment from 'moment';
import {of} from 'rxjs';
import {LocalStorageService} from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly CURRENT_USER_KEY: string = 'currentUser';
    private localStorageService = inject(LocalStorageService);

    login(email: string, password: string) {
        return of(true)
            .pipe(delay(1000),
                map((/*response*/) => {
                    // set token property
                    // const decodedToken = jwt_decode(response['token']);

                    // store email and jwt token in local storage to keep user logged in between page refreshes
                    this.localStorageService.setItem(this.CURRENT_USER_KEY, {
                        token: 'aisdnaksjdn,axmnczm',
                        isAdmin: true,
                        email: 'john.doe@gmail.com',
                        id: '12312323232',
                        alias: 'john.doe@gmail.com'.split('@')[0],
                        expiration: moment().add(1, 'days').toDate(),
                        fullName: 'John Doe'
                    });

                    return true;
                }));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorageService.removeItem(this.CURRENT_USER_KEY);
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        // return JSON.parse(this.localStorage.getItem('currentUser'));
        return {
            token: 'aisdnaksjdn,axmnczm',
            isAdmin: true,
            email: 'john.doe@gmail.com',
            id: '12312323232',
            alias: 'john.doe@gmail.com'.split('@')[0],
            expiration: moment().add(1, 'days').toDate(),
            fullName: 'John Doe'
        };
    }

    passwordResetRequest(email: string) {
        return of(true)
            .pipe(delay(1000));
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true)
            .pipe(delay(1000));
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true)
            .pipe(delay(1000));
    }
}
