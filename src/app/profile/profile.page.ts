import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../Service/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private accountService:AccountService,private router:Router) { }

  ngOnInit() {
  }
  logOut(): void {
    // this.loadingService.isLoading.next(true);
    this.accountService.logOut();
    this.router.navigateByUrl('/signin');
    // this.loadingService.isLoading.next(false);
    // this.alertService.showAlert(
    //   'You have been successfully logged out.',
    //   AlertType.SUCCESS
    // );
  }

}
