import {Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {SpinnerService} from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    private spinnerService = inject(SpinnerService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show();

        return next.handle(req)
            .pipe(tap({
                next: (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.spinnerService.hide();
                    }
                },
                error: (_) => {
                    this.spinnerService.hide();
                }
            }));
    }
}
