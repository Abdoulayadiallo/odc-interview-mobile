import { Postulant } from "./postulant";

export class Postulantresponse {
    contenu!: Postulant[];
    pageNo!:number;
    pageSize!: number;
    totalElements!: number;
    totalPages!:number ;
    totalInterviewed!:number;
    totalNonInterviewed!:number;
    last!: false
}
