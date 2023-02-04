import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NombreResponse } from '../Model/nombre-response';
import { Participant } from '../Model/participant';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  public host = environment.host;
  public clientHost = environment.client;

  constructor(private http:HttpClient) { }
  
  getOneParticipantByJury(partId: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.host}/participant/jury/${partId}`);
  }
}
