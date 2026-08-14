import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { ContactModalService } from '@core/contact/contact-modal.service';
import { providePortfolioI18n } from '@core/i18n/i18n.config';
import { createPortfolioContent } from '@core/i18n/localized-content.selectors';
import { ptBrCatalog } from '@core/i18n/locales/pt-BR';
import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  it('opens the contact modal when the primary action button is clicked', async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
      providers: [providePortfolioI18n()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslateService).use('pt-BR'));
    const content = createPortfolioContent(ptBrCatalog);
    const fixture = TestBed.createComponent(ContactSectionComponent);
    fixture.componentRef.setInput('content', content.contact.value);
    fixture.componentRef.setInput(
      'primaryAction',
      content.site.links[content.contact.value.primaryAction],
    );
    fixture.componentRef.setInput(
      'secondaryAction',
      content.site.links[content.contact.value.secondaryAction],
    );
    fixture.componentRef.setInput(
      'supportingAction',
      content.site.links[content.contact.value.supportingAction],
    );
    fixture.detectChanges();

    const contactModal = TestBed.inject(ContactModalService);
    const primaryButton = fixture.nativeElement.querySelector(
      '.primary-trigger',
    ) as HTMLButtonElement;
    expect(primaryButton.tagName).toBe('BUTTON');
    expect(primaryButton.textContent?.trim()).toBe(content.site.links.email.label);

    primaryButton.click();
    expect(contactModal.open()).toBe(true);
  });
});
