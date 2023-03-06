import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { info } from 'console';
import { async, lastValueFrom, Subscription } from 'rxjs';
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
  postulant: Postulant = new Postulant
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
  nombreRepond: number;
  questionView: any;
  myWrapperList: Array<MyWrapper> = []; 


  constructor(private modalCtrl: ModalController,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private postulantService: PostulantService,
    private noteService: NoteService,
    private accountService: AccountService) { }
  ngOnInit(): void {
    const username = this.accountService.loggInUsername
    this.getUserInfo(username)
    this.id = this.route.snapshot.params['id'];
    this.getPostulantById().then(() => {
      this.getNombreQuestionNoteByPostulant();
      // this.myWrapperList.splice(0, this.myWrapperList.length);
      // this.getQuestion();
    });

  }
  async getPostulantById(): Promise<void>{
    try {
      const data = await lastValueFrom( this.postulantService.getOnePostulantById(this.id));
      this.postulant = data;
    } catch (error) {
      console.error(error);
    }
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

  getNombreQuestionNoteByPostulant() {
    this.questionService.getNombreQuestionNoteByPostulant(this.id).subscribe(data => {
      this.nombreRepond = data.pourcentage
    })
  }
 //Afficher Question
  getQuestion() {
    this.questionService.getAllQuestionByEntretien(this.utilisateur.entretien.id).subscribe(data => {
      this.questionView = data
      data.forEach((question: Question) => {
        this.noteService.getNoteByCritere(question.critere.id, this.idJury, this.id).subscribe(note => {
          let myWrapper = new MyWrapper(question,note?.contenu?.point)
          this.myWrapperList.push(myWrapper);
        })
        console.log(this.myWrapperList)
      });
    })
  }
  
  ionViewWillEnter() {
    this.myWrapperList.splice(0, this.myWrapperList.length);
    this.getQuestion();
    this.getNombreQuestionNoteByPostulant()
  }
  async openModal(id: number) {
    const modal = await this.modalCtrl.create({
      component: NoteComponent,
      componentProps: {
        'data': { "postulant": this.postulant, "critereId": id }
      }
    });
    modal.onDidDismiss().then(() => {
      this.ionViewWillEnter();
    });
    modal.present();

    return await modal.onWillDismiss();
  }
}


export class MyWrapper {
  constructor(
    public question: Question,
    public point: number
  ){}
}