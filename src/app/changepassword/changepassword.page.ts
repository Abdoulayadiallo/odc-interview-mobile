import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PasswordChange } from '../Model/password-change';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
import { AlertService } from '../Service/alert.service';
import { LoadingService } from '../Service/loading.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  private subscriptions: Subscription[] = [];
  jury: Utilisateur;
  host: string;
  userHost: string;
  postHost: string;
  username: string;
  profilePictureChange: boolean;
  profilePicture: File;

  constructor(
    private route:ActivatedRoute,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');

  }


  onChangePassword(passwordChange: PasswordChange) {
    console.log(passwordChange);
    // const element: HTMLElement = document.getElementById(
    //   'changePasswordDismiss'
    // ) as HTMLElement;
    // element.click();
    this.loadingService.isLoading.next(true);
    this.subscriptions.push(
      this.accountService.changePassword(passwordChange).subscribe(
        response => {
          console.log(response);
          this.loadingService.isLoading.next(false);
          this.alertService.presentToast(
            'Mots de passe modifier avec succès',
            "success"
          );
        },
        error => {
          console.log(error);
          this.loadingService.isLoading.next(false);
          const errorMsg: string = error.error;
          this.showErrorMessage(errorMsg);
        }
      )
    );

  }
  private showErrorMessage(errorMessage: string): void {
    if (errorMessage === 'Mots de passe ne correpondent pas') {
      this.alertService.presentToast(
        'Mots ne corresponde pas, essayer encore.',
        "danger"
      );
    } else if (errorMessage === 'Mot de passe actuel incorrect') {
      this.alertService.presentToast(
        'Le mots de passe actuel incorrecte, essayer encore.',
        "danger"
      );
    } else {
      this.alertService.presentToast(
        'Le changement de mots de passe a echoué, essayer encore.',
        "danger"
      );
    }
  }
}
