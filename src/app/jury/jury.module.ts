import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuryPageRoutingModule } from './jury-routing.module';

import { JuryPage } from './jury.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuryPageRoutingModule
  ],
  declarations: [JuryPage]
})
export class JuryPageModule {}
