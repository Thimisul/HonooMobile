import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'index',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../_page/index/index.module').then(m => m.IndexPageModule)
          }
        ]
      },
      {
        path: 'eventos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../_page/eventos/eventos/eventos.module').then(m => m.EventosPageModule)
          }
        ]
      },
      {
        path: 'conta',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../_page/user/meus-dados/meus-dados.module').then(m => m.MeusDadosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
