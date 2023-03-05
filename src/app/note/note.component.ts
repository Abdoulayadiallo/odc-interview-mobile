import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Critere } from '../Model/critere';
import { Note } from '../Model/note';
import { Question } from '../Model/question';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
import { AlertService } from '../Service/alert.service';
import { NoteService } from '../Service/note.service';
import { QuestionService } from '../Service/question.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  name: string;
  data: any;
  utilisateur: Utilisateur;
  username: string;
  note: Note = new Note();
  userconnected: string;
  notesList: Note[];
  critereList: Critere[];
  Repond: Question[];

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalCtrl: ModalController,
    private noteService: NoteService,
    private accountService: AccountService,
    private alertService: AlertService,
    private questionService: QuestionService
  ) {}
  ngOnInit(): void {
    this.getUserInfo(this.accountService.loggInUsername);
    this.username = this.accountService.loggInUsername;
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
        (response: Utilisateur) => {
          this.utilisateur = response;
          this.userconnected = response.username;
          console.log(response);
          console.log(this.utilisateur);
        },
        (error) => {
          console.log(error);
          this.utilisateur = null;
        }
      )
    );
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  //RECUPERER TOUS LES NOTES POUR RAFRACHIR LES NOUVELLES DONNEES
  getAllNote() {
    this.noteService.getAllNote().subscribe((data) => {
      this.notesList = data;
    });
  }
  //RECUPERER TOUS LES QUESTIONS NOTES POUR RAFRACHIR LES NOUVELLES DONNEES
  getNombreQuestionNoteByPostulant() {
    this.questionService.getAllQuestion().subscribe((data) => {
      this.Repond = data;
    });
  }

  confirm() {
    this.modalCtrl.dismiss();
    this.closeModal.emit();
    this.ajouterNote();
    setTimeout(() => {
      // Pour rafrachir les nouvelles valeurs
      // this.getAllNote()
      // this.getNombreQuestionNoteByPostulant()
    }, 1000);
    //Pour fermet le modal
    return this.modalCtrl.dismiss(this.note, 'confirm');
  }
  //Une methode quiva ajouter des notes a un postulant par l'id critere, l'id postulant et l'id user
  ajouterNote() {
    this.noteService
      .addNote(
        this.note,
        this.data.critereId,
        this.data.postulant.id,
        this.userconnected
      )
      .subscribe(
        (response) => {
          console.log(response);
          //Une alerte de succès
          this.alertService.presentToast('Note ajouté avec succès.', 'success');
        },
        (error) => {
          console.log(error);
          //Une alerte d'erreur
          this.alertService.presentToast(
            "Une erreur est survenu lors de l'ajout ...",
            'danger'
          );
        }
      );
  }
}
