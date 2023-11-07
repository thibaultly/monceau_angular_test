import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { NbaApiService } from "./data_access/nba-api.service";
import { Observable } from "rxjs";
import { Team } from "./models/nba-api.model";

@Component({
  selector: "app-team-info",
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="flex justify-center mt-8">
      <mat-card *ngIf="teamData$ | async as team" class="w-80">
        <mat-card-header class="text-2xl font-bold">{{
          team.full_name
        }}</mat-card-header>
        <mat-card-content class="mt-4">
          <ul>
            <li>
              City: <span class="font-semibold">{{ team.city }}</span>
            </li>
            <li>
              Conference:
              <span class="font-semibold">{{ team.conference }}</span>
            </li>
            <li>
              Division: <span class="font-semibold">{{ team.division }}</span>
            </li>
            <li>
              Name: <span class="font-semibold">{{ team.name }}</span>
            </li>
          </ul>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [],
})
export default class TeamInfoComponent {
  // Comme pour l'exercice précédent la variable teamData$
  // contient les information nécessaires au fonctionnement
  // de la page.

  // Le type de la variable est à titre indicatif et peut être modifié
  // Il vous faut modifier ce composant afin que la variable teamData
  // contienne les informations de l'equipe dont l'id est le meme que celui
  // du paramètre d'url `teamId`. (de base, le composant affiche tout le temps les données de l'équipe 15)
  // (vous pouvez jeter un oeil au fichier app.routes.ts si ce n'est pas clair)
  public teamData$: Observable<Team> = inject(NbaApiService).getTeam("15");
}
