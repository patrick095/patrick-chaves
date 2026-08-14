import { ApplicationConfig } from '@angular/core';
import {
  provideClientHydration,
  withNoHttpTransferCache,
  withNoIncrementalHydration,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePortfolioI18n } from './core/i18n/i18n.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(
      withNoHttpTransferCache(),
      withNoIncrementalHydration(),
    ),
    provideRouter(routes),
    providePortfolioI18n(),
  ],
};
