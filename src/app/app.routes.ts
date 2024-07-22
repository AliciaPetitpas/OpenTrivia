import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: 'home',
//     loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//   },
// ];

export const routes: Routes = [
  {
    path: 'index',
    loadComponent: () => import('./index/index.page').then((m) => m.IndexPage),
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
];
