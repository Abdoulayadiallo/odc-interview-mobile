import { Critere } from "./critere";

export class Entretien {
    id!: number;
    entretienNom!: string;
    dateDebut!: string;
    dateFin!: string;
    dateCreation!: string;
    nombreParticipant!: number;
    description:String;
    critereList: Critere[];
    etat:{
        id:number
        status:string
    }
}
