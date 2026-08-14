import { SeoPage } from './seo.models';
import {
  HttpUrl,
  PortfolioContent,
  ProjectCaseContent,
} from '@core/content/content.models';

export const homeSeo = ({ seo, site }: PortfolioContent): SeoPage => ({
  ...seo.value,
  person: {
    name: site.name,
    url: seo.value.canonical,
    email: site.links.email.href.replace('mailto:', ''),
    jobTitle: [site.professionalTitle],
    sameAs: [
      site.links.linkedin.href as HttpUrl,
      site.links.github.href as HttpUrl,
    ],
    knowsAbout: ['Angular', 'Java', 'Quarkus', 'Node.js', 'NestJS'],
  },
});

export const caseStudySeo = (project: ProjectCaseContent): SeoPage => ({
  ...project.seo,
  softwareApplication: {
    name: project.name.value,
    description: project.summary.value,
    url: project.seo.canonical,
    softwareVersion: '0.6.2',
    sameAs: project.links.repository.href,
  },
});
