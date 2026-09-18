import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {AuthenticationService} from '../services/auth.service';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthenticationService);
    private router = inject(Router);
    private dialog = inject(MatDialog);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.getCurrentUser();

        if (user && user.token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + user.token)
            });

            return next.handle(cloned)
                .pipe(tap({
                    next: (_: HttpEvent<any>) => {

                    },
                    error: (error) => {
                        if (error instanceof HttpErrorResponse) {
                            if (error.status === 401) {
                                this.dialog.closeAll();
                                this.router.navigate(['/auth/login']);
                            }
                        }
                    }
                }));
        } else {
            return next.handle(req);
        }
    }
}
