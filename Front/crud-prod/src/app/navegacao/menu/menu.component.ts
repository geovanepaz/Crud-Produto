import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  estaLogado: boolean;
  public isMenuCollapsed = true;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.estaAutenticado.subscribe(x => this.estaLogado = x);
  }

  ngOnInit() {
    this.isMenuCollapsed = true;
  }

  logout() {
    this.isMenuCollapsed = true;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
