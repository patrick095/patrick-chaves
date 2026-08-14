import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PrinciplesContent } from '@core/content/content.models';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';

@Component({
  selector: 'app-principles-section',
  imports: [ContainerComponent, SectionHeadingComponent],
  templateUrl: './principles-section.component.html',
  styleUrl: './principles-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrinciplesSectionComponent {
  readonly content = input.required<PrinciplesContent>();
}
