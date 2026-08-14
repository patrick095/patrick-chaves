import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { CaseStudyPageComponent } from './case-study-page.component';
import { providePortfolioI18n } from '@core/i18n/i18n.config';

describe('CaseStudyPageComponent', () => {
  it('renders the factual case, conceptual diagram and route metadata', async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudyPageComponent],
      providers: [providePortfolioI18n()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslateService).use('pt-BR'));

    const fixture = TestBed.createComponent(CaseStudyPageComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const document = TestBed.inject(DOCUMENT);

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.textContent).toContain('telemetria transformada em orientação');
    expect(element.textContent).toContain(
      'Diagrama conceitual derivado da documentação pública',
    );
    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('figure ol')?.children).toHaveLength(6);
    expect(document.title).toBe(
      'ApexLap Coach | Estudo de caso | Patrick Chaves',
    );
    expect(
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href,
    ).toBe('https://www.patrickchaves.com.br/projetos/apexlap-coach');
    expect(
      document.querySelector('meta[property="og:type"]')?.getAttribute('content'),
    ).toBe('article');
    expect(element.textContent).not.toContain('Projeto privado');
  });
});
