import { Component, inject } from "@angular/core";
import { NgFor } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NbaApiService } from "./data_access/nba-api.service";
import { Player, Team } from "./models/nba-api.model";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

const PLAYERS_TABLE_COLUMN = [
  {
    label: "First Name",
    value: "first_name",
    cell: (row: Player) => row.first_name,
  },
  {
    label: "Last Name",
    value: "last_name",
    cell: (row: Player) => row.last_name,
  },
  {
    label: "Position",
    value: "position",
    cell: (row: Player) => row.position,
  },
  {
    label: "Team",
    value: "team",
    cell: (row: Player) => row.team.name,
  },
  {
    label: "City",
    value: "city",
    cell: (row: Player) => row.team.city,
  },
];

@Component({
  selector: "app-players-table",
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgFor,
    MatButtonModule,
    RouterLink,
  ],
  template: `
    <h2>Equipes présentes:</h2>
    <div class="flex flex-row flex-wrap gap-2 pb-4">
      <button
        *ngFor="let team of playersTeams"
        mat-raised-button
        color="primary"
        [routerLink]="['/team', team.id]"
      >
        {{ team.name }}
      </button>
    </div>
    <h2>Joueurs :</h2>
    <div>
      <table mat-table [dataSource]="playersData" class="mat-elevation-z8">
        <ng-container
          [matColumnDef]="column.value"
          *ngFor="let column of columns"
        >
          <th mat-header-cell *matHeaderCellDef>{{ column.label }}</th>
          <td mat-cell *matCellDef="let player">{{ column.cell(player) }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columnsValues"></tr>
        <tr mat-row *matRowDef="let row; columns: columnsValues"></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        [pageSize]="10"
        [length]="totalPlayersCount"
        [showFirstLastButtons]="true"
        showFirstLastButtons
        aria-label="Select page of periodic elements"
      >
      </mat-paginator>
    </div>
  `,
  styles: [],
})
export default class PlayersTableComponent {
  // les colonnes de la table a afficher
  public columns = PLAYERS_TABLE_COLUMN;
  public columnsValues = this.columns.map((col) => col.value);

  // le service contenant les appels API possibles
  public nbaService = inject(NbaApiService);

  // chaque action sur le paginator (selection d'une page ou du nombre d'elements par page)
  // emet un evenement `page` depuis le component <mat-paginator>
  // C'est un evenement du type PageEvent
  // Pour plus de detail veuillez vous rendre sur la documentation material
  // https://material.angular.io/components/paginator/overview

  // Les variables et types suivants sont présentées a titre indicatif
  // Ce sont les données qui sont utilisées dans le composant
  // et qui devront être fournies.
  // Il est tout à fait possible de changer ces types:

  // playersData décrit les données des joueurs, qui seront affichées dans la table.
  // Ce tableau doit contenir les données des joueurs de la page courante.
  public playersData: Array<Player> = [];

  // totalPlayersCount décrit le nombre total de lignes de la table.
  // Cette variable est utilisée par le paginator.
  public totalPlayersCount: number = 0;

  // playersTeam décrit les équipes dont le nom doit être affiché au dessus de la table.
  // Ce tableau doit contenir 1 seule occurence de chaque équipe présente dans la page actuelle.
  public playersTeams: Array<Team> = [];
}
