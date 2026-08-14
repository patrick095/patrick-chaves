import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import {
  isSupportedLanguage,
  LANGUAGE_STORAGE_KEY,
  SSR_LANGUAGE,
  SupportedLanguage,
} from './i18n.models';
import { resolveInitialLanguage } from './language-resolver';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly switchingState = signal(false);
  private requestVersion = 0;

  readonly activeLanguage = computed<SupportedLanguage>(() => {
    const current = this.translate.currentLang();
    return isSupportedLanguage(current) ? current : SSR_LANGUAGE;
  });
  readonly switching = this.switchingState.asReadonly();

  async initializeBrowserPreference(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    let storedLanguage: string | null = null;
    try {
      storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      storedLanguage = null;
    }

    const language = resolveInitialLanguage({
      storedLanguage,
      browserLanguages: navigator.languages,
      browserLanguage: navigator.language,
    });

    if (language !== this.activeLanguage()) {
      await this.activate(language, false);
    }
  }

  async setLanguage(language: SupportedLanguage): Promise<void> {
    if (!isSupportedLanguage(language)) return;
    await this.activate(language, true);
  }

  private async activate(
    language: SupportedLanguage,
    persist: boolean,
  ): Promise<void> {
    const requestVersion = ++this.requestVersion;
    this.switchingState.set(true);

    try {
      await firstValueFrom(this.translate.use(language));
      if (requestVersion !== this.requestVersion) return;

      this.document.documentElement.lang = language;
      if (persist && isPlatformBrowser(this.platformId)) {
        try {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        } catch {
          // Storage may be unavailable in privacy-restricted contexts.
        }
      }
    } finally {
      if (requestVersion === this.requestVersion) this.switchingState.set(false);
    }
  }
}
