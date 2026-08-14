import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { ContactModalService } from '@core/contact/contact-modal.service';
import { NavigationItem, PortfolioLink } from '@core/content/content.models';
import {
  HeaderMessages,
  isSupportedLanguage,
} from '@core/i18n/i18n.models';
import { LanguageService } from '@core/i18n/language.service';
import { ResumeDownload } from '@core/i18n/resume.config';
import { ContainerComponent } from '@shared/ui/container/container.component';

@Component({
  selector: 'app-site-header',
  imports: [ContainerComponent],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  readonly name = input.required<string>();
  readonly navigation = input.required<readonly NavigationItem[]>();
  readonly contactLink = input.required<PortfolioLink>();
  readonly messages = input.required<HeaderMessages>();
  readonly resume = input.required<ResumeDownload>();
  readonly menuOpen = signal(false);
  protected readonly language = inject(LanguageService);
  protected readonly contactModal = inject(ContactModalService);

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('menuDialog');
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');

  toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu(true);
      return;
    }
    const dialog = this.dialog()?.nativeElement;
    if (!dialog) return;
    dialog.showModal();
    this.menuOpen.set(true);
    queueMicrotask(() => dialog.querySelector<HTMLAnchorElement>('a')?.focus());
  }

  closeMenu(restoreFocus = true): void {
    const dialog = this.dialog()?.nativeElement;
    if (dialog?.open) dialog.close();
    this.menuOpen.set(false);
    if (restoreFocus) {
      queueMicrotask(() => this.menuToggle()?.nativeElement.focus());
    }
  }

  handleCancel(event: Event): void {
    event.preventDefault();
    this.closeMenu(true);
  }

  changeLanguage(event: Event): void {
    const language = (event.target as HTMLSelectElement).value;
    if (isSupportedLanguage(language)) void this.language.setLanguage(language);
  }
}
