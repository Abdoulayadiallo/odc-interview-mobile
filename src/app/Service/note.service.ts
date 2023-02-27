import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Note } from "../Model/note";
import { NoteResponse } from '../Model/noteresponse';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public host = environment.host;
  public clientHost = environment.client;
  constructor(private http:HttpClient) { }

  addNote(note: Note,critereId:number,postulantId:number,Jury:string): Observable<Note> {
    return this.http.post<Note>(`${this.host}/note/add/${critereId}/${postulantId}/${Jury}`, note);
  }
 DelNote(id: number): Observable<Object> {
    return this.http.delete(`${this.host}/note/delete/${id}`);
  }
 
  getAllNote(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.host}/note/list`);
  }
  getNoteByCritere(idCritere:number,idJury:number,idPostulant:number): Observable<NoteResponse> {
    return this.http.get<NoteResponse>(`${this.host}/note/critere/${idCritere}/${idJury}/${idPostulant}`);
  }
  updateNote(id: number, note: Note): Observable<Object>{
    return this.http.put(`${this.host}/note/update/${id}`, note);
  }
}

