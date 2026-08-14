import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'projetos/apexlap-coach', renderMode: RenderMode.Prerender },
  { path: '', renderMode: RenderMode.Prerender },
];
