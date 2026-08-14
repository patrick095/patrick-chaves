import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { providePortfolioI18n } from '@core/i18n/i18n.config';
import { createPortfolioContent } from '@core/i18n/localized-content.selectors';
import { ptBrCatalog } from '@core/i18n/locales/pt-BR';
import { ProjectsSectionComponent } from './projects-section.component';

describe('ProjectsSectionComponent', () => {
  it('renders the factual text card without an image or nested links', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSectionComponent],
      providers: [provideRouter([]), providePortfolioI18n()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslateService).use('pt-BR'));

    const fixture = TestBed.createComponent(ProjectsSectionComponent);
    fixture.componentRef.setInput(
      'content',
      createPortfolioContent(ptBrCatalog).projects.value,
    );
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector('article');
    const links = card?.querySelectorAll('a') ?? [];

    expect(element.querySelector('#projetos')).not.toBeNull();
    expect(card?.textContent).toContain('ApexLap Coach');
    expect(card?.textContent).toContain('Versão pública documentada: 0.6.2');
    expect(card?.querySelector('img')).toBeNull();
    expect(links).toHaveLength(2);
    expect(Array.from(links).some((link) => link.querySelector('a'))).toBe(false);
    expect(links[0]?.getAttribute('href')).toBe('/projetos/apexlap-coach');
    expect(links[1]?.getAttribute('href')).toBe(
      'https://github.com/patrick095/ApexLap-Coach',
    );
  });
});
