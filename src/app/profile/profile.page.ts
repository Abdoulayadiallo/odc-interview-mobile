import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
import { AlertService } from '../Service/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profilePicture: File;
  profilePictureChange: boolean;
  private subscriptions: Subscription[] = [];
  utilisateur: Utilisateur;
  userpicture: string;
  username: string;
  constructor(private accountService:AccountService,private router:Router,private alertService:AlertService) { }

  ngOnInit() {
    this.userpicture = this.accountService.userPicture;
    this.getUserInfo(this.accountService.loggInUsername);
    this.username=this.accountService.loggInUsername;
  }
  logOut(): void {
    // this.loadingService.isLoading.next(true);
    this.accountService.logOut();
    this.router.navigateByUrl('/signin');
    // this.loadingService.isLoading.next(false);
    this.alertService.presentToast(
      "Vous vous êtes deconnecter avec succès.",
      "success"
    );
  }
  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        console.log(response)
        console.log(this.utilisateur)
      },
      error => {
        console.log(error);
        this.utilisateur = null;
      }
    ));
  }

  onProfilePictureSelected(event: any): void {
    console.log(event);
    this.profilePicture = event.target.files[0] as File;
    console.log(this.profilePicture);
    this.profilePictureChange = true;
  }

  onUpdateUser(updatedUser: Utilisateur): void {
    // this.loadingService.isLoading.next(true);
    this.subscriptions.push(
      this.accountService.updateUser(updatedUser).subscribe(
        response => {
          console.log(response);
          if (this.profilePictureChange) {
            this.accountService.uploadeUserProfilePicture(this.profilePicture);
          }
          // this.loadingService.isLoading.next(false);
          this.alertService.presentToast(
            "Profile mise à jour avec succès.",
            "success"
          );
        },
        error => {
          console.log(error);
          // this.loadingService.isLoading.next(false);
          this.alertService.presentToast(
            "La mise à jour du profile a échoué, essayer encore ...",
            "danger"
          );
        }
      )
    );
  }
  
}
