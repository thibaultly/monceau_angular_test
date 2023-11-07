import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "players", pathMatch: "full" },
  {
    path: "players",
    loadComponent: () => import("./players-table.component"),
  },
  {
    path: "team/:teamId",
    loadComponent: () => import("./team-info.component"),
  },
];
