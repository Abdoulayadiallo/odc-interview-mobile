import { Component, OnInit } from '@angular/core';
import { Postulant } from '../Model/postulant';
import { PostulantService } from '../Service/postulant.service';

@Component({
  selector: 'app-postulant',
  templateUrl: './postulant.page.html',
  styleUrls: ['./postulant.page.scss'],
})
export class PostulantPage implements OnInit {
  postulant: Postulant = new Postulant();
  postulants!: Postulant[];

  constructor(private postulantService:PostulantService) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(){
    this.postulantService.getAllPostulant().subscribe(data => {
      console.log(data)
      this.postulants = data
    })
  }
}
