import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { HeroContent, PortfolioLink } from '@core/content/content.models';
import { SocialLinksComponent } from '@layout/social-links/social-links.component';
import { ButtonLinkComponent } from '@shared/ui/button-link/button-link.component';
import { ContainerComponent } from '@shared/ui/container/container.component';

@Component({
  selector: 'app-hero',
  imports: [ButtonLinkComponent, ContainerComponent, SocialLinksComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly content = input.required<HeroContent>();
  readonly primaryAction = input.required<PortfolioLink>();
  readonly secondaryAction = input.required<PortfolioLink>();
  readonly supportingActions = input.required<readonly PortfolioLink[]>();
}
