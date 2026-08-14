import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TechnologyContent } from '@core/content/content.models';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';

@Component({
  selector: 'app-technologies-section',
  imports: [ContainerComponent, SectionHeadingComponent],
  templateUrl: './technologies-section.component.html',
  styleUrl: './technologies-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologiesSectionComponent {
  readonly content = input.required<TechnologyContent>();
}
