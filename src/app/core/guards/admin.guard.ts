import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/auth.service';

@Injectable()
export class AdminGuard {
    private router = inject(Router);
    private authService = inject(AuthenticationService);

    canActivate() {
        const user = this.authService.getCurrentUser();

        if (user && user.isAdmin) {
            return true;
        } else {
            this.router.navigateByUrl('/');
            return false;
        }
    }
}
