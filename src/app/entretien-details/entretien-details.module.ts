import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntretienDetailsPageRoutingModule } from './entretien-details-routing.module';

import { EntretienDetailsPage } from './entretien-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntretienDetailsPageRoutingModule
  ],
  declarations: [EntretienDetailsPage]
})
export class EntretienDetailsPageModule {}
