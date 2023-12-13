import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class AdminGuard  {

    constructor(private router: Router,
        private authService: AuthenticationService) { }

    canActivate() {
        const user = this.authService.getCurrentUser();

        if (user && user.isAdmin) {
            return true;

        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
