import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';

import { ContactModalService } from '@core/contact/contact-modal.service';
import { providePortfolioI18n } from '@core/i18n/i18n.config';
import { ContactChoiceModalComponent } from './contact-choice-modal.component';

function stubDialog(dialog: HTMLDialogElement): void {
  Object.defineProperty(dialog, 'open', { value: false, writable: true });
  dialog.showModal = vi.fn(() => {
    Object.defineProperty(dialog, 'open', { value: true, writable: true });
  });
  dialog.close = vi.fn(() => {
    Object.defineProperty(dialog, 'open', { value: false, writable: true });
    dialog.dispatchEvent(new Event('close'));
  });
}

describe('ContactChoiceModalComponent', () => {
  it('opens the dialog when the service signal flips to true, and closes it back', async () => {
    await TestBed.configureTestingModule({
      imports: [ContactChoiceModalComponent],
      providers: [providePortfolioI18n()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslateService).use('pt-BR'));
    const fixture = TestBed.createComponent(ContactChoiceModalComponent);
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    stubDialog(dialog);
    fixture.detectChanges();

    const contactModal = TestBed.inject(ContactModalService);
    contactModal.show();
    fixture.detectChanges();
    expect(dialog.showModal).toHaveBeenCalled();
    expect(dialog.open).toBe(true);

    contactModal.close();
    fixture.detectChanges();
    expect(dialog.close).toHaveBeenCalled();
    expect(dialog.open).toBe(false);
  });

  it('renders the email and LinkedIn options with the expected hrefs and text', async () => {
    await TestBed.configureTestingModule({
      imports: [ContactChoiceModalComponent],
      providers: [providePortfolioI18n()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslateService).use('pt-BR'));
    const fixture = TestBed.createComponent(ContactChoiceModalComponent);
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      '.contact-option',
    ) as NodeListOf<HTMLAnchorElement>;
    expect(options).toHaveLength(2);
    const emailOption = options.item(0) as HTMLAnchorElement;
    const linkedinOption = options.item(1) as HTMLAnchorElement;
    expect(emailOption.href).toBe('mailto:contato@patrickchaves.com.br');
    expect(emailOption.textContent).toContain('contato@patrickchaves.com.br');
    expect(linkedinOption.href).toBe('https://www.linkedin.com/in/patrick095/');
    expect(linkedinOption.textContent).toContain('Patrick095');
    expect(linkedinOption.target).toBe('_blank');
  });

  it('closes the dialog on the cancel (Esc) event', async () => {
    await TestBed.configureTestingModule({
      imports: [ContactChoiceModalComponent],
      providers: [providePortfolioI18n()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslateService).use('pt-BR'));
    const fixture = TestBed.createComponent(ContactChoiceModalComponent);
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    stubDialog(dialog);
    fixture.detectChanges();

    const contactModal = TestBed.inject(ContactModalService);
    contactModal.show();
    fixture.detectChanges();

    fixture.componentInstance.handleCancel(new Event('cancel', { cancelable: true }));
    fixture.detectChanges();
    expect(contactModal.open()).toBe(false);
  });
});
