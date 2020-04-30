import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';

import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { ProdutoService } from './produto.service';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ProdutoRoutingModule } from './produto.route';
import { NgxSpinnerModule } from "ngx-spinner";


registerLocaleData(localePt);

@NgModule({
  declarations: [CadastroComponent, ListaComponent, EditarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    CurrencyMaskModule,
    NgSelectModule,
    NgbModule,
    MatSortModule,
    SharedModule,
    ProdutoRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    ProdutoService,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
})
export class ProdutoModule { }
