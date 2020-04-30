import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [FooterComponent, MenuComponent, HomeComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [FooterComponent, MenuComponent]
})
export class NavegacaoModule { }
