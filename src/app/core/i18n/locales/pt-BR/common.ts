import type { TranslationCatalog } from '@core/i18n/i18n.models';

export const common = {
  skipToContent: 'Pular para o conteúdo principal',
  opensInNewTab: 'abre em nova aba',
  siteName: 'Patrick Chaves',
  professionalTitle: 'Desenvolvedor Full Stack Sênior e Tech Lead',
  contactModal: {
    title: 'Como você prefere entrar em contato?',
    closeLabel: 'Fechar',
  },
} as const satisfies TranslationCatalog['common'];

export const header = {
  homeLabel: 'Ir para o início',
  primaryNavigationLabel: 'Navegação principal',
  openMenu: 'Abrir menu',
  closeMenu: 'Fechar menu',
  mobileMenuTitle: 'Navegação',
  mobileNavigationLabel: 'Navegação mobile',
  language: {
    selectorLabel: 'Selecionar idioma',
    ptBR: '🇧🇷 Português',
    en: '🇺🇸 English',
  },
  resume: {
    download: 'Baixar currículo',
    downloadAria: 'Baixar currículo de Patrick Chaves em PDF',
  },
} as const satisfies TranslationCatalog['header'];

export const navigation = {
  about: 'Sobre',
  experience: 'Experiência',
  projects: 'Projetos',
  stack: 'Stack',
  principles: 'Princípios',
  contact: 'Contato',
} as const satisfies TranslationCatalog['navigation'];

export const links = {
  experience: 'Ver experiência',
  principles: 'Como desenvolvo software',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  email: 'Entrar em contato',
  website: 'patrickchaves.com.br',
  professionalChannelsLabel: 'Links profissionais',
  otherProfessionalChannelsLabel: 'Outros canais profissionais',
  linkedinHandle: 'Patrick095',
} as const satisfies TranslationCatalog['links'];

export const footer = {
  tagline: 'Engenharia Full Stack, arquitetura e liderança técnica.',
  navigationLabel: 'Navegação do rodapé',
  professionalLinksLabel: 'Links profissionais no rodapé',
  copyright: '© {year} {name}.',
} as const satisfies TranslationCatalog['footer'];
