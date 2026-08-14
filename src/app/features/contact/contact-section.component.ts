import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { ContactModalService } from '@core/contact/contact-modal.service';
import { ContactContent, PortfolioLink } from '@core/content/content.models';
import { ButtonLinkComponent } from '@shared/ui/button-link/button-link.component';
import { ContainerComponent } from '@shared/ui/container/container.component';

@Component({
  selector: 'app-contact-section',
  imports: [ButtonLinkComponent, ContainerComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  readonly content = input.required<ContactContent>();
  readonly primaryAction = input.required<PortfolioLink>();
  readonly secondaryAction = input.required<PortfolioLink>();
  readonly supportingAction = input.required<PortfolioLink>();
  protected readonly contactModal = inject(ContactModalService);
}
