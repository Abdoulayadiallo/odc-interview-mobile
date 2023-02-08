import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulantUtilisateurPage } from './postulant-utilisateur.page';

const routes: Routes = [
  {
    path: '',
    component: PostulantUtilisateurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulantUtilisateurPageRoutingModule {}
