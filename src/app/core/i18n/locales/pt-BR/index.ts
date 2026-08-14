import type { TranslationCatalog } from '@core/i18n/i18n.models';
import { common, footer, header, links, navigation } from './common';
import { home, projects } from './home';
import { seo } from './seo';

export const ptBrCatalog = {
  common,
  header,
  footer,
  navigation,
  links,
  home,
  projects,
  seo,
} as const satisfies TranslationCatalog;
