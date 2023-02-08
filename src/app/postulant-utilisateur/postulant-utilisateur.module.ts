import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostulantUtilisateurPageRoutingModule } from './postulant-utilisateur-routing.module';

import { PostulantUtilisateurPage } from './postulant-utilisateur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostulantUtilisateurPageRoutingModule
  ],
  declarations: [PostulantUtilisateurPage]
})
export class PostulantUtilisateurPageModule {}
