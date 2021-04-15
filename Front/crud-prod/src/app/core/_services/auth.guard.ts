import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { LoginHelper } from '../_helpers/login-helper';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private loginHelper: LoginHelper
    ) { }

    canLoad(): boolean  {
        let estaAutenticado: boolean;
        this.loginHelper.estaAutenticado.subscribe(x =>  estaAutenticado = x);
        return estaAutenticado;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let estaAutenticado: boolean;
        this.loginHelper.estaAutenticado.subscribe(auth =>  estaAutenticado = auth);

        if (estaAutenticado) {
            // logged in so return true
            return true;
        }

        this.loginHelper.logout();
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}