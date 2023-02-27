import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Postulant } from '../Model/postulant';
import { PostulantService } from './postulant.service';

@Injectable({
  providedIn: 'root'
})
export class PostulantresolverService implements Resolve<Postulant> {

  constructor(private postulantService: PostulantService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Postulant> {
    const postulantId: number = route.params["postulantId"]
    return this.postulantService.getOnePostulantById(postulantId)
  }}
