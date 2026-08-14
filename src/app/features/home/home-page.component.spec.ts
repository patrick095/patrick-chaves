import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { HomePageComponent } from './home-page.component';
import { providePortfolioI18n } from '@core/i18n/i18n.config';

describe('HomePageComponent', () => {
  it('renders personal portfolio content without unpublished or generic AI sections', async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([]), providePortfolioI18n()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslateService).use('pt-BR'));
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('#experiencia')).not.toBeNull();
    expect(element.textContent).toContain('Stefanini Brasil');
    expect(element.textContent).toContain('Vox Tecnologia');
    expect(element.querySelector('#projetos')).not.toBeNull();
    expect(element.textContent).toContain('ApexLap Coach');
    expect(element.textContent).toContain('Angular');
    expect(element.querySelector('#inteligencia-artificial')).toBeNull();
    expect(element.textContent).not.toContain('RAG');
    expect(element.textContent).not.toContain('Inteligência artificial');
  });
});
