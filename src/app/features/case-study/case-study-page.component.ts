import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';

import { caseStudySeo } from '@core/seo/seo.selectors';
import { SeoService } from '@core/seo/seo.service';
import { LocalizedContentService } from '@core/i18n/localized-content.selectors';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { LocalizedCaseStudyService } from './localized-case-study.service';

@Component({
  selector: 'app-case-study-page',
  imports: [ContainerComponent],
  templateUrl: './case-study-page.component.html',
  styleUrl: './case-study-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LocalizedCaseStudyService],
})
export class CaseStudyPageComponent {
  protected readonly content = inject(LocalizedCaseStudyService);
  protected readonly i18n = inject(LocalizedContentService);
  protected readonly project = this.content.project;
  protected readonly sources = this.content.sources;
  protected readonly messages = this.content.messages;

  constructor() {
    const seo = inject(SeoService);
    effect(() => seo.apply(caseStudySeo(this.project())));
  }
}
