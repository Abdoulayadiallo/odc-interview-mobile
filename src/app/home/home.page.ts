import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';
import { NotificationComponent } from '../notification/notification.component';
import { AccountService } from '../Service/account.service';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  postulantresponse!: Postulantresponse ;
  totalElement=0
  test:any;

  constructor(
    private pvrCtlr: PopoverController,
    private accountService: AccountService,
    private router: Router,
    private postulantService:PostulantService
    ) {}

    ngOnInit() {
      this.getPost();
    }

  async openNotif() {
    const popup = await this.pvrCtlr.create({
      component: NotificationComponent,
    });
    popup.present();
  }
  getPost(){
      this.postulantService.getAllPostulant().subscribe(data => {
        console.log(data)
        this.postulantresponse = data
        this.totalElement=data.totalElements
        this.test=Postulantresponse;
        console.log(this.test)
      })
    }
}

  
    