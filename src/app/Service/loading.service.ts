import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading: Subject<boolean> =  new Subject();
  constructor(private loadingController: LoadingController) { }

    async loadingPresent(message: string = null, duration: number = null) {
        const loading = await this.loadingController.create({ message, duration });
        return await loading.present();
    }

    async loadingDismiss() {
        setTimeout(() => {
            return this.loadingController.dismiss();
        }, 1000);
    }

    loaderPromise(message: string = null, duration: number = null) {
      this.loadingController.create({
        message: message,
        duration: duration,
      }).then((res) => {
        res.present();
  
        res.onDidDismiss().then((dis) => {
          console.log('Loading dismissed, after'+ duration + 'Seconds', dis);
        });
      });
  }

}
