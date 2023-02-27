import { Entretien } from "./entretien";
import { Notification } from "./notification";
export class Utilisateur {
    id!: number;
    image!: string;
    nom!: string;
    prenom!: string;
    email!: string;
    username!: string;
    numero!: string;
    genre!: string;
    bio!: string;
    dateCreation!: Date;
    entretien!: Entretien;
    role!:role 
    notification:Notification[]
}

export class role{
    id: number;
    roleName: string
}