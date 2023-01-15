import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulantPage } from './postulant.page';

const routes: Routes = [
  {
    path: '',
    component: PostulantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulantPageRoutingModule {}
