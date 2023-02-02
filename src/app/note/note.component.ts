import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Critere } from '../Model/critere';
import { Note } from '../Model/note';
import { Postulant } from '../Model/postulant';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
import { NoteService } from '../Service/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  name: string;
  data:any
  utilisateur:Utilisateur
  username:string
  note: Note = new Note();
  userconnected: string;


  constructor(private modalCtrl: ModalController,private noteService: NoteService,private accountService:AccountService) {}
  ngOnInit(): void {
    this.getUserInfo(this.accountService.loggInUsername);
    this.username=this.accountService.loggInUsername;
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        this.userconnected=response.username;
        console.log(response)
        console.log(this.utilisateur)
      },
      error => {
        console.log(error);
        this.utilisateur = null;
      }
    ));
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.ajouterNote()
    return this.modalCtrl.dismiss(this.note, 'confirm');
  }
  ajouterNote(){
    this.noteService.addNote(this.note,this.data.critereId,this.data.postulant.id,this.userconnected).subscribe(response =>
      console.log(response)
    )
  }

}
