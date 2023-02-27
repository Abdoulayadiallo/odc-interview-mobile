import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Postulant } from '../Model/postulant';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-postulant-details',
  templateUrl: './postulant-details.page.html',
  styleUrls: ['./postulant-details.page.scss'],
})
export class PostulantDetailsPage implements OnInit {

  id: number
  postulant: Postulant
  constructor(private route: ActivatedRoute, private postulantService: PostulantService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.postulant = new Postulant();
    this.postulantService.getOnePostulantById(this.id).subscribe( data => {
      this.postulant = data;
    });
  }}
