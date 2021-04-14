import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { CadastroComponent } from './produto/cadastro/cadastro.component';
import { LoginComponent } from './navegacao/login/login.component';
import { ListaComponent } from './produto/lista/lista.component';
import { EditarComponent } from './produto/editar/editar.component';
import { AuthGuard } from './core/_helpers/auth.guard';


const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full'},    
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'produto',
  loadChildren: () => import('./produto/produto.module')
  .then(m => m.ProdutoModule)},
  
  // { path: 'produto/cadastro', component: CadastroComponent, canActivate: [AuthGuard]},
  // { path: 'produto/lista', component: ListaComponent, canActivate: [AuthGuard] },
  // { path: 'produto/editar/:id', component: EditarComponent, canActivate: [AuthGuard] },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
