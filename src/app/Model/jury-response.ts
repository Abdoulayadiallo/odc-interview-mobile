import { Utilisateur } from "./utilisateur";

export class JuryResponse {
    contenu:Utilisateur[];
    pourcentage:number;
    nombreParGenre:number;
    totalListe:number;
}