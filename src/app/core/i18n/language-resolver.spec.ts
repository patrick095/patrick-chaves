import { describe, expect, it } from 'vitest';

import { resolveInitialLanguage } from './language-resolver';

describe('resolveInitialLanguage', () => {
  it.each(['pt-BR', 'pt-PT', 'PT_br', 'pt'])('maps browser locale %s to pt-BR', (locale) => {
    expect(resolveInitialLanguage({ browserLanguages: [locale] })).toBe('pt-BR');
  });

  it.each(['en', 'en-US', 'fr-FR', '', 'invalid'])('falls back to English for %s', (locale) => {
    expect(resolveInitialLanguage({ browserLanguages: [locale] })).toBe('en');
  });

  it('uses the first non-empty navigator language and then navigator.language', () => {
    expect(
      resolveInitialLanguage({
        browserLanguages: ['', 'pt-PT', 'en'],
        browserLanguage: 'en-US',
      }),
    ).toBe('pt-BR');
    expect(resolveInitialLanguage({ browserLanguages: [], browserLanguage: 'pt' })).toBe('pt-BR');
  });

  it('gives a valid stored preference priority and ignores invalid storage', () => {
    expect(
      resolveInitialLanguage({ storedLanguage: 'en', browserLanguages: ['pt-BR'] }),
    ).toBe('en');
    expect(
      resolveInitialLanguage({ storedLanguage: 'es', browserLanguages: ['pt-BR'] }),
    ).toBe('pt-BR');
  });
});
