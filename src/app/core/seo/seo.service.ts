import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SeoPage } from './seo.models';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  apply(page: SeoPage): void {
    this.document.documentElement.lang = page.language;
    this.title.setTitle(page.title);
    this.setName('description', page.description);
    this.setName('robots', page.robots);
    this.setProperty('og:title', page.title);
    this.setProperty('og:description', page.description);
    this.setProperty('og:type', page.openGraphType);
    this.setProperty('og:url', page.canonical);
    this.setProperty('og:locale', page.locale);
    this.setName('twitter:card', 'summary');
    this.setName('twitter:title', page.title);
    this.setName('twitter:description', page.description);
    this.setCanonical(page.canonical);
    if (page.softwareApplication) {
      this.setStructuredData('software-structured-data', {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: page.softwareApplication.name,
        description: page.softwareApplication.description,
        url: page.softwareApplication.url,
        softwareVersion: page.softwareApplication.softwareVersion,
        sameAs: page.softwareApplication.sameAs,
        inLanguage: page.language,
      });
    } else {
      this.removeStructuredData('software-structured-data');
    }
    if (page.person) {
      this.setStructuredData('person-structured-data', {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: page.person.name,
        url: page.person.url,
        email: page.person.email,
        jobTitle: page.person.jobTitle,
        sameAs: page.person.sameAs,
        knowsAbout: page.person.knowsAbout,
        inLanguage: page.language,
      });
      this.setStructuredData('website-structured-data', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: page.person.name,
        url: page.canonical,
        inLanguage: page.language,
      });
    } else {
      this.removeStructuredData('person-structured-data');
      this.removeStructuredData('website-structured-data');
    }
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(href: string): void {
    const canonicalSelector = 'link[rel="canonical"]';
    const links = Array.from(
      this.document.head.querySelectorAll<HTMLLinkElement>(canonicalSelector),
    );
    const canonical = links.shift() ?? this.document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = href;
    if (!canonical.parentNode) {
      this.document.head.appendChild(canonical);
    }
    links.forEach((link) => link.remove());
  }

  private setStructuredData(id: string, value: object): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(value);
  }

  private removeStructuredData(id: string): void {
    this.document.getElementById(id)?.remove();
  }
}
