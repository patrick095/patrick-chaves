import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { PortfolioLink } from '@core/content/content.models';
import { LocalizedContentService } from '@core/i18n/localized-content.selectors';

export type ButtonLinkVariant = 'primary' | 'secondary' | 'quiet';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLinkComponent {
  readonly link = input.required<PortfolioLink>();
  readonly variant = input<ButtonLinkVariant>('primary');
  protected readonly i18n = inject(LocalizedContentService);
}
