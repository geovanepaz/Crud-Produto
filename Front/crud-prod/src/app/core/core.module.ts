import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationService } from '../navegacao/services/authentication.service';
import { AuthGuard } from './_services/auth.guard';
import { ErrorInterceptor } from './_services/error.interceptor';
import { JwtInterceptor } from './_services/jwt.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService, 
    AuthGuard
  ],
})
export class CoreModule { }
