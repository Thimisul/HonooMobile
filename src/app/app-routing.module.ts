import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./_page/user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./_page/index/index.module').then( m => m.IndexPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./_page/user/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./_page/eventos/eventos/eventos.module').then( m => m.EventosPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'evento',
    loadChildren: () => import('./_page/eventos/evento/evento.module').then( m => m.EventoPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./_page/eventos/search/search.module').then( m => m.SearchPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./_page/eventos/evento/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'meus-dados',
    loadChildren: () => import('./_page/user/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule),canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
