import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import decode from 'jwt-decode';

import { User } from '../_models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {

  private currentUserSubject: BehaviorSubject<User>;
  private logadoSubject: BehaviorSubject<boolean>;
  private logado: Observable<boolean>;

  constructor(private http: HttpClient) {
    super();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.logadoSubject = new BehaviorSubject<boolean>(false);
    this.logado = this.logadoSubject.asObservable();
    this.urlServiceV1 += "login/"
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get estaAutenticado(): Observable<boolean> {
    let user = this.currentUserSubject.value;
    if (!user) {
      this.logadoSubject.next(false)
      return this.logado;
    }

    this.logadoSubject.next(user.expiresIn > Date.now())
    return this.logado;
  }

  login(email: string, senha: string) {
    return this.http.post<User>(this.urlServiceV1, JSON.stringify({ email, senha }), this.obterHeaderJson())
      .pipe(
        tap(user => this.salvarLocalStorage(user))
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.logadoSubject.next(false);
  }

  private salvarLocalStorage(user: User) {
    let tokenPayload = decode(user.accessToken);
    user.expiresIn = tokenPayload.exp * 1000;

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}