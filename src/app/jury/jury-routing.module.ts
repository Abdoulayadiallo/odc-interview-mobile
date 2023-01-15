import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuryPage } from './jury.page';

const routes: Routes = [
  {
    path: '',
    component: JuryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuryPageRoutingModule {}
