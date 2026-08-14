import { computed, inject, Injectable, Signal } from '@angular/core';
import { TranslateService, TranslationObject } from '@ngx-translate/core';

import {
  Evidenced,
  LinkId,
  NavigationItem,
  PortfolioContent,
  PortfolioLink,
  ProjectEvidenceId,
} from '@core/content/content.models';
import { caseStudySeo, homeSeo } from '@core/seo/seo.selectors';
import { SeoPage } from '@core/seo/seo.models';
import { TranslationCatalog } from './i18n.models';
import { LanguageService } from './language.service';
import { resolveResumeDownload, ResumeDownload } from './resume.config';

const apexLapRepositoryUrl = 'https://github.com/patrick095/ApexLap-Coach' as const;
const apexLapReleaseUrl = `${apexLapRepositoryUrl}/releases/tag/v0.6.2` as const;

const evidenced = <T>(
  value: T,
  evidence: readonly [ProjectEvidenceId, ...ProjectEvidenceId[]],
): Evidenced<T> => ({ value, evidence });

export const createPortfolioContent = (
  messages: TranslationCatalog,
): PortfolioContent => {
  const links: Readonly<Record<LinkId, PortfolioLink>> = {
    experience: {
      id: 'experience',
      label: messages.links.experience,
      href: '#experiencia',
      external: false,
    },
    principles: {
      id: 'principles',
      label: messages.links.principles,
      href: '#principios',
      external: false,
    },
    linkedin: {
      id: 'linkedin',
      label: messages.links.linkedin,
      href: 'https://www.linkedin.com/in/patrick095/',
      external: true,
    },
    github: {
      id: 'github',
      label: messages.links.github,
      href: 'https://github.com/patrick095',
      external: true,
    },
    email: {
      id: 'email',
      label: messages.links.email,
      href: 'mailto:contato@patrickchaves.com.br',
      external: false,
    },
    website: {
      id: 'website',
      label: messages.links.website,
      href: 'https://patrickchaves.com.br',
      external: true,
    },
  };

  const apex = messages.projects.apexLap;
  const project = {
    slug: 'apexlap-coach',
    privacy: 'public',
    eyebrow: evidenced(apex.eyebrow, ['APEX-01', 'APEX-02', 'APEX-03']),
    name: evidenced('ApexLap Coach' as const, ['APEX-01', 'APEX-02']),
    summary: evidenced(apex.summary, ['APEX-02', 'APEX-04', 'APEX-05']),
    category: evidenced(apex.category, ['APEX-02', 'APEX-03']),
    status: evidenced(apex.status, ['APEX-03', 'APEX-07']),
    technologies: [
      evidenced('Electron' as const, ['APEX-03', 'APEX-04']),
      evidenced('TypeScript' as const, ['APEX-03', 'APEX-04']),
      evidenced('React' as const, ['APEX-03', 'APEX-04']),
      evidenced('SQLite' as const, ['APEX-03', 'APEX-04']),
    ],
    links: {
      caseStudy: {
        label: apex.links.caseStudy,
        href: '/projetos/apexlap-coach',
        kind: 'case-study',
        external: false,
      },
      repository: {
        label: apex.links.repository,
        href: apexLapRepositoryUrl,
        kind: 'repository',
        external: true,
      },
      release: {
        label: apex.links.release,
        href: apexLapReleaseUrl,
        kind: 'release',
        external: true,
      },
    },
  } as const;

  const home = messages.home;
  return {
    site: {
      name: messages.common.siteName,
      professionalTitle: messages.common.professionalTitle,
      links,
      availableForWork: { verification: 'pending', publication: 'hide' },
    },
    hero: {
      publication: 'publish',
      value: {
        ...home.hero,
        professionalChannelsLabel: messages.links.otherProfessionalChannelsLabel,
        primaryAction: 'experience',
        secondaryAction: 'linkedin',
        supportingActions: ['github', 'email'],
        portrait: { alt: home.hero.portraitAlt, width: 1086, height: 1448 },
      },
    },
    summary: {
      publication: 'publish',
      value: {
        id: 'sobre',
        navigationLabel: messages.navigation.about,
        eyebrow: home.summary.eyebrow,
        title: home.summary.title,
        body: home.summary.body,
        points: [
          home.summary.points.context,
          home.summary.points.decisions,
          home.summary.points.evolution,
        ],
      },
    },
    experience: {
      publication: 'publish',
      value: {
        id: 'experiencia',
        navigationLabel: messages.navigation.experience,
        eyebrow: home.experience.eyebrow,
        title: home.experience.title,
        introduction: home.experience.introduction,
        resumePrompt: home.experience.resumePrompt,
        resumeAction: home.experience.resumeAction,
        items: [
          {
            id: 'stefanini',
            company: home.experience.stefanini.company,
            companyPeriod: home.experience.stefanini.companyPeriod,
            context: home.experience.stefanini.context,
            roles: [home.experience.stefanini.roles.developer],
            highlights: [
              home.experience.stefanini.highlights.fullStack,
              home.experience.stefanini.highlights.delivery,
            ],
            technologies: home.experience.stefanini.technologies.split(', '),
          },
          {
            id: 'chaves-solutions',
            company: home.experience.chavesSolutions.company,
            companyPeriod: home.experience.chavesSolutions.companyPeriod,
            context: home.experience.chavesSolutions.context,
            roles: [home.experience.chavesSolutions.roles.founder],
            highlights: [
              home.experience.chavesSolutions.highlights.leadership,
              home.experience.chavesSolutions.highlights.fullStack,
            ],
            technologies: home.experience.chavesSolutions.technologies.split(', '),
          },
          {
            id: 'vox',
            company: home.experience.vox.company,
            companyPeriod: home.experience.vox.companyPeriod,
            context: home.experience.vox.context,
            roles: [
              home.experience.vox.roles.architecture,
              home.experience.vox.roles.midLevel,
              home.experience.vox.roles.frontend,
            ],
            highlights: [
              home.experience.vox.highlights.progression,
              home.experience.vox.highlights.products,
              home.experience.vox.highlights.quality,
            ],
            technologies: home.experience.vox.technologies.split(', '),
          },
          {
            id: 'placar-volei',
            company: home.experience.placarVolei.company,
            companyPeriod: home.experience.placarVolei.companyPeriod,
            context: home.experience.placarVolei.context,
            roles: [home.experience.placarVolei.roles.developer],
            highlights: [
              home.experience.placarVolei.highlights.product,
              home.experience.placarVolei.highlights.realTime,
            ],
            technologies: home.experience.placarVolei.technologies.split(', '),
          },
        ],
      },
    },
    projects: {
      publication: 'publish',
      value: {
        id: 'projetos',
        navigationLabel: messages.navigation.projects,
        eyebrow: home.projects.eyebrow,
        title: home.projects.title,
        introduction: home.projects.introduction,
        documentedTechnologiesLabel: home.projects.documentedTechnologiesLabel,
        items: [project],
      },
    },
    technologies: {
      publication: 'publish',
      value: {
        id: 'tecnologias',
        navigationLabel: messages.navigation.stack,
        eyebrow: home.technologies.eyebrow,
        title: home.technologies.title,
        introduction: home.technologies.introduction,
        groups: [
          { id: 'angular', ...home.technologies.angular },
          { id: 'java-quarkus', ...home.technologies.javaQuarkus },
          { id: 'node-nestjs', ...home.technologies.nodeNest },
        ],
      },
    },
    principles: {
      publication: 'publish',
      value: {
        id: 'principios',
        navigationLabel: messages.navigation.principles,
        eyebrow: home.principles.eyebrow,
        title: home.principles.title,
        introduction: home.principles.introduction,
        items: [
          { id: 'clarity', ...home.principles.clarity },
          { id: 'change', ...home.principles.change },
          { id: 'quality', ...home.principles.quality },
          { id: 'incremental', ...home.principles.incremental },
          { id: 'documentation', ...home.principles.documentation },
        ],
      },
    },
    contact: {
      publication: 'publish',
      value: {
        id: 'contato',
        navigationLabel: messages.navigation.contact,
        eyebrow: home.contact.eyebrow,
        title: home.contact.title,
        body: home.contact.body,
        primaryAction: 'email',
        secondaryAction: 'linkedin',
        supportingAction: 'github',
      },
    },
    seo: {
      publication: 'publish',
      value: {
        title: messages.seo.home.title,
        description: messages.seo.home.description,
        canonical: 'https://www.patrickchaves.com.br/',
        locale: messages.seo.home.ogLocale as 'pt_BR' | 'en_US',
        language: messages.seo.home.language as 'pt-BR' | 'en',
        robots: 'index,follow',
        openGraphType: 'website',
      },
    },
  };
};

@Injectable({ providedIn: 'root' })
export class LocalizedContentService {
  private readonly language = inject(LanguageService);
  private readonly translatedCatalog = inject(TranslateService).translate(
    'content',
  ) as Signal<TranslationObject>;

  readonly messages = computed(
    () => this.translatedCatalog() as unknown as TranslationCatalog,
  );
  readonly portfolio = computed(() => createPortfolioContent(this.messages()));
  readonly navigation = computed<readonly NavigationItem[]>(() => {
    const content = this.portfolio();
    return [
      content.summary,
      content.experience,
      content.projects,
      content.technologies,
      content.principles,
      content.contact,
    ].map(({ value }) => ({
      label: value.navigationLabel,
      href: `/#${value.id}`,
    }));
  });
  readonly socialLinks = computed(() => {
    const links = this.portfolio().site.links;
    return [links.linkedin, links.github, links.email] as const;
  });
  readonly footerLinks = computed(() => {
    const links = this.portfolio().site.links;
    return [links.linkedin, links.github, links.email, links.website] as const;
  });
  readonly resume = computed<ResumeDownload>(() =>
    resolveResumeDownload(this.language.activeLanguage()),
  );
  readonly homeSeo = computed<SeoPage>(() => homeSeo(this.portfolio()));

  resolveLink(id: LinkId): PortfolioLink {
    return this.portfolio().site.links[id];
  }

  createCaseStudySeo = caseStudySeo;
}
