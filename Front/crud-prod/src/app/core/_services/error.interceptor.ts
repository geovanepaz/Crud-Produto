import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../navegacao/services/authentication.service';
import { Router } from '@angular/router';
import { LoginHelper } from '../_helpers/login-helper';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private loginHelper: LoginHelper) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(response => {

            if (response.status === 401) {
                // auto logout if 401 response returned from api
                this.loginHelper.logout();
                this.router.navigate(['/login']);
            }
          
            if (response.status === 400) {
                response.error.message = response.error.error
                return throwError(response);
            }
          
            if (response.status === 0) {
                response.error.message = "Serviço temporariamente indisponível.";
                return throwError(response);
            }
        
            response.error.message = 'Status: ' + response.status + ' se o erro persistir contate o administrador';
            return throwError(response);
        }))
    }
}