import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class LoginHelper  {

  private currentUserSubject: BehaviorSubject<any>;
  private logadoSubject: BehaviorSubject<boolean>;
  private logado: Observable<boolean>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.logadoSubject = new BehaviorSubject<boolean>(false);
    this.logado = this.logadoSubject.asObservable();
  }

  public get currentUserValue() : any {
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

  public get obterToken(): string {
    let user = this.currentUserSubject.value;
    return user ? user.accessToken : null;
  }
 
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.logadoSubject.next(false);
  }

  salvarLocalStorage(user: any) {
    let tokenPayload = decode(user.accessToken);
    user.expiresIn = tokenPayload.exp * 1000;

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}