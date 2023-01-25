import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Critere } from '../Model/critere';
import { Note } from '../Model/note';
import { NoteService } from '../Service/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  name!: string;
  note: Note;
  

  constructor(private modalCtrl: ModalController,private noteService: NoteService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  // Notez(){
  //   this.noteService.addNote(this.note,).subscribe(
  //     this.note
  //   )
  // }
}
