import type { enCatalog } from './locales/en';

export const supportedLanguages = ['pt-BR', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const SSR_LANGUAGE: SupportedLanguage = 'pt-BR';
export const FALLBACK_LANGUAGE: SupportedLanguage = 'en';
export const LANGUAGE_STORAGE_KEY = 'patrick-chaves.language';

type DeepWidenStrings<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly DeepWidenStrings<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: DeepWidenStrings<T[Key]> }
      : T;

export type TranslationCatalog = DeepWidenStrings<typeof enCatalog>;

export type HeaderMessages = TranslationCatalog['header'];
export type FooterMessages = TranslationCatalog['footer'];
export type CommonMessages = TranslationCatalog['common'];

export const isSupportedLanguage = (
  value: unknown,
): value is SupportedLanguage =>
  typeof value === 'string' &&
  (supportedLanguages as readonly string[]).includes(value);
