import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entretien } from '../Model/entretien';
import { Entretienresponse } from '../Model/entretienresponse';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {
  public host = environment.host;
  public clientHost = environment.client;
  constructor(private http:HttpClient) { }
  
  getAllEntretien(username:string="",pageNo:number = 0,pageSize:number = 10,sortBy:string ="",sortDir:string=""): Observable<Entretienresponse> {
    return this.http.get<Entretienresponse>(`${this.host}/entretien/list?${username}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  }

}
