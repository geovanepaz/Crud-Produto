import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHelper } from 'src/app/core/_helpers/login-helper';
import { AuthenticationService } from 'src/app/navegacao/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  estaLogado: boolean;
  public isMenuCollapsed = true;

  constructor(private router: Router, private loginHelper: LoginHelper) {}

  ngOnInit() {
    this.loginHelper.estaAutenticado.subscribe((x: boolean) => this.estaLogado = x);
    this.isMenuCollapsed = true;
  }

  logout() {
    this.isMenuCollapsed = true;
    this.loginHelper.logout();
    this.router.navigate(['/login']);
  }
}
