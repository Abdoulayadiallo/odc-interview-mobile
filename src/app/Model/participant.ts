import { Entretien } from "./entretien";
import { Notification } from "./notification";
import { Postulant } from "./postulant";
import { Utilisateur } from "./utilisateur";

export class Participant {
        id!: number;
        status!: string;
        notifications!: Notification[];
        utilisateur!: Utilisateur;
        postulant!: Postulant;
        entretien: Entretien;
}
