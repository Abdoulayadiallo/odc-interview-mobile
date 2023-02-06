import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Critere } from '../Model/critere';
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
  getQuestionByCritere(critereId:number):Observable<Critere>{
    return this.http.get<Critere>(`${this.host}/question/critere/${critereId}`);
  }
}
