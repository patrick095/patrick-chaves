import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SummaryContent } from '@core/content/content.models';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';

@Component({
  selector: 'app-professional-summary',
  imports: [ContainerComponent, SectionHeadingComponent],
  templateUrl: './professional-summary.component.html',
  styleUrl: './professional-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalSummaryComponent {
  readonly content = input.required<SummaryContent>();
}
