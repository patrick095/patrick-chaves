import { HttpUrl } from '@core/content/content.models';

export interface SeoPage {
  readonly title: string;
  readonly description: string;
  readonly canonical: HttpUrl;
  readonly robots: string;
  readonly locale: string;
  readonly language: string;
  readonly openGraphType: 'website' | 'article';
  readonly person?: Readonly<{
    name: string;
    url: HttpUrl;
    email: string;
    jobTitle: readonly string[];
    sameAs: readonly HttpUrl[];
    knowsAbout: readonly string[];
  }>;
  readonly softwareApplication?: Readonly<{
    name: string;
    description: string;
    url: HttpUrl;
    softwareVersion: string;
    sameAs: HttpUrl;
  }>;
}
