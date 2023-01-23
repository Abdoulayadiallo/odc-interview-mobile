import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';

@Component({
  selector: 'app-jury-details',
  templateUrl: './jury-details.page.html',
  styleUrls: ['./jury-details.page.scss'],
})
export class JuryDetailsPage implements OnInit {
  jurys: Utilisateur[];
  username: string
  jury: Utilisateur
  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['id'];

    this.jury = new Utilisateur();
    this.accountService.getUserInformation(this.username).subscribe( data => {
      this.jury = data;
    });
  }
  

}
