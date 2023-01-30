import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';
import { Utilisateur } from '../Model/utilisateur';
import { NotificationComponent } from '../notification/notification.component';
import { AccountService } from '../Service/account.service';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private subscriptions: Subscription[] = [];
  postulantresponse!: Postulantresponse ;
  jurys: Utilisateur[];
  totalElement=0
  nbreJury:number
  loggInUsername: string;
  utilisateur: Utilisateur;
  nomEntretien: string;
  userpicture: string;
  userpre: string ='';
  rolename: string ='';
  entretienNombre: number;
  idEntretien: number;


  constructor(
    private pvrCtlr: PopoverController,
    private accountService: AccountService,
    private postulantService:PostulantService,
    ) {}

    ngOnInit() {
      this.userpicture = this.accountService.userPicture;
      this.getUserInfo(this.accountService.loggInUsername);
      this.getPost(this.idEntretien);
      this.getJury();
    }

  async openNotif() {
    const popup = await this.pvrCtlr.create({
      component: NotificationComponent,
    });
    popup.present();
  }
  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        this.nomEntretien= response.participant.entretien.entretienNom
        this.entretienNombre=response.participant.entretien.entretienNom.length
        this.userpre=response.prenom
        this.rolename=response.role.roleName
        this.idEntretien=response.participant.entretien.id
        console.log(response)
        console.log(this.nomEntretien)
        console.log(this.utilisateur)
      },
      error => {
        console.log(error);
        this.utilisateur = null;
      }
    ));
  }
  getPost(entretienId:number){
      this.postulantService.getAllPostulantByEntretien(entretienId).subscribe(data => {
        console.log(data)
        this.postulantresponse = data
        this.totalElement=data.totalElements
      })
    }
  getJury(){
      this.accountService.getAllJury().subscribe(data => {
        console.log(data)
        this.jurys = data
        this.nbreJury = data.length
      })
    }
}

  
    