import { inject, provideAppInitializer } from '@angular/core';
import {
  provideMissingTranslationHandler,
  provideTranslateLoader,
  provideTranslateService,
  TranslateService,
} from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { FALLBACK_LANGUAGE, SSR_LANGUAGE } from './i18n.models';
import { LocalTranslationLoader } from './local-translation.loader';
import { ReportMissingTranslationHandler } from './missing-translation.handler';

export const providePortfolioI18n = () => [
  provideTranslateService({
    lang: SSR_LANGUAGE,
    fallbackLang: FALLBACK_LANGUAGE,
    loader: provideTranslateLoader(LocalTranslationLoader),
    missingTranslationHandler: provideMissingTranslationHandler(
      ReportMissingTranslationHandler,
    ),
  }),
  provideAppInitializer(() =>
    firstValueFrom(inject(TranslateService).use(SSR_LANGUAGE)),
  ),
];
