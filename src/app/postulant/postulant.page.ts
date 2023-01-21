import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Page } from '@ionic/core';
import { map, startWith, catchError, of, BehaviorSubject } from 'rxjs';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-postulant',
  templateUrl: './postulant.page.html',
  styleUrls: ['./postulant.page.scss'],
})
export class PostulantPage implements OnInit {
  postulant: Postulant = new Postulant();
  postulants!: Postulant[];
  postulantResponse!: Postulantresponse;
  totalPages!: number;

  private currentPageSubject = new BehaviorSubject<number>(0);
  responseSubject = new BehaviorSubject<Postulantresponse>(this.postulantResponse);
  currentPage$ = this.currentPageSubject.asObservable();


  constructor(private postulantService:PostulantService) { }

  ngOnInit() {
    this.postulantService.getAllPostulant().pipe(
      map((response: Postulantresponse) => {
        // this.loadingService.loadingOff();
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.pageNo);
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: response });
      }),
      startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
      catchError((error: HttpErrorResponse) =>{ 
        // this.loadingService.loadingOff();
        return of({ appState: 'APP_ERROR', error })}
        )
    )
  }  

  // getPost(){
  //   this.postulantService.getAllPostulant().subscribe(data => {
  //     console.log(data)
  //     this.postulantResponse = data
  //     this.postulants=data.contenu
  //     this.totalPages=data.totalPages
  //   })
  // }
  gotToPage( pageNo:number = 0,pageSize:number = 10,sortBy:string ="",sortDir:string=""): void {
    // this.loadingService.loadingOn();
    this.postulantService.getAllPostulant(pageNo,pageSize,sortBy,sortDir).pipe(
      map((response: Postulantresponse) => {
        // this.loadingService.loadingOff();
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNo);
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: response });
      }),
      startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
      catchError((error: HttpErrorResponse) =>{ 
        // this.loadingService.loadingOff();
        return of({ appState: 'APP_ERROR', error })}
        )
    )
  }
}
