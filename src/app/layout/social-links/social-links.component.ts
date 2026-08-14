import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { PortfolioLink } from '@core/content/content.models';
import { LocalizedContentService } from '@core/i18n/localized-content.selectors';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  readonly links = input.required<readonly PortfolioLink[]>();
  readonly ariaLabel = input.required<string>();
  protected readonly i18n = inject(LocalizedContentService);
}
