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

@NgModule({
  declarations: [AppComponent,NoteComponent,NotificationComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy,
       useClass: IonicRouteStrategy,
     },
      AccountService,
      PostulantresolverService,
      PostulantService,
      AuthenticationGuard,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
