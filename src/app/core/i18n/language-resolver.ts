import {
  FALLBACK_LANGUAGE,
  isSupportedLanguage,
  SupportedLanguage,
} from './i18n.models';

export interface LanguageResolutionInput {
  readonly storedLanguage?: string | null;
  readonly browserLanguages?: readonly string[] | null;
  readonly browserLanguage?: string | null;
}

const firstBrowserLanguage = ({
  browserLanguages,
  browserLanguage,
}: LanguageResolutionInput): string | undefined => {
  const fromLanguages = browserLanguages?.find(
    (language) => typeof language === 'string' && language.trim().length > 0,
  );
  return fromLanguages ?? (browserLanguage?.trim() || undefined);
};

export const resolveInitialLanguage = (
  input: LanguageResolutionInput,
): SupportedLanguage => {
  if (isSupportedLanguage(input.storedLanguage)) return input.storedLanguage;

  const browserLanguage = firstBrowserLanguage(input);
  if (!browserLanguage) return FALLBACK_LANGUAGE;

  const normalized = browserLanguage.trim().toLowerCase().replaceAll('_', '-');
  return normalized.startsWith('pt') ? 'pt-BR' : FALLBACK_LANGUAGE;
};
