import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { info } from 'console';
import { async, Subscription } from 'rxjs';
import { Critere } from '../Model/critere';
import { NoteResponse } from '../Model/noteresponse';
import { Postulant } from '../Model/postulant';
import { Question } from '../Model/question';
import { Utilisateur } from '../Model/utilisateur';
import { NoteComponent } from '../note/note.component';
import { AccountService } from '../Service/account.service';
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
  isnote:boolean;
  subscriptions: Subscription[]=[];
  utilisateur: Utilisateur;
  idJury: any;
  noteresponse: NoteResponse;
  nomQuestion:any=[]

  

  //message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(private modalCtrl: ModalController,
    private critereService:CritereService,
    private route: ActivatedRoute, 
    private postulantService: PostulantService,
    private noteService:NoteService,
    private accountService:AccountService) {}
  ngOnInit(): void {
    const username=this.accountService.loggInUsername
    this.getUserInfo(username)
    setTimeout(()=>{
      this.getCritere();
    },500)

    this.id = this.route.snapshot.params['id'];

    this.postulant = new Postulant();
    this.postulantService.getOnePostulantById(this.id).subscribe( data => {
      this.postulant = data;
      console.log(data)
    });
  }
  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        this.idJury=response.id;
        console.log(this.idJury)
        console.log(this.utilisateur)
      },
      error => {
        console.log(error);
        this.utilisateur = null;
      }
    ));
  }
  getCritere(){
    this.critereService.getAllCritere().subscribe(data => {
      console.log(data)
      this.criteres = data;
      this.critereNombre=data.length
      for(let i = 0; i < this.critereNombre; i++){
        console.log(this.criteres[i].id)
        if(this.criteres[i].id == i+1){
          this.nomQuestion.push(this.criteres[i].question[0].nomQuestion)
          console.log(this.nomQuestion)
          this.noteService.getNoteByCritere(this.criteres[i].id,this.idJury,this.id,).subscribe(data =>{
            this.noteresponse=data
            this.isnote=data.noted
             this.note.push(data.contenu.point)
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
