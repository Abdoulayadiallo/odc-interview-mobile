import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentInjector } from '@ionic/angular/di/r3_injector';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Postulant } from '../Model/postulant';
import { Postulantresponse } from '../Model/postulantresponse';

@Injectable({
  providedIn: 'root'
})
export class PostulantService {
  public host = environment.host;
  public clientHost = environment.client;

  constructor(private http:HttpClient) { }
  
  getOnePostulantById(regionId: number): Observable<Postulant> {
    return this.http.get<Postulant>(`${this.host}/postulant/${regionId}`);
  }

  getAllPostulant(pageNo:number = 0,pageSize:number = 10,sortBy:string ="",sortDir:string=""): Observable<Postulantresponse> {
    return this.http.get<Postulantresponse>(`${this.host}/postulant/list?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  }
  
}
