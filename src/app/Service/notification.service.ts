import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../Model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public host = environment.host;
  public clientHost = environment.client;
  
  constructor(private http:HttpClient) { }

  getAllNotif(): Observable<Notification> {
    return this.http.get<Notification>(`${this.host}/notification/list`);
  }
}
