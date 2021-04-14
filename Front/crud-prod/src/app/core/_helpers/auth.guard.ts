import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canLoad(): boolean  {
        let estaAutenticado: boolean;
        this.authenticationService.estaAutenticado.subscribe(x =>  estaAutenticado = x);
        return estaAutenticado;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let estaAutenticado: boolean;
        this.authenticationService.estaAutenticado.subscribe(x =>  estaAutenticado = x);

        if (estaAutenticado) {
            // logged in so return true
            return true;
        }

        this.authenticationService.logout();
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}