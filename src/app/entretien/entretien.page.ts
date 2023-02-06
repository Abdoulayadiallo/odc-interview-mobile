import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { info } from 'console';
import { async, Subscription } from 'rxjs';
import { Critere } from '../Model/critere';
import { Note } from '../Model/note';
import { NoteResponse } from '../Model/noteresponse';
import { Postulant } from '../Model/postulant';
import { Question } from '../Model/question';
import { Utilisateur } from '../Model/utilisateur';
import { NoteComponent } from '../note/note.component';
import { AccountService } from '../Service/account.service';
import { CritereService } from '../Service/critere.service';
import { NoteService } from '../Service/note.service';
import { PostulantService } from '../Service/postulant.service';
import { QuestionService } from '../Service/question.service';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.page.html',
  styleUrls: ['./entretien.page.scss'],
})
export class EntretienPage implements OnInit {
  critere: Critere;
  criteres!: Critere[];
  id: number
  postulant: Postulant
  info: FormData;
  critereNombre: number
  note: any = [];
  isnote: boolean = false;
  subscriptions: Subscription[] = [];
  utilisateur: Utilisateur;
  idJury: any;
  noteresponse: NoteResponse;
  nomQuestion: any = []
  questions: Question[];



  constructor(private modalCtrl: ModalController,
    private critereService: CritereService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private postulantService: PostulantService,
    private noteService: NoteService,
    private accountService: AccountService) { }
  ngOnInit(): void {
    const username = this.accountService.loggInUsername
    this.getUserInfo(username)
    setTimeout(() => {
      // this.getCritere();
      this.getQuestion();
    }, 1000)

    this.id = this.route.snapshot.params['id'];

    this.postulant = new Postulant();
    this.postulantService.getOnePostulantById(this.id).subscribe(data => {
      this.postulant = data;
      console.log(data)
    });
  }
  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
        (response: Utilisateur) => {
          this.utilisateur = response;
          this.idJury = response.id;
          console.log(this.idJury)
          console.log(this.utilisateur)
        },
        error => {
          console.log(error);
          this.utilisateur = null;
        }
      ));
  }
  getQuestion() {
    this.questionService.getAllQuestion().subscribe(
      data => {
        this.questions = data
        console.log(data)
        for (let i = 1; i < this.questions.length; i++) {
          if (this.questions[i].critere.id == i+1) {
            console.log(this.questions[i].critere.id)
            this.getNote(this.questions[i].critere.id);
          }

        }
      }
    )
  }
  getNote(i: number): number {
    this.noteService.getNoteByCritere(i, this.idJury, this.id).subscribe(data => {
      console.log(data)
      this.noteresponse = data
      if (this.noteresponse.noted == true) {
        this.isnote = data.noted
        this.note[i] = data.contenu.point
        console.log(this.note[i])
      }
    })
    return this.note[i]
  }

  // getCritere(){
  //   this.critereService.getAllCritere().subscribe(data => {
  //     console.log(data)
  //     this.criteres = data;
  //     this.critereNombre=data.length
  //     for(let i = 0; i < this.critereNombre; i++){
  //       console.log(this.criteres[i].id)
  //       if(this.criteres[i].id == i+1){
  //         this.nomQuestion.push(this.criteres[i].question[0].nomQuestion)
  //         console.log(this.nomQuestion)
  //         this.noteService.getNoteByCritere(this.criteres[i].id,this.idJury,this.id,).subscribe(data =>{
  //           this.noteresponse=data
  //           this.isnote=data.noted
  //            this.note.push(data.contenu.point)
  //         })
  //       }

  //     }
  //     console.log(this.note)
  //   })
  // }
  // getnoteByCritere(critereId:number){
  //   this.noteService.getNoteByCritere(critereId).subscribe(data =>{
  //     console.log(data)
  //     this.note=data[0].point
  //   })
  // }
  async openModal(id: number) {
    const modal = await this.modalCtrl.create({
      component: NoteComponent,
      componentProps: {
        'data': { "postulant": this.postulant, "critereId": id }
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }
}
