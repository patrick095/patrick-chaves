import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProjectsContent } from '@core/content/content.models';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { SectionHeadingComponent } from '@shared/ui/section-heading/section-heading.component';
import { ProjectCardComponent } from './project-card.component';

@Component({
  selector: 'app-projects-section',
  imports: [ContainerComponent, ProjectCardComponent, SectionHeadingComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  readonly content = input.required<ProjectsContent>();
}
