import {Router} from '@angular/router';

import {AdminGuard} from './admin.guard';
import {AuthenticationService} from '../services/auth.service';
import {NotificationService} from "../services/notification.service";
import {Injector} from "@angular/core";


describe('AdminGuard', () => {
    let guard: AdminGuard;
    const router = jest.mocked(Router.prototype);
    const authService = jest.mocked(AuthenticationService.prototype);
    const notificationService = jest.mocked(NotificationService.prototype);

    beforeEach(() => {
        router.navigateByUrl = jest.fn()
            .mockResolvedValueOnce(() => Promise.resolve(true));
        notificationService.openSnackBar = jest.fn();
        guard = Injector.create({
            providers: [
                {provide: AdminGuard},
                {provide: Router, useValue: router},
                {provide: AuthenticationService, useValue: authService},
                {provide: NotificationService, useValue: notificationService},
            ],
        }).get(AdminGuard);
    });

    it('create an instance', () => {
        expect(guard).toBeTruthy();
    });

    it('returns true if user is admin', () => {
        const user = {'isAdmin': true};
        authService.getCurrentUser = jest.fn()
            .mockImplementation(() => user);

        const result = guard.canActivate();

        expect(result).toBe(true);
    });

    it('returns false if user does not exist', () => {
        authService.getCurrentUser = jest.fn()
            .mockImplementation(() => null);

        const result = guard.canActivate();

        expect(result).toBe(false);
    });

    it('returns false if user is not admin', () => {
        const user = {'isAdmin': false};
        authService.getCurrentUser = jest.fn()
            .mockImplementation(() => user);

        const result = guard.canActivate();

        expect(result).toBe(false);
    });

    it('redirects to root if user is not an admin', () => {
        const user = {'isAdmin': false};
        authService.getCurrentUser = jest.fn()
            .mockImplementation(() => user);

        guard.canActivate();

        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('redirects to root if user does not exist', () => {
        authService.getCurrentUser = jest.fn()
            .mockImplementation(() => null);

        guard.canActivate();

        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
});
