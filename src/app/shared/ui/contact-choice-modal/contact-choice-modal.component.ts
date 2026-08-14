import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

import { ContactModalService } from '@core/contact/contact-modal.service';
import { LocalizedContentService } from '@core/i18n/localized-content.selectors';

@Component({
  selector: 'app-contact-choice-modal',
  templateUrl: './contact-choice-modal.component.html',
  styleUrl: './contact-choice-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactChoiceModalComponent {
  protected readonly contactModal = inject(ContactModalService);
  protected readonly i18n = inject(LocalizedContentService);

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('contactDialog');

  protected readonly emailLink = computed(() => this.i18n.resolveLink('email'));
  protected readonly linkedinLink = computed(() => this.i18n.resolveLink('linkedin'));
  protected readonly emailAddress = computed(() =>
    this.emailLink().href.replace('mailto:', ''),
  );
  protected readonly linkedinHandle = computed(
    () => this.i18n.messages().links.linkedinHandle,
  );
  protected readonly modalMessages = computed(
    () => this.i18n.messages().common.contactModal,
  );

  constructor() {
    effect(() => {
      const dialog = this.dialog()?.nativeElement;
      if (!dialog) return;
      if (this.contactModal.open()) {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else if (dialog.open) {
        dialog.close();
      }
    });
  }

  close(): void {
    this.contactModal.close();
  }

  handleCancel(event: Event): void {
    event.preventDefault();
    this.close();
  }

  handleNativeClose(): void {
    this.contactModal.close();
  }
}
