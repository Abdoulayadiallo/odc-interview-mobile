import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuryDetailsPageRoutingModule } from './jury-details-routing.module';

import { JuryDetailsPage } from './jury-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuryDetailsPageRoutingModule
  ],
  declarations: [JuryDetailsPage]
})
export class JuryDetailsPageModule {}
