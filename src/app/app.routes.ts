import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'projetos/apexlap-coach',
    loadComponent: () =>
      import('./features/case-study/case-study-page.component').then(
        ({ CaseStudyPageComponent }) => CaseStudyPageComponent,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page.component').then(
        ({ HomePageComponent }) => HomePageComponent,
      ),
  },
];
