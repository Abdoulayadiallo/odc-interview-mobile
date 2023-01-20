import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private pvrCtlr: PopoverController) {}

  async openNotif() {
    const popup = await this.pvrCtlr.create({
      component: NotificationComponent,
    });
    popup.present();

    const { data, role } = await popup.onWillDismiss();

    if (role === 'confirm') {
     // this.message = `Hello, ${data}!`;
    }
  }

}
