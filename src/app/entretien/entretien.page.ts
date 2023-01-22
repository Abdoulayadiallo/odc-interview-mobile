import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Critere } from '../Model/critere';
import { NoteComponent } from '../note/note.component';
import { CritereService } from '../Service/critere.service';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.page.html',
  styleUrls: ['./entretien.page.scss'],
})
export class EntretienPage implements OnInit{
  critere: Critere;
  criteres!: Critere[];
  

  //message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(private modalCtrl: ModalController,private critereService:CritereService) {}
  ngOnInit(): void {
    this.getCritere()
  }

  getCritere(){
    this.critereService.getAllCritere().subscribe(data => {
      console.log(data)
      this.criteres = data;
    })
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NoteComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
     // this.message = `Hello, ${data}!`;
    }
  }
}
