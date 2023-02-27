import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NoteComponent } from './note/note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { AccountService } from './Service/account.service';
import { AuthenticationGuard } from './guard/authentification.guard';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { PostulantService } from './Service/postulant.service';
import { PostulantresolverService } from './Service/postulantresolver.service';
import { NoteService } from './Service/note.service';
import { CritereService } from './Service/critere.service';
import { Entretien } from './Model/entretien';
import { EntretienService } from './Service/entretien.service';
import { QuestionService } from './Service/question.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [AppComponent,NoteComponent,NotificationComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  providers: [{ provide: RouteReuseStrategy,
       useClass: IonicRouteStrategy,
     },
      AccountService,
      NoteService,
      CritereService,
      EntretienService,
      QuestionService,
      PostulantresolverService,
      PostulantService,
      AuthenticationGuard,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
