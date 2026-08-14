import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { providePortfolioI18n } from './i18n.config';
import { LANGUAGE_STORAGE_KEY } from './i18n.models';
import { LanguageService } from './language.service';
import { LocalizedContentService } from './localized-content.selectors';

describe('LanguageService', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      providers: [providePortfolioI18n()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslateService).use('pt-BR'));
  });

  it('switches manually without navigation, updates html lang and persists after loading', async () => {
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');
    const service = TestBed.inject(LanguageService);
    const content = TestBed.inject(LocalizedContentService);

    await service.setLanguage('en');

    expect(service.activeLanguage()).toBe('en');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('en');
    expect(storageSpy).toHaveBeenCalledWith(LANGUAGE_STORAGE_KEY, 'en');
    expect(service.switching()).toBe(false);
    expect(content.portfolio().hero.value.professionalTitle).toBe(
      'Senior Full Stack Developer & Tech Lead',
    );
    expect(content.resume().filename).toBe('Resume - Patrick Chaves.pdf');
  });

  it('uses a stored preference ahead of the browser during post-hydration initialization', async () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
    const service = TestBed.inject(LanguageService);

    await service.initializeBrowserPreference();

    expect(service.activeLanguage()).toBe('en');
  });

  it('uses the configured English fallback for a missing Portuguese key', async () => {
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { fallbackProbe: { label: 'English fallback' } }, true);
    translate.setTranslation('pt-BR', { fallbackProbe: {} }, true);
    await firstValueFrom(translate.use('pt-BR'));

    await expect(firstValueFrom(translate.get('fallbackProbe.label'))).resolves.toBe(
      'English fallback',
    );
  });

  it('localizes the professional title exposed by the Person JSON-LD model', async () => {
    const service = TestBed.inject(LanguageService);
    const content = TestBed.inject(LocalizedContentService);

    expect(content.homeSeo().person?.jobTitle).toEqual([
      'Desenvolvedor Full Stack Sênior e Tech Lead',
    ]);

    await service.setLanguage('en');

    expect(content.homeSeo().person?.jobTitle).toEqual([
      'Senior Full Stack Developer & Tech Lead',
    ]);
  });
});
