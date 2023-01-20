import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentInjector } from '@ionic/angular/di/r3_injector';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Postulant } from '../Model/postulant';

@Injectable({
  providedIn: 'root'
})
export class PostulantService {
  public host = environment.host;
  public clientHost = environment.client;

  constructor(private http:HttpClient) { }
 
  getAllPostulant(): Observable<Postulant[]> {
    return this.http.get<Postulant[]>(`${this.host}/postulant/list`);
  }
  
}
