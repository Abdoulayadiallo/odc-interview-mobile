import { Entretien } from "./entretien";
import { Question } from "./question";

export class Critere {
    id: number;
    critereNom: string;
    barem: string;
    elimination: boolean;
    question: Question[]; 
    entretien: Entretien; 
}
