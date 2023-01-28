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
  note: Note;
  data:any
  utilisateur:Utilisateur
  username:string

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

  confirm(note:Note) {
    this.ajouterNote(note)
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
  ajouterNote(note:Note){
    this.noteService.addNote(note,this.data.critere.id,this.data.postulant.id,this.utilisateur.username).subscribe(response =>
      console.log(response)
    )
  }


  // Notez(){
  //   this.noteService.addNote(this.note,).subscribe(
  //     this.note
  //   )
  // }
}
