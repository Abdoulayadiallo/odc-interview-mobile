import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { info } from 'console';
import { async } from 'rxjs';
import { Critere } from '../Model/critere';
import { Postulant } from '../Model/postulant';
import { NoteComponent } from '../note/note.component';
import { CritereService } from '../Service/critere.service';
import { NoteService } from '../Service/note.service';
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
  info: FormData;
  critereNombre:number
  note: any = [];

  

  //message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(private modalCtrl: ModalController,
    private critereService:CritereService,
    private route: ActivatedRoute, 
    private postulantService: PostulantService,
    private noteService:NoteService) {}
  ngOnInit(): void {
    this.getCritere();
    this.id = this.route.snapshot.params['id'];

    this.postulant = new Postulant();
    this.postulantService.getOnePostulantById(this.id).subscribe( data => {
      this.postulant = data;
      console.log(data)
    });
  }

  getCritere(){
    this.critereService.getAllCritere().subscribe(data => {
      console.log(data)
      this.criteres = data;
      this.critereNombre=data.length
      for(let i = 0; i < this.critereNombre; i++){
        console.log(this.criteres[i].id)
        if(this.criteres[i].id == i+1){
          this.noteService.getNoteByCritere(this.criteres[i].id).subscribe(data =>{
            console.log(data)
            this.note.push(data[i].point)
          })
        }

      }
      console.log(this.note)
    })
  }
  // getnoteByCritere(critereId:number){
  //   this.noteService.getNoteByCritere(critereId).subscribe(data =>{
  //     console.log(data)
  //     this.note=data[0].point
  //   })
  // }
  async openModal(id:number) {
    const modal = await this.modalCtrl.create({
      component: NoteComponent,
      componentProps:{
        'data':{"postulant":this.postulant,"critereId":id}
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
     // this.message = `Hello, ${data}!`;
    }
  }
}
