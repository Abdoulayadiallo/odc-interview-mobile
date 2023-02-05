import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, startWith, catchError, of, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Participant } from '../Model/participant';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';
import { Utilisateur } from '../Model/utilisateur';
import { AccountService } from '../Service/account.service';
import { LoadingService } from '../Service/loading.service';
import { ParticipantService } from '../Service/participant.service';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-postulant',
  templateUrl: './postulant.page.html',
  styleUrls: ['./postulant.page.scss'],
})
export class PostulantPage implements OnInit {
  public isSearchBarOpened = false;
  postulant: Postulant = new Postulant();
  postulants!: Postulant[];
  postulantResponse!: Postulantresponse;
  totalPages!: number;
  isDataLoaded = false;
  participant:Participant

  postulantState$!: Observable<{ appState: string; appData?: Postulantresponse; error?: HttpErrorResponse; }>;

  private currentPageSubject = new BehaviorSubject<number>(0);
  responseSubject = new BehaviorSubject<Postulantresponse>(this.postulantResponse);
  currentPage$ = this.currentPageSubject.asObservable();

  loggInUsername: string;
  utilisateur: Utilisateur;
  entretienNombre: number;
  idEntretien: number;
  private subscriptions: Subscription[] = [];





  constructor(
    private accountService:AccountService,
    private postulantService: PostulantService,
    private router: Router,
    private loadingService: LoadingService,
    private participantService:ParticipantService) { }


  ngOnInit(): void {
    const username = this.accountService.loggInUsername
    this.getUserInfo(username)
    this.getOne()


    this.postulantState$ = this.postulantService.getAllPostulantByEntretien(this.idEntretien).pipe(
    map((response: Postulantresponse) => {
      // this.loadingService.loadingOff();
      this.responseSubject.next(response);
      this.currentPageSubject.next(response.pageNo);
      console.log(response);
      return ({ appState: 'APP_LOADED', appData: response });
    }),
    startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
    catchError((error: HttpErrorResponse) => {
      // this.loadingService.loadingOff();
      return of({ appState: 'APP_ERROR', error })
    }
    )

  )
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
      (response: Utilisateur) => {
        this.utilisateur = response;
        this.idEntretien=response.entretien.id
        console.log(this.idEntretien)
        console.log(response)
        console.log(this.utilisateur)
      },
      error => {
        console.log(error);
        this.utilisateur = null;
      }
    ));
  }

  getOne(){
    this.participantService.getOneParticipantByJury(this.utilisateur.id).subscribe(data =>{
      this.participant=data;
      console.log("---------utilisateur id----------"+data.utilisateur.id)
      this.idEntretien=data.entretien.id
      console.log(data.utilisateur)
      console.log(data)
    })
  }


gotToPage(name: string = '', pageNo: number = 0, pageSize: number = 10, sortBy: string = "", sortDir: string = "", genre: string = ""): void {
  // this.loadingService.loadingOn();
  this.postulantState$ = this.postulantService.getAllPostulantByEntretien(this.idEntretien,pageNo, pageSize, sortBy, sortDir, genre, name).pipe(
    map((response: Postulantresponse) => {
      // this.loadingService.loadingOff();
      this.responseSubject.next(response);
      this.currentPageSubject.next(pageNo);
      console.log(response);
      return ({ appState: 'APP_LOADED', appData: response });
    }),
    startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
    catchError((error: HttpErrorResponse) => {
      // this.loadingService.loadingOff();
      return of({ appState: 'APP_ERROR', error })
    }
    )
  )
}
goToNextOrPreviousPage(direction: string, name ?: string): void {
  this.gotToPage(name, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
}
postulantDetails(id: number) {
  this.router.navigate(['postulant-details', id]);
}
entretienDetails(idEntretien: number) {
  this.router.navigate(['entretien', idEntretien]);
}
}
