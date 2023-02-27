import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
import { AlertService } from '../Service/alert.service';
import { LoadingService } from '../Service/loading.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit{
  private subscriptions: Subscription[] = [];
  public isForgetpass=false;
  form :any
  constructor(
    private router: Router,
    private accountService: AccountService,
    private alerteService: AlertService,
    private loadingService:LoadingService
  ) {}

  ngOnInit() {
    if (this.accountService.isLoggedIn()) {
      if (this.accountService.redirectUrl) {
        this.router.navigateByUrl(this.accountService.redirectUrl);
      } else {
        this.router.navigateByUrl('/tabs/home');
      }
    } else {
      this.router.navigateByUrl('/signin');
    }
  }

  onLogin(utilisateur: Utilisateur): void {
    // this.loadingService.isLoading.next(true);
    console.log(utilisateur);
    this.subscriptions.push(
      this.accountService.login(utilisateur).subscribe(
        response => {
          const token: string|any = response.headers.get('Authorization');
          this.accountService.saveToken(token);
          if (this.accountService.redirectUrl) {
            this.router.navigateByUrl(this.accountService.redirectUrl);
          } else {
            this.router.navigateByUrl('/tabs/home');
          }
          // this.loadingService.isLoading.next(false);
        },
        error => {
          console.log(error);
          this.loadingService.isLoading.next(false);
          this.alerteService.presentToast(' <ion-icon name="warning" size="large"></ion-icon> Email ou mots de passe incorrecte',"danger")
        }
      )
    );
  }

  onResetpassword(form:any): void {
    this.loadingService.isLoading.next(true);
    console.log(form.email);
    const email: string = form.email;
    this.subscriptions.push(
      this.accountService.resetPassword(email).subscribe(
        response => {
          console.log(response);
          this.loadingService.isLoading.next(false);
          this.alerteService.presentToast(
            "Un nouveau mots vous a été envoyé.",
            "success"
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          const errorMsg = error.error;
          if (errorMsg === 'email non trouvé') {
            this.alerteService.presentToast(
              "Cet email n'existe pas verifié encore.",
              "danger"
            );
          }
          if (errorMsg !== 'email non trouvé') {
            this.alerteService.presentToast(
              "Une erreur est survenue verifié essayer encore.",
              "danger"
            );
          }
          this.loadingService.isLoading.next(false);
        }
      )
    );
  }
  // ngOnDestroy() {
  //   this.subscriptions.forEach(sub => sub.unsubscribe);
  // }

}
