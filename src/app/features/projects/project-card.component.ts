import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProjectSummaryContent } from '@core/content/content.models';
import { LocalizedContentService } from '@core/i18n/localized-content.selectors';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<ProjectSummaryContent>();
  readonly technologiesLabel = input.required<string>();
  protected readonly i18n = inject(LocalizedContentService);
}
