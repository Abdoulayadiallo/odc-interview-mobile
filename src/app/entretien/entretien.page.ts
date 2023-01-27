import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { async } from 'rxjs';
import { Critere } from '../Model/critere';
import { Postulant } from '../Model/postulant';
import { NoteComponent } from '../note/note.component';
import { CritereService } from '../Service/critere.service';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.page.html',
  styleUrls: ['./entretien.page.scss'],
})
export class EntretienPage implements OnInit{
  critere: Critere;
  criteres!: Critere[];
  id: number
  postulant: Postulant
  

  //message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(private modalCtrl: ModalController,
    private critereService:CritereService,
    private route: ActivatedRoute, 
    private postulantService: PostulantService) {}
  ngOnInit(): void {
    this.getCritere();
    this.id = this.route.snapshot.params['id'];

    this.postulant = new Postulant();
    this.postulantService.getOnePostulantById(this.id).subscribe( data => {
      this.postulant = data;
    });
  }

  getCritere(){
    this.critereService.getAllCritere().subscribe(data => {
      console.log(data)
      this.criteres = data;
    })
  }
  async openModal(id:number) {
    const modal = await this.modalCtrl.create({
      component: NoteComponent,
      componentProps:{
        'data':id
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
     // this.message = `Hello, ${data}!`;
    }
  }
}
