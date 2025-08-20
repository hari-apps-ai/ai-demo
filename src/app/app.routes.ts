import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'file-upload', pathMatch: 'full' },
  {
    path: 'google-drive',
    loadComponent: () => import('./pages/google-drive-demo/google-drive-demo'),
  },
  {
    path: 'file-upload',
    loadComponent: () => import('./pages/file-upload-demo/file-upload-demo'),
  },
];
