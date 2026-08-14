import { Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { from, map, Observable } from 'rxjs';

import { isSupportedLanguage } from './i18n.models';

@Injectable()
export class LocalTranslationLoader extends TranslateLoader {
  override getTranslation(language: string): Observable<TranslationObject> {
    const supportedLanguage = isSupportedLanguage(language) ? language : 'en';
    const catalog = supportedLanguage === 'pt-BR'
      ? import('./locales/pt-BR').then(({ ptBrCatalog }) => ptBrCatalog)
      : import('./locales/en').then(({ enCatalog }) => enCatalog);

    return from(catalog).pipe(
      map((content) => ({ content }) as unknown as TranslationObject),
    );
  }
}
