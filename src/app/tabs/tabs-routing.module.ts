import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'postulant',
        loadChildren: () => import('../postulant/postulant.module').then( m => m.PostulantPageModule)
      },
      {
        path: 'jury',
        loadChildren: () => import('../jury/jury.module').then( m => m.JuryPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
      },
      
        
    ]
  },
  {
      path: '',
      redirectTo: 'tabs/home',
      pathMatch: 'full'
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
