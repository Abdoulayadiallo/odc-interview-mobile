import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulantDetailsPage } from './postulant-details.page';

const routes: Routes = [
  {
    path: '',
    component: PostulantDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulantDetailsPageRoutingModule {}
