import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { ContactModalService } from '@core/contact/contact-modal.service';
import { providePortfolioI18n } from '@core/i18n/i18n.config';
import { createPortfolioContent } from '@core/i18n/localized-content.selectors';
import { ptBrCatalog } from '@core/i18n/locales/pt-BR';
import { resolveResumeDownload } from '@core/i18n/resume.config';
import { SiteHeaderComponent } from './site-header.component';

describe('SiteHeaderComponent', () => {
  it('opens and closes the accessible dialog while restoring trigger focus', async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [providePortfolioI18n()],
    }).compileComponents();
    const content = createPortfolioContent(ptBrCatalog);
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    fixture.componentRef.setInput('name', 'Patrick Chaves');
    fixture.componentRef.setInput('navigation', [
      { label: ptBrCatalog.navigation.about, href: '/#sobre' },
    ]);
    fixture.componentRef.setInput('contactLink', content.site.links.email);
    fixture.componentRef.setInput('messages', ptBrCatalog.header);
    fixture.componentRef.setInput('resume', resolveResumeDownload('pt-BR'));
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    const toggle = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;
    Object.defineProperty(dialog, 'open', { value: false, writable: true });
    dialog.showModal = vi.fn(() => {
      Object.defineProperty(dialog, 'open', { value: true, writable: true });
    });
    dialog.close = vi.fn(() => {
      Object.defineProperty(dialog, 'open', { value: false, writable: true });
    });

    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    fixture.componentInstance.handleCancel(new Event('cancel', { cancelable: true }));
    fixture.detectChanges();
    await Promise.resolve();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('opens the contact modal when the desktop and mobile contact buttons are clicked', async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [providePortfolioI18n()],
    }).compileComponents();
    const content = createPortfolioContent(ptBrCatalog);
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    fixture.componentRef.setInput('name', 'Patrick Chaves');
    fixture.componentRef.setInput('navigation', [
      { label: ptBrCatalog.navigation.about, href: '/#sobre' },
    ]);
    fixture.componentRef.setInput('contactLink', content.site.links.email);
    fixture.componentRef.setInput('messages', ptBrCatalog.header);
    fixture.componentRef.setInput('resume', resolveResumeDownload('pt-BR'));
    fixture.detectChanges();

    const contactModal = TestBed.inject(ContactModalService);
    const desktopButton = fixture.nativeElement.querySelector(
      '.contact-link',
    ) as HTMLButtonElement;
    expect(desktopButton.tagName).toBe('BUTTON');
    desktopButton.click();
    expect(contactModal.open()).toBe(true);

    contactModal.close();
    const mobileButton = fixture.nativeElement.querySelector(
      '.mobile-contact',
    ) as HTMLButtonElement;
    expect(mobileButton.tagName).toBe('BUTTON');
    mobileButton.click();
    expect(contactModal.open()).toBe(true);
  });
});
