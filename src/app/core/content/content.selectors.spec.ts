import { describe, expect, it } from 'vitest';

import { createPortfolioContent } from '@core/i18n/localized-content.selectors';
import { enCatalog } from '@core/i18n/locales/en';
import { ptBrCatalog } from '@core/i18n/locales/pt-BR';

describe('localized content composition', () => {
  const pt = createPortfolioContent(ptBrCatalog);
  const en = createPortfolioContent(enCatalog);

  it('keeps routes, professional experience and evidence invariant across locales', () => {
    expect(pt.experience.publication).toBe('publish');
    expect(en.experience.publication).toBe('publish');
    expect(pt.experience.value.items.map(({ id }) => id)).toEqual(
      en.experience.value.items.map(({ id }) => id),
    );
    expect(pt.experience.value.items).toHaveLength(4);
    expect(pt.projects.value.items[0].links.caseStudy.href).toBe(
      '/projetos/apexlap-coach',
    );
    expect(en.projects.value.items[0].technologies.every(({ evidence }) => evidence.length > 0)).toBe(true);
  });

  it('localizes public copy without changing confirmed destinations', () => {
    expect(pt.hero.value.professionalTitle).toBe(
      'Desenvolvedor Full Stack Sênior e Tech Lead',
    );
    expect(en.hero.value.professionalTitle).toBe(
      'Senior Full Stack Developer & Tech Lead',
    );
    expect(pt.hero.value.primaryAction).toBe('experience');
    expect(pt.site.links.linkedin.href).toBe(en.site.links.linkedin.href);
    expect(pt.site.links.website.href).toBe('https://patrickchaves.com.br');
    expect(pt.projects.value.items[0].name.value).toBe('ApexLap Coach');
  });
});
