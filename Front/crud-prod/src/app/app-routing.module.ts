import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { CadastroComponent } from './produto/cadastro/cadastro.component';
import { LoginComponent } from './navegacao/login/login.component';
import { ListaComponent } from './produto/lista/lista.component';
import { EditarComponent } from './produto/editar/editar.component';
import { AuthGuard } from './core/_services/auth.guard';


const routes: Routes = [

  // AuthGuard é um guarda de rota que serve para verificar se o usuário esta autenticado.
  //{ path: '', redirectTo: '/home', pathMatch: 'full'},    
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  //canLoad Verifica se o usuario ta logado antes de carregar o mudulo, serve apanas no carregamento de modulos.  canLoad: [AuthGuard]
  { path: 'produto',
  loadChildren: () => import('./produto/produto.module')
  .then(m => m.ProdutoModule)},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
