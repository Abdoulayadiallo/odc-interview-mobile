import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostulantDetailsPageRoutingModule } from './postulant-details-routing.module';

import { PostulantDetailsPage } from './postulant-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostulantDetailsPageRoutingModule
  ],
  declarations: [PostulantDetailsPage]
})
export class PostulantDetailsPageModule {}
