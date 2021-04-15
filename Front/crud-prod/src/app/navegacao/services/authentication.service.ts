import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { BaseService } from '../../core/_services/base.service';
import { User } from '../models/user';
import { LoginHelper } from '../../core/_helpers/login-helper';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {

  constructor(private http: HttpClient, private loginHelper: LoginHelper) {
    super();
    this.urlServiceV1 += "login/"
  }

  login(email: string, senha: string) {
    return this.http.post<User>(this.urlServiceV1, JSON.stringify({ email, senha }), this.obterHeaderJson())
      .pipe(
        tap(user => this.loginHelper.salvarLocalStorage(user))
      );
  }
}