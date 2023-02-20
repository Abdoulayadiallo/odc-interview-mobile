import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entretien } from '../Model/entretien';
import { EntretienService } from '../Service/entretien.service';

@Component({
  selector: 'app-entretien-details',
  templateUrl: './entretien-details.page.html',
  styleUrls: ['./entretien-details.page.scss'],
})
export class EntretienDetailsPage implements OnInit {
  id: number
  entretien: Entretien = new Entretien
  entretienNom: string;
  entretienDebut: string;
  entretienStatus: string;
  entretienDescription: String;
  entretienFin: string;
  interviewImage: string;
  constructor(private entretienService: EntretienService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getEntretien()
    this.interviewImage=this.entretienService.interviewPicture
  }

  getEntretien() {
    this.entretienService.getOneEntretienById(this.id).subscribe(
      data => {
        this.entretienNom = data.entretienNom;
        this.entretienDebut = data.dateDebut;
        this.entretienStatus = data.etat.status
        this.entretienDescription = data.description
        this.entretienFin=data.dateFin
        console.log(data)
      })
  }

}
