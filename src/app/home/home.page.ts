import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Participant } from '../Model/participant';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';
import { Utilisateur } from '../Model/utilisateur';
import { NotificationComponent } from '../notification/notification.component';
import { AccountService } from '../Service/account.service';
import { EntretienService } from '../Service/entretien.service';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  rootPage:any;
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
  public idEntretien: number;
  MasculinNOmbre: any;
  FemininNOmbre: any;
  participant: Participant;
  idJury: number;
  usernameconnected: string;



  constructor(
    private pvrCtlr: PopoverController,
    private accountService: AccountService,
    private postulantService:PostulantService,
    private entretienService:EntretienService,
    ) {}

    ngOnInit() {
      this.userpicture = this.accountService.userPicture;
      const username=this.accountService.loggInUsername
      // setTimeout(()=>{
        this.getUserInfo(username)
      // }
      //   ,100
      // )
      
      // setTimeout(()=>{
      //   this.getOne()
      // },500)
      setTimeout(()=>{
        this.getPostulantPargenre("M")
        this.getPostulantPargenre("F")
        this.getJuryNombreByEntretien();
        this.getEntretien()
        this.getPost()
      },1500
      )
  
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
        this.idJury=response.id;
        this.usernameconnected=response.username
        console.log("(-------------------------------)"+this.usernameconnected)
        console.log(this.idJury)
       this.nomEntretien= response.entretien.entretienNom
        this.userpre=response.prenom
        this.rolename=response.role.roleName
        this.idEntretien=response.entretien.id
        console.log(this.utilisateur)
      },
      error => {
        console.log(error);
        this.utilisateur = null;
      }
    ));
  }

  getPost(){
      this.postulantService.getAllPostulantByEntretien(this.idEntretien).subscribe(data => {
        console.log(data)
        this.postulantresponse = data
        this.totalElement=data.totalElements
      })
    }
  getJuryNombreByEntretien(){
      this.accountService.GetJuryNombrebyEntretien(this.idEntretien).subscribe(data => {
        console.log(data)
        this.nbreJury = data.totalListe
      })
    }
  getPostulantPargenre(genre:string){
    this.postulantService.getPostulantParGenre(this.idEntretien,genre).subscribe(
      data => { console.log(data)
      if(genre=="M"){
        this.MasculinNOmbre=data.pourcentage;
      }
      if(genre=="F"){
        this.FemininNOmbre=data.pourcentage;
      }
    },)
  }
  getEntretien(){
    this.entretienService.getAllEntretien(this.usernameconnected).subscribe(data=>{
      console.log(data)
      this.entretienNombre=data.totalElements
    })
  }
}

  
    