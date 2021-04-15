import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { AuthGuard } from '../core/_services/auth.guard';


const produtoRouterConfig: Routes = [
     { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
    { path: 'lista', component: ListaComponent, canActivate: [AuthGuard] },
     { path: 'editar/:id', component: EditarComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [RouterModule]
})
export class ProdutoRoutingModule { }