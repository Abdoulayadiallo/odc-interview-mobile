import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Critere } from '../Model/critere';
import { NombreResponse } from '../Model/nombre-response';
import { NombreQuestionResponse } from '../Model/nombrequestionresponse';
import { Question } from '../Model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public host = environment.host;
  public clientHost = environment.client;
  constructor(private http:HttpClient) { }

  getAllQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.host}/question/list`);
  }
  getQuestionByCritere(critereId:number):Observable<Question[]>{
    return this.http.get<Question[]>(`${this.host}/question/critere/${critereId}`);
  }
  getNombreQuestionNoteByPostulant(postulantId:number):Observable<NombreQuestionResponse>{
    return this.http.get<NombreQuestionResponse>(`${this.host}/question/repond/${postulantId}`);
  }
  getAllQuestionByEntretien(id:number):Observable<HttpErrorResponse | HttpResponse<any>|Question[]|any>{
    return this.http.get<HttpErrorResponse | HttpResponse<any>|Question[]>(`${this.host}/question/entretien/${id}`);
  }
  
}
