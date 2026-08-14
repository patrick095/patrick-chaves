import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LanguageService } from './core/i18n/language.service';
import { LocalizedContentService } from './core/i18n/localized-content.selectors';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { ContactChoiceModalComponent } from './shared/ui/contact-choice-modal/contact-choice-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SiteFooterComponent,
    SiteHeaderComponent,
    ContactChoiceModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly content = inject(LocalizedContentService);

  constructor() {
    const language = inject(LanguageService);
    afterNextRender(() => void language.initializeBrowserPreference());
  }
}
