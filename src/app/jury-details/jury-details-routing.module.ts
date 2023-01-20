import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuryDetailsPage } from './jury-details.page';

const routes: Routes = [
  {
    path: '',
    component: JuryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuryDetailsPageRoutingModule {}
