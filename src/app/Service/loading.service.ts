import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading: Subject<boolean> =  new Subject();

  constructor(public loadingController: LoadingController) { }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Bienvenue',
      duration: 2000
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
