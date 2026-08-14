import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ExperienceContent } from '@core/content/content.models';
import { ResumeDownload } from '@core/i18n/resume.config';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';

@Component({
  selector: 'app-experience-section',
  imports: [ContainerComponent, SectionHeadingComponent],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSectionComponent {
  readonly content = input.required<ExperienceContent>();
  readonly resume = input.required<ResumeDownload>();
}
