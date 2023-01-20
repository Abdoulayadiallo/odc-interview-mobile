import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entretien } from '../Model/entretien';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {
  public host = environment.host;
  public clientHost = environment.client;
  constructor(private http:HttpClient) { }
  
  getAllEntretien(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`${this.host}/entretien/list`);
  }

}
