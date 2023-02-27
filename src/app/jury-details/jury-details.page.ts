import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { role, Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';

@Component({
  selector: 'app-jury-details',
  templateUrl: './jury-details.page.html',
  styleUrls: ['./jury-details.page.scss'],
})
export class JuryDetailsPage implements OnInit {
  // jurys: Utilisateur[];
  username: string
  jury:any=Utilisateur
  roleName:any=''
  constructor(private accountService: AccountService,private route: ActivatedRoute) { }

  ngOnInit(){
    this.username = this.route.snapshot.params['id'];

    this.accountService.getUserInformation(this.username).subscribe( data => {
      this.jury = data;
      this.roleName=this.jury.role.roleName
      console.log(this.jury.role.roleName)
    });
    
  }
  

}
