import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../_authService/authentication.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { NotifyService } from '../common/notify.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private notify:NotifyService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                //this.authenticationService.logout();
              //  location.reload(true);
              const error = err.error.message || err.statusText;
              this.notify.setErrorResponse(error);
              console.log("error",err)
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}