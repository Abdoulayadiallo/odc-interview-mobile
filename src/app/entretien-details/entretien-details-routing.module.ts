import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntretienDetailsPage } from './entretien-details.page';

const routes: Routes = [
  {
    path: '',
    component: EntretienDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntretienDetailsPageRoutingModule {}
