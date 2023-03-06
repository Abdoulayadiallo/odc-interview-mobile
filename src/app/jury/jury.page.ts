import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, lastValueFrom, map, Observable, of, startWith, Subscription } from 'rxjs';
import { JuryResponse } from '../Model/jury-response';
import { Participant } from '../Model/participant';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
// import { ParticipantService } from '../Service/participant.service';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.page.html',
  styleUrls: ['./jury.page.scss'],
})
export class JuryPage implements OnInit {
  public isSearchBarOpened = false;
  jurys: Utilisateur[];
  id: number;
  jury: Utilisateur;
  rootPage: any;
  private subscriptions: Subscription[] = [];
  // postulantresponse!: Postulantresponse ;
  // jurys: Utilisateur[];
  //totalElement=0
  //nbreJury:number
  loggInUsername: string;
  utilisateur: Utilisateur;
  nomEntretien: string;
  participant: Participant;
  rolename: string = '';
  entretienNombre: number;
  public idEntretien: number;
  nbreJury: number;
  juryState$!: Observable<{
    appState: string;
    appData?: JuryResponse;
    error?: HttpErrorResponse;
  }>;

  private currentPageSubject = new BehaviorSubject<number>(0);
  juryResponse!: JuryResponse;

  responseSubject = new BehaviorSubject<JuryResponse>(
    this.juryResponse
  );
  currentPage$ = this.currentPageSubject.asObservable();
  juryPicture: string;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    const username = this.accountService.loggInUsername;
    this.getUserInfo(username).then(()=>{


      this.juryPicture=this.accountService.userPicture
  
      this.juryState$ = this.accountService
        .getAllJuryByEntretien(this.idEntretien)
        .pipe(
          map((response: JuryResponse) => {
            // this.loadingService.loadingOff();
            this.responseSubject.next(response);
            this.currentPageSubject.next(response.pageNo);
            console.log(response);
            return { appState: 'APP_LOADED', appData: response };
          }),
          startWith({
            appState: 'APP_LOADED',
            appData: this.responseSubject.value,
          }),
          catchError((error: HttpErrorResponse) => {
            // this.loadingService.loadingOff();
            return of({ appState: 'APP_ERROR', error });
          })
        );
    })
  }
  getAllJurybyEntretien() {
    this.accountService.getAllJury().subscribe((data) => {
      console.log(data);
      this.jurys = data;
    });
  }
  // getJury() {
  //   this.accountService.getAllJury().subscribe((data) => {
  //     console.log(data);
  //     this.jurys = data;
  //   });
  // }


  postulantDetails(id: string) {
    this.router.navigate(['jury-details', id]);
  }
  async getUserInfo(username: string): Promise<void> {
    try {
      const response: Utilisateur = await lastValueFrom(this.accountService.getUserInformation(username));
      this.utilisateur = response;
      this.nomEntretien = response.entretien.entretienNom;
      this.entretienNombre = response.entretien.entretienNom.length;
      // this.userpre=response.prenom
      this.rolename = response.role.roleName;
      this.idEntretien = response.entretien.id;
      console.log(this.idEntretien);
      console.log(response);
      console.log(this.nomEntretien);
      console.log(this.utilisateur);
    } catch (error) {
      console.log(error);
      this.utilisateur = null;
    }
  }

  gotToPage(
    name: string = '',
    pageNo: number = 0,
    pageSize: number = 10,
    sortBy: string = '',
    sortDir: string = '',
    genre: string = ''
  ): void {
    // this.loadingService.loadingOn();
    this.juryState$ = this.accountService
      .getAllJuryByEntretien(
        this.idEntretien,
        pageNo,
        pageSize,
        sortBy,
        sortDir,
        name
      )
      .pipe(
        map((response: JuryResponse) => {
          // this.loadingService.loadingOff();
          this.responseSubject.next(response);
          this.currentPageSubject.next(pageNo);
          console.log(response);
          return { appState: 'APP_LOADED', appData: response };
        }),
        startWith({
          appState: 'APP_LOADED',
          appData: this.responseSubject.value,
        }),
        catchError((error: HttpErrorResponse) => {
          // this.loadingService.loadingOff();
          return of({ appState: 'APP_ERROR', error });
        })
      );
  }
  goToNextOrPreviousPage(direction: string, name?: string): void {
    this.gotToPage(
      name,
      direction === 'forward'
        ? this.currentPageSubject.value + 1
        : this.currentPageSubject.value - 1
    );
  }
  // getJuryNombreByEntretien() {
  //   this.accountService
  //     .GetJuryNombrebyEntretien(this.idEntretien)
  //     .subscribe((data) => {
  //       console.log(data);
  //       this.jurys = data.contenu;
  //       this.nbreJury = data.totalListe;
  //     });
  // }
}
