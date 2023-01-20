import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntretienPageRoutingModule } from './entretien-routing.module';

import { EntretienPage } from './entretien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntretienPageRoutingModule
  ],
  declarations: [EntretienPage]
})
export class EntretienPageModule {}
