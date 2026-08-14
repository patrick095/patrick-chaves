# Contact Choice Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the direct `mailto:` link behind "Entrar em contato" / "Get in touch" (header desktop, mobile menu, contact-section primary button) with a small modal letting the visitor choose Email or LinkedIn, and update the site's email address to `contato@patrickchaves.com.br`.

**Architecture:** A root-provided `ContactModalService` holds a single `open` signal. Any trigger button calls `contactModal.open()`. A single `ContactChoiceModalComponent`, mounted once in `AppComponent`, renders a native `<dialog>` that watches the signal via an `effect()` and shows/hides itself accordingly — no `@Output` wiring needed between unrelated components (header, contact section, and the modal are siblings under `app-root`).

**Tech Stack:** Angular (standalone components, signals), native `<dialog>` element, Vitest + Angular `TestBed` for tests. No new dependencies.

## Global Constraints

- Angular standalone components, `ChangeDetectionStrategy.OnPush` on every component (matches existing codebase convention).
- All user-facing copy goes through the i18n catalogs (`src/app/core/i18n/locales/{pt-BR,en}/common.ts`) — no hardcoded strings in templates, except the LinkedIn handle text `Patrick095`, which is identical in both locales but still declared in each locale file (not literal in a template), per existing pattern (e.g. `website: 'patrickchaves.com.br'`).
- Styling uses only existing CSS custom properties already defined in the codebase (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--duration-*`, `--ease-*`) — no new design tokens.
- Path aliases: `@core/*` → `src/app/core/*`, `@features/*` → `src/app/features/*`, `@shared/*` → `src/app/shared/*`.
- Tests use Vitest + `TestBed`, following the pattern in `src/app/layout/site-header/site-header.component.spec.ts`.
- Every task ends with `npm run test -- --run <spec file>` (or the full `npm run test` for the final task) passing before commit.

---

### Task 1: i18n copy — contact modal title/close label, LinkedIn handle, new email address

**Files:**
- Modify: `src/app/core/i18n/locales/en/common.ts`
- Modify: `src/app/core/i18n/locales/pt-BR/common.ts`
- Modify: `src/app/core/i18n/localized-content.selectors.ts:57`
- Test: `src/app/core/i18n/localized-content.selectors.spec.ts` (new)

**Interfaces:**
- Produces: `TranslationCatalog['common']['contactModal']` = `{ title: string; closeLabel: string }`, consumed by `ContactChoiceModalComponent` (Task 3) as `i18n.messages().common.contactModal`.
- Produces: `TranslationCatalog['links']['linkedinHandle']: string`, consumed by `ContactChoiceModalComponent` (Task 3) as `i18n.messages().links.linkedinHandle`.
- Produces: `links.email.href === 'mailto:contato@patrickchaves.com.br'` in `createPortfolioContent(...).site.links.email`.

- [ ] **Step 1: Write the failing test for the new email address**

Create `src/app/core/i18n/localized-content.selectors.spec.ts`:

```ts
import { describe, expect, it } from 'vitest';

import { createPortfolioContent } from './localized-content.selectors';
import { ptBrCatalog } from './locales/pt-BR';

describe('createPortfolioContent', () => {
  it('points the email link at the contato@patrickchaves.com.br mailbox', () => {
    const content = createPortfolioContent(ptBrCatalog);
    expect(content.site.links.email.href).toBe('mailto:contato@patrickchaves.com.br');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run src/app/core/i18n/localized-content.selectors.spec.ts`
Expected: FAIL — actual href is `mailto:patrick095@gmail.com`.

- [ ] **Step 3: Update the email address**

In `src/app/core/i18n/localized-content.selectors.ts:57`, change:

```ts
      href: 'mailto:patrick095@gmail.com',
```

to:

```ts
      href: 'mailto:contato@patrickchaves.com.br',
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- --run src/app/core/i18n/localized-content.selectors.spec.ts`
Expected: PASS

- [ ] **Step 5: Add the new i18n copy (pt-BR)**

In `src/app/core/i18n/locales/pt-BR/common.ts`, add `contactModal` to the `common` export and `linkedinHandle` to the `links` export:

```ts
export const common = {
  skipToContent: 'Pular para o conteúdo principal',
  opensInNewTab: 'abre em nova aba',
  siteName: 'Patrick Chaves',
  professionalTitle: 'Desenvolvedor Full Stack Sênior e Tech Lead',
  contactModal: {
    title: 'Como você prefere entrar em contato?',
    closeLabel: 'Fechar',
  },
} as const satisfies TranslationCatalog['common'];
```

```ts
export const links = {
  experience: 'Ver experiência',
  principles: 'Como desenvolvo software',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  email: 'Entrar em contato',
  website: 'patrickchaves.com.br',
  professionalChannelsLabel: 'Links profissionais',
  otherProfessionalChannelsLabel: 'Outros canais profissionais',
  linkedinHandle: 'Patrick095',
} as const satisfies TranslationCatalog['links'];
```

- [ ] **Step 6: Add the matching i18n copy (en) — this defines the catalog shape**

In `src/app/core/i18n/locales/en/common.ts` (source of truth for `TranslationCatalog`, per `src/app/core/i18n/i18n.models.ts:16`), add the same keys:

```ts
export const common = {
    skipToContent: "Skip to main content",
    opensInNewTab: "opens in a new tab",
    siteName: "Patrick Chaves",
    professionalTitle: "Senior Full Stack Developer & Tech Lead",
    contactModal: {
        title: "How would you like to get in touch?",
        closeLabel: "Close",
    },
} as const;
```

```ts
export const links = {
    experience: "View experience",
    principles: "How I build software",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Get in touch",
    website: "patrickchaves.com.br",
    professionalChannelsLabel: "Professional links",
    otherProfessionalChannelsLabel: "Other professional channels",
    linkedinHandle: "Patrick095",
} as const;
```

- [ ] **Step 7: Typecheck and run the full i18n-related test suite**

Run: `npm run typecheck && npm run test -- --run src/app/core/i18n`
Expected: PASS (typecheck confirms `pt-BR/common.ts`'s `satisfies TranslationCatalog['common']` / `['links']` still holds now that the `en` catalog shape changed).

- [ ] **Step 8: Commit**

```bash
git add src/app/core/i18n/locales/en/common.ts src/app/core/i18n/locales/pt-BR/common.ts src/app/core/i18n/localized-content.selectors.ts src/app/core/i18n/localized-content.selectors.spec.ts
git commit -m "feat: add contact modal copy and switch email to contato@patrickchaves.com.br"
```

---

### Task 2: `ContactModalService`

**Files:**
- Create: `src/app/core/contact/contact-modal.service.ts`
- Test: `src/app/core/contact/contact-modal.service.spec.ts`

**Interfaces:**
- Produces: `ContactModalService` (`providedIn: 'root'`) with `readonly open: Signal<boolean>`, `open(): void`, `close(): void`. Consumed by `ContactChoiceModalComponent` (Task 3), `SiteHeaderComponent` (Task 4), `ContactSectionComponent` (Task 5).

- [ ] **Step 1: Write the failing test**

Create `src/app/core/contact/contact-modal.service.spec.ts`:

```ts
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { ContactModalService } from './contact-modal.service';

describe('ContactModalService', () => {
  it('starts closed, opens on open(), and closes on close()', () => {
    const service = TestBed.inject(ContactModalService);

    expect(service.open()).toBe(false);

    service.open();
    expect(service.open()).toBe(true);

    service.close();
    expect(service.open()).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run src/app/core/contact/contact-modal.service.spec.ts`
Expected: FAIL — cannot find module `./contact-modal.service`.

- [ ] **Step 3: Implement the service**

Create `src/app/core/contact/contact-modal.service.ts`:

```ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactModalService {
  private readonly isOpen = signal(false);
  readonly open = this.isOpen.asReadonly();

  show(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
```

Note: the readonly signal is named `open` (matching `contactModal.open()` used by consumers as a getter), so the method that opens the dialog is named `show()` to avoid a name collision between the signal property and a method. Update the test above accordingly:

```ts
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { ContactModalService } from './contact-modal.service';

describe('ContactModalService', () => {
  it('starts closed, opens on show(), and closes on close()', () => {
    const service = TestBed.inject(ContactModalService);

    expect(service.open()).toBe(false);

    service.show();
    expect(service.open()).toBe(true);

    service.close();
    expect(service.open()).toBe(false);
  });
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- --run src/app/core/contact/contact-modal.service.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/core/contact/contact-modal.service.ts src/app/core/contact/contact-modal.service.spec.ts
git commit -m "feat: add ContactModalService"
```

---

### Task 3: `ContactChoiceModalComponent`

**Files:**
- Create: `src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.ts`
- Create: `src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.html`
- Create: `src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.scss`
- Test: `src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.spec.ts`

**Interfaces:**
- Consumes: `ContactModalService.open: Signal<boolean>`, `.close(): void` (Task 2). `LocalizedContentService.resolveLink(id: LinkId): PortfolioLink` and `.messages(): TranslationCatalog` (existing, `src/app/core/i18n/localized-content.selectors.ts`).
- Produces: `<app-contact-choice-modal />`, a self-contained component with no inputs, consumed by `AppComponent` (Task 6).

- [ ] **Step 1: Write the failing test**

Create `src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.spec.ts`:

```ts
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { providePortfolioI18n } from '@core/i18n/i18n.config';
import { ContactModalService } from '@core/contact/contact-modal.service';
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
  it('opens the dialog when the service signal flips to true, and closes it back', () => {
    TestBed.configureTestingModule({
      imports: [ContactChoiceModalComponent],
      providers: [providePortfolioI18n()],
    });
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

  it('renders the email and LinkedIn options with the expected hrefs and text', () => {
    TestBed.configureTestingModule({
      imports: [ContactChoiceModalComponent],
      providers: [providePortfolioI18n()],
    });
    const fixture = TestBed.createComponent(ContactChoiceModalComponent);
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      '.contact-option',
    ) as NodeListOf<HTMLAnchorElement>;
    expect(options).toHaveLength(2);
    expect(options[0].href).toBe('mailto:contato@patrickchaves.com.br');
    expect(options[0].textContent).toContain('contato@patrickchaves.com.br');
    expect(options[1].href).toBe('https://www.linkedin.com/in/patrick095/');
    expect(options[1].textContent).toContain('Patrick095');
    expect(options[1].target).toBe('_blank');
  });

  it('closes the dialog on the cancel (Esc) event', () => {
    TestBed.configureTestingModule({
      imports: [ContactChoiceModalComponent],
      providers: [providePortfolioI18n()],
    });
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.spec.ts`
Expected: FAIL — cannot find module `./contact-choice-modal.component`.

- [ ] **Step 3: Implement the component**

Create `src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.ts`:

```ts
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

  handleBackdropClick(event: MouseEvent): void {
    const dialog = this.dialog()?.nativeElement;
    if (!dialog || event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!clickedInside) this.close();
  }
}
```

Create `src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.html`:

```html
<dialog
  #contactDialog
  class="contact-modal"
  aria-labelledby="contact-modal-title"
  (cancel)="handleCancel($event)"
  (close)="handleNativeClose()"
  (click)="handleBackdropClick($event)"
>
  <div class="contact-heading">
    <p id="contact-modal-title">{{ modalMessages().title }}</p>
    <button
      type="button"
      class="close-button"
      [attr.aria-label]="modalMessages().closeLabel"
      (click)="close()"
    >
      ×
    </button>
  </div>
  <div class="contact-options">
    <a class="contact-option" [href]="emailLink().href" (click)="close()">
      <svg
        class="contact-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
      <span>{{ emailAddress() }}</span>
    </a>
    <a
      class="contact-option"
      [href]="linkedinLink().href"
      target="_blank"
      rel="noreferrer noopener"
      (click)="close()"
    >
      <svg
        class="contact-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.5 9h3v11.5h-3V9Zm6.5 0h2.9v1.6h.04c.4-.76 1.4-1.6 2.9-1.6 3.1 0 3.66 2.03 3.66 4.68v6.82h-3v-6.05c0-1.44-.03-3.3-2.01-3.3-2.01 0-2.32 1.57-2.32 3.2v6.15h-3V9Z"
        />
      </svg>
      <span>{{ linkedinHandle() }}</span>
      <span class="visually-hidden"> ({{ i18n.messages().common.opensInNewTab }})</span>
    </a>
  </div>
</dialog>
```

Create `src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.scss`:

```scss
:host {
  display: contents;
}

dialog.contact-modal {
  width: min(90vw, 380px);
  padding: var(--space-6);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-portrait);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-medium);

  &::backdrop {
    background: rgb(1 5 10 / 78%);
  }
}

.contact-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-5);

  p {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 700;
  }
}

.close-button {
  width: 36px;
  height: 36px;
  display: grid;
  place-content: center;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-control);
  background: var(--color-surface-raised);
  color: var(--color-text);
  font-size: 1.375rem;
  cursor: pointer;
}

.contact-options {
  display: grid;
  gap: var(--space-3);
}

.contact-option {
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-inline: var(--space-4);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-control);
  color: var(--color-text);
  font-weight: 650;
  text-decoration: none;
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard);

  &:hover {
    border-color: var(--color-primary);
    background: var(--color-surface-raised);
  }
}

.contact-icon {
  flex: none;
  color: var(--color-primary-strong);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- --run src/app/shared/ui/contact-choice-modal/contact-choice-modal.component.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/shared/ui/contact-choice-modal
git commit -m "feat: add ContactChoiceModalComponent"
```

---

### Task 4: Wire the header's contact triggers to the modal

**Files:**
- Modify: `src/app/layout/site-header/site-header.component.html`
- Modify: `src/app/layout/site-header/site-header.component.ts`
- Modify: `src/app/layout/site-header/site-header.component.scss`
- Modify: `src/app/layout/site-header/site-header.component.spec.ts`

**Interfaces:**
- Consumes: `ContactModalService.show(): void` (Task 2).

- [ ] **Step 1: Update the existing dialog test to expect a button, not a link, and update the failing assertion**

In `src/app/layout/site-header/site-header.component.spec.ts`, add a second test alongside the existing one (keep the existing test as-is — it still covers the mobile nav dialog):

```ts
import { ContactModalService } from '@core/contact/contact-modal.service';
```

```ts
  it('opens the contact modal when the desktop and mobile contact buttons are clicked', () => {
    TestBed.configureTestingModule({
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run src/app/layout/site-header/site-header.component.spec.ts`
Expected: FAIL — `.contact-link` / `.mobile-contact` are still `<a>` elements with no click handler wired to `ContactModalService`.

- [ ] **Step 3: Add the service and an `openContactModal` method to the component**

In `src/app/layout/site-header/site-header.component.ts`, add the import and injection:

```ts
import { ContactModalService } from '@core/contact/contact-modal.service';
```

```ts
export class SiteHeaderComponent {
  readonly name = input.required<string>();
  readonly navigation = input.required<readonly NavigationItem[]>();
  readonly contactLink = input.required<PortfolioLink>();
  readonly messages = input.required<HeaderMessages>();
  readonly resume = input.required<ResumeDownload>();
  readonly menuOpen = signal(false);
  protected readonly language = inject(LanguageService);
  protected readonly contactModal = inject(ContactModalService);

  // ...existing viewChild/dialog/menuToggle fields and toggleMenu/closeMenu/handleCancel/changeLanguage methods unchanged
}
```

(No new method is needed beyond exposing `contactModal` — the template calls `contactModal.show()` directly.)

- [ ] **Step 4: Update the template**

In `src/app/layout/site-header/site-header.component.html`, replace:

```html
        <a class="contact-link" [href]="contactLink().href">{{ contactLink().label }}</a>
```

with:

```html
        <button type="button" class="contact-link" (click)="contactModal.show()">
          {{ contactLink().label }}
        </button>
```

And replace:

```html
      <a class="mobile-contact" [href]="contactLink().href" (click)="closeMenu(true)">
        {{ contactLink().label }}
      </a>
```

with:

```html
      <button
        type="button"
        class="mobile-contact"
        (click)="closeMenu(true); contactModal.show()"
      >
        {{ contactLink().label }}
      </button>
```

- [ ] **Step 5: Reset default button styling so both buttons still look like the original links**

In `src/app/layout/site-header/site-header.component.scss`, update the shared desktop rule:

```scss
  .contact-link,
  .resume-link {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    padding-inline: var(--space-4);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-control);
    background: transparent;
    color: var(--color-text);
    font: inherit;
    font-size: 0.9375rem;
    font-weight: 650;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      border-color: var(--color-primary);
      background: var(--color-surface-raised);
    }
  }
```

(Added: `background: transparent;`, `font: inherit;`, `cursor: pointer;` — `.resume-link`'s own rule right below still overrides `background`/`border-color`/`color`, unaffected.)

And update `.mobile-contact`:

```scss
.mobile-contact {
  justify-content: center;
  width: 100%;
  margin-top: var(--space-4);
  border: 0;
  border-radius: var(--radius-control);
  background: var(--color-primary);
  color: var(--color-canvas);
  font: inherit;
  cursor: pointer;
}
```

(Added: `width: 100%;`, `font: inherit;`, `cursor: pointer;` — a `<button>` doesn't fill its flex container's width by default the way the previous block-level `<a>` did.)

- [ ] **Step 6: Run test to verify it passes**

Run: `npm run test -- --run src/app/layout/site-header/site-header.component.spec.ts`
Expected: PASS (both tests)

- [ ] **Step 7: Commit**

```bash
git add src/app/layout/site-header/site-header.component.html src/app/layout/site-header/site-header.component.ts src/app/layout/site-header/site-header.component.scss src/app/layout/site-header/site-header.component.spec.ts
git commit -m "feat: open contact modal from header desktop and mobile contact buttons"
```

---

### Task 5: Wire the contact section's primary action to the modal

**Files:**
- Modify: `src/app/features/contact/contact-section.component.html`
- Modify: `src/app/features/contact/contact-section.component.ts`
- Modify: `src/app/features/contact/contact-section.component.scss`
- Test: `src/app/features/contact/contact-section.component.spec.ts` (new)

**Interfaces:**
- Consumes: `ContactModalService.show(): void` (Task 2).

- [ ] **Step 1: Write the failing test**

Create `src/app/features/contact/contact-section.component.spec.ts`:

```ts
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { ContactModalService } from '@core/contact/contact-modal.service';
import { createPortfolioContent } from '@core/i18n/localized-content.selectors';
import { ptBrCatalog } from '@core/i18n/locales/pt-BR';
import { providePortfolioI18n } from '@core/i18n/i18n.config';
import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  it('opens the contact modal when the primary action button is clicked', () => {
    TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
      providers: [providePortfolioI18n()],
    });
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run src/app/features/contact/contact-section.component.spec.ts`
Expected: FAIL — `.primary-trigger` doesn't exist yet (the primary action is still `<app-button-link>`, an `<a>`).

- [ ] **Step 3: Update the component**

In `src/app/features/contact/contact-section.component.ts`:

```ts
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
```

- [ ] **Step 4: Update the template**

In `src/app/features/contact/contact-section.component.html`, replace:

```html
        <app-button-link [link]="primaryAction()" />
```

with:

```html
        <button
          type="button"
          class="primary-trigger"
          (click)="contactModal.show()"
        >
          {{ primaryAction().label }}
        </button>
```

- [ ] **Step 5: Add the button styling**

In `src/app/features/contact/contact-section.component.scss`, add (this replicates `button-link--primary`'s look locally, since Angular's style encapsulation means `ButtonLinkComponent`'s SCSS doesn't reach a plain `<button>` in this template):

```scss
.primary-trigger {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 0 var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  background: var(--color-primary);
  color: var(--color-canvas);
  font: inherit;
  font-weight: 650;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);

  &:hover {
    background: var(--color-primary-strong);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

@media (max-width: 389px) {
  .primary-trigger {
    width: 100%;
  }
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm run test -- --run src/app/features/contact/contact-section.component.spec.ts`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/app/features/contact/contact-section.component.html src/app/features/contact/contact-section.component.ts src/app/features/contact/contact-section.component.scss src/app/features/contact/contact-section.component.spec.ts
git commit -m "feat: open contact modal from the contact section's primary action"
```

---

### Task 6: Mount the modal in `AppComponent` and run full verification

**Files:**
- Modify: `src/app/app.component.ts`
- Modify: `src/app/app.component.html`

**Interfaces:**
- Consumes: `<app-contact-choice-modal />` (Task 3).

- [ ] **Step 1: Register the component**

In `src/app/app.component.ts`:

```ts
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
```

- [ ] **Step 2: Add it to the template**

In `src/app/app.component.html`, add the modal after the footer:

```html
<a class="skip-link" href="#conteudo-principal">{{ content.messages().common.skipToContent }}</a>
<app-site-header
  [name]="content.portfolio().site.name"
  [navigation]="content.navigation()"
  [contactLink]="content.resolveLink('email')"
  [messages]="content.messages().header"
  [resume]="content.resume()"
/>
<router-outlet />
<app-site-footer
  [name]="content.portfolio().site.name"
  [navigation]="content.navigation()"
  [links]="content.footerLinks()"
  [messages]="content.messages().footer"
  [opensInNewTab]="content.messages().common.opensInNewTab"
/>
<app-contact-choice-modal />
```

- [ ] **Step 3: Run the full verification suite**

Run: `npm run verify`
Expected: `lint`, `typecheck`, `test` (all specs, including the new ones from Tasks 1–5), `build`, `verify:static`, and `test:e2e` all PASS. If `test:e2e` includes a scenario that clicks the old contact link and expects mail-client navigation, update it to instead assert the modal opens and its email/LinkedIn options are present — check `e2e/*.spec.ts` for any such assertion before running.

- [ ] **Step 4: Commit**

```bash
git add src/app/app.component.ts src/app/app.component.html
git commit -m "feat: mount the contact choice modal in the app shell"
```
