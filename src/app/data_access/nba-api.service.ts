import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PlayersResponse, Team } from "../models/nba-api.model";

@Injectable({
  providedIn: "root",
})
export class NbaApiService {
  // Le service permettant les appels API.
  // Aucun changement dans ce fichier n'est necessaire
  private baseUrl = "https://www.balldontlie.io/api/v1";
  private http = inject(HttpClient);

  public getTeam = (teamId: string): Observable<Team> =>
    this.http.get<Team>(`${this.baseUrl}/teams/${teamId}`);

  public getPlayers = (
    page: number,
    per_page: number
  ): Observable<PlayersResponse> =>
    this.http.get<PlayersResponse>(`${this.baseUrl}/players`, {
      params: { per_page, page: page + 1 },
  });
}
