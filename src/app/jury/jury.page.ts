import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Participant } from '../Model/participant';
import { Postulant } from '../Model/postulant';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
import { ParticipantService } from '../Service/participant.service';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.page.html',
  styleUrls: ['./jury.page.scss'],
})
export class JuryPage implements OnInit {
  jurys: Utilisateur[];
  id: number
  jury: Utilisateur
  rootPage:any;
   private subscriptions: Subscription[] = [];
  // postulantresponse!: Postulantresponse ;
  // jurys: Utilisateur[];
  //totalElement=0
  //nbreJury:number
  loggInUsername: string;
  utilisateur: Utilisateur;
  nomEntretien: string;
  participant:Participant
  //userpicture: string;
  //userpre: string ='';
  rolename: string ='';
  entretienNombre: number;
   public idEntretien: number;
  nbreJury: number;
  // MasculinNOmbre: any;
  // FemininNOmbre: any;
  constructor(
    private accountService: AccountService,
    private router: Router,
    private participantService:ParticipantService) { }

  ngOnInit() {
    const username=this.accountService.loggInUsername
      setTimeout(()=>{
        this.getUserInfo(username)}
        ,100
      )
      setTimeout(()=>{
        this.getOne()
        this.getJuryNombreByEntretien();
      },500
      )

  }
  getJury(){
    this.accountService.getAllJury().subscribe(data => {
      console.log(data)
      this.jurys = data
    })
  };

  getOne(){
    this.participantService.getOneParticipantByJury(this.utilisateur.id).subscribe(data =>{
      this.participant=data;
      console.log("---------utilisateur id----------"+data.utilisateur.id)
      this.idEntretien=data.entretien.id
      console.log(data.utilisateur)
      console.log(data)
    })
  }

  postulantDetails(id: string){
    this.router.navigate(['jury-details', id]);
  }
  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        this.nomEntretien= response.participant.entretien.entretienNom
        this.entretienNombre=response.participant.entretien.entretienNom.length
        // this.userpre=response.prenom
        this.rolename=response.role.roleName
        this.idEntretien=response.participant.entretien.id
        console.log(this.idEntretien)
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

  getJuryNombreByEntretien(){
    this.accountService.GetJuryNombrebyEntretien(this.idEntretien).subscribe(data => {
      console.log(data)
      this.jurys = data.contenu
      this.nbreJury=data.totalListe
    })
  }
  
}
