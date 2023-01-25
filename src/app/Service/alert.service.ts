import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController,public toastController: ToastController) { }
  async presentAlert(alertMsg: string,
    title: string,) {
    const alert = await this.alertController.create({
      header: title,
      message: alertMsg,
      buttons: ['OK']
    });
    await alert.present();
  }


  async presentToast(msg:string,type:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:type
    });
    toast.present();
  }

 
}
