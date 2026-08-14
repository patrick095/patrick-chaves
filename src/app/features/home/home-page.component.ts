import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';

import { LocalizedContentService } from '@core/i18n/localized-content.selectors';
import { SeoService } from '@core/seo/seo.service';
import { ContactSectionComponent } from '@features/contact/contact-section.component';
import { ExperienceSectionComponent } from '@features/experience/experience-section.component';
import { HeroComponent } from '@features/hero/hero.component';
import { PrinciplesSectionComponent } from '@features/principles/principles-section.component';
import { ProfessionalSummaryComponent } from '@features/professional-summary/professional-summary.component';
import { ProjectsSectionComponent } from '@features/projects/projects-section.component';
import { TechnologiesSectionComponent } from '@features/technologies/technologies-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ContactSectionComponent,
    ExperienceSectionComponent,
    HeroComponent,
    PrinciplesSectionComponent,
    ProfessionalSummaryComponent,
    ProjectsSectionComponent,
    TechnologiesSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly localizedContent = inject(LocalizedContentService);
  protected readonly content = this.localizedContent.portfolio;

  constructor() {
    const seo = inject(SeoService);
    effect(() => seo.apply(this.localizedContent.homeSeo()));
  }
}
