import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntretienPage } from './entretien.page';

const routes: Routes = [
  {
    path: '',
    component: EntretienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntretienPageRoutingModule {}
