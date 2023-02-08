import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, map, startWith, catchError, of } from 'rxjs';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';
import { Utilisateur } from '../Model/utilisateur';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-postulant-utilisateur',
  templateUrl: './postulant-utilisateur.page.html',
  styleUrls: ['./postulant-utilisateur.page.scss'],
})
export class PostulantUtilisateurPage implements OnInit {
  public isSearchBarOpened = false;
  postulant: Postulant = new Postulant();
  postulants!: Postulant[];
  postulantResponse!: Postulantresponse;
  totalPages!: number;
  isDataLoaded = false;

  postulantState$!: Observable<{
    appState: string;
    appData?: Postulantresponse;
    error?: HttpErrorResponse;
  }>;

  private currentPageSubject = new BehaviorSubject<number>(0);
  responseSubject = new BehaviorSubject<Postulantresponse>(
    this.postulantResponse
  );
  currentPage$ = this.currentPageSubject.asObservable();

  loggInUsername: string;
  utilisateur: Utilisateur;
  entretienNombre: number;
  idEntretien: number;
  private subscriptions: Subscription[] = [];
  idUtilisateur: any;

  constructor(
    private postulantService: PostulantService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.idUtilisateur=this.route.snapshot.params['id'];
    this.postulantState$ = this.postulantService
      .getAllPostulantByEntretien(this.idEntretien)
      .pipe(
        map((response: Postulantresponse) => {
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
  }

  gotToPage(
    name: string = '',
    pageNo: number = 0,
    pageSize: number = 10,
    sortBy: string = '',
    sortDir: string = '',
  ): void {
    // this.loadingService.loadingOn();
    this.postulantState$ = this.postulantService
      .getAllPostulantByEntretienAndByUtilisateur(
        this.idEntretien,
        this.idUtilisateur,
        pageNo,
        pageSize,
        sortBy,
        sortDir,
        name
      )
      .pipe(
        map((response: Postulantresponse) => {
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

  postulantDetails(id: number) {
    this.router.navigate(['postulant-details', id]);
  }
  entretienDetails(idEntretien: number) {
    this.router.navigate(['entretien', idEntretien]);
  }
}
