import type { TranslationCatalog } from '@core/i18n/i18n.models';

export const seo = {
  home: {
    title: 'Patrick Chaves | Desenvolvedor Full Stack Sênior e Tech Lead',
    description:
      'Portfólio de Patrick Chaves, Desenvolvedor Full Stack Sênior e Tech Lead com mais de 6 anos de experiência em Angular, Java, Quarkus, Node.js e NestJS.',
    language: 'pt-BR',
    ogLocale: 'pt_BR',
  },
  apexLap: {
    title: 'ApexLap Coach | Estudo de caso | Patrick Chaves',
    description:
      'Estudo técnico do ApexLap Coach, aplicativo desktop que compara telemetria do iRacing e organiza feedback de voz após curvas.',
    language: 'pt-BR',
    ogLocale: 'pt_BR',
  },
} as const satisfies TranslationCatalog['seo'];
