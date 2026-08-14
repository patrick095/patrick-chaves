import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { NavigationItem, PortfolioLink } from '@core/content/content.models';
import { FooterMessages } from '@core/i18n/i18n.models';
import { ContainerComponent } from '@shared/ui/container/container.component';

@Component({
  selector: 'app-site-footer',
  imports: [ContainerComponent],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  readonly name = input.required<string>();
  readonly navigation = input.required<readonly NavigationItem[]>();
  readonly links = input.required<readonly PortfolioLink[]>();
  readonly messages = input.required<FooterMessages>();
  readonly opensInNewTab = input.required<string>();
  readonly currentYear = new Date().getFullYear();
  readonly copyright = computed(() =>
    this.messages()
      .copyright.replace('{year}', String(this.currentYear))
      .replace('{name}', this.name()),
  );
}
