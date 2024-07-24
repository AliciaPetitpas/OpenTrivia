import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'game',
    redirectTo: 'home',
  },
  {
    path: 'game/:pseudo/:amount/:difficulty',
    loadComponent: () => import('./game/game.page').then( m => m.GamePage)
  },
  {
    path: 'points',
    redirectTo: 'home',
  },
  {
    path: 'points/:pseudo/:amount/:difficulty/:points',
    loadComponent: () => import('./points/points.page').then( m => m.PointsPage)
  },
];
