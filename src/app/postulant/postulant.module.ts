import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostulantPageRoutingModule } from './postulant-routing.module';

import { PostulantPage } from './postulant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostulantPageRoutingModule
  ],
  declarations: [PostulantPage]
})
export class PostulantPageModule {}
