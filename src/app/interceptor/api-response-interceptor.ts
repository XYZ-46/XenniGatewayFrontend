import { HttpInterceptorFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotifService } from '../services/notif.service';
import { inject } from '@angular/core';
import { ApiResponse } from '../Interface/api-response.interface';


export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
    const notif = inject(NotifService);
    return next(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                const body = event.body as ApiResponse;
                if (body?.Message) notif.show(body.Message, 'success', { delay: 3000 });
            }

        }),
        catchError((error: HttpErrorResponse) => {
            const apiErr = error?.error as ApiResponse | undefined;

            if (apiErr?.Message) {
                notif.show(apiErr.Message, 'error', { delay: 3000 });
            } else {
                notif.show("Unexpected error", 'error', { delay: 3000 });
            }
            return throwError(() => error); // Re-throw the error for the component to handle
        })
    );
};