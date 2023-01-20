import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  ngOnInit() {
    if (this.accountService.isLoggedIn()) {
      if (this.accountService.redirectUrl) {
        this.router.navigateByUrl(this.accountService.redirectUrl);
      } else {
        this.router.navigateByUrl('/tabs/accueil');
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
          // this.loadingService.isLoading.next(false);
          // this.alertService.showAlert(
          //   'Username ou mots de passe incorrect. Essayer encore.',
          //   AlertType.DANGER
          // );
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

}
