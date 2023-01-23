import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postulant } from '../Model/postulant';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
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
  constructor(private accountService: AccountService,private router: Router) { }

  ngOnInit() {
    this.getJury();

  }
  getJury(){
    this.accountService.getAllJury().subscribe(data => {
      console.log(data)
      this.jurys = data
    })
  };
  postulantDetails(id: string){
    this.router.navigate(['jury-details', id]);
  }
}
