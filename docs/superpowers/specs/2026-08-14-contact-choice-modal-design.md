# Contact choice modal

## Problem

"Entrar em contato" / "Get in touch" currently links straight to a `mailto:` address in three places (header desktop, mobile menu, contact section's primary action). We want the visitor to choose between email and LinkedIn instead of being forced into a mail client.

## Scope

Three trigger locations switch from a direct email link to opening a modal:

1. Header desktop `.contact-link`.
2. Mobile menu `.mobile-contact`.
3. Contact section's primary action button.

Out of scope: the hero section's small `email` icon link (part of `app-social-links`, not a "get in touch" CTA) stays a direct `mailto:` link.

## Email address change

`links.email.href` in `localized-content.selectors.ts` changes from `mailto:patrick095@gmail.com` to `mailto:contato@patrickchaves.com.br`. This is the single source of truth consumed by SEO JSON-LD (`seo.selectors.ts`), the footer, and the hero icon link — no other file hardcodes the address, so no other change is required for the address swap.

## New pieces

### `ContactModalService` (`src/app/core/contact/contact-modal.service.ts`)

Injectable, `providedIn: 'root'`.

- `readonly open = signal(false)`
- `open(): void` — sets `open` to `true`.
- `close(): void` — sets `open` to `false`.

Trigger components only need to call `contactModal.open()`; no event wiring through parent components.

### `ContactChoiceModalComponent` (`src/app/shared/ui/contact-choice-modal/`)

Standalone component rendering a single native `<dialog>`, centered (not the full-height side panel style used by the mobile nav dialog). Instantiated once, in `app.component.html`, alongside the header/footer.

- Injects `ContactModalService` and `LocalizedContentService`.
- An `effect()` watches `contactModal.open()`: calls `dialog.showModal()` when it flips to `true`, `dialog.close()` when it flips to `false`.
- `(cancel)` (Esc) and a backdrop button both call `contactModal.close()`, matching the existing mobile-menu dialog pattern (`site-header.component.ts` `handleCancel`).
- `(close)` native event also syncs `contactModal.open` back to `false` (covers Esc / backdrop / any native close path), mirroring `site-header.component.ts`.
- On open, focus moves to the first row link (`queueMicrotask`), matching the existing mobile-menu focus behavior.
- Body:
  - Heading: `contactModal.title` (i18n).
  - Close button (`×`), `aria-label` from i18n, calls `close()`.
  - Two rows, each a real `<a>` (so copy-link / middle-click work), closing the modal on click:
    - Email row: inline mail SVG icon + `contato@patrickchaves.com.br` (text derived by stripping `mailto:` from `content.resolveLink('email').href`, not duplicated in i18n), `href="mailto:..."`.
    - LinkedIn row: inline LinkedIn SVG icon + `Patrick095` (from new i18n string `links.linkedinHandle`), `href` from `content.resolveLink('linkedin').href`, opens in a new tab (`target="_blank" rel="noreferrer noopener"`), same "opens in new tab" visually-hidden hint used elsewhere.
- Styling: reuses existing design tokens (`--color-surface`, `--color-border-strong`, `--radius-control`, `--shadow-medium`, etc.) and the same `dialog`/`::backdrop`/`.dialog-backdrop` pattern already established in `site-header.component.scss`, sized as a small centered card (e.g. `width: min(90vw, 380px)`) instead of the full-height side panel.

## Trigger changes

- **Header** (`site-header.component.html` / `.ts`): `.contact-link` and `.mobile-contact` become `<button type="button">` (same classes) calling `contactModal.open()` instead of `<a [href]>`. The `contactLink` input on `SiteHeaderComponent` stays as-is (still a `PortfolioLink`) — only its `.label` is used now, for the button text; `.href` is simply unused. `app.component.html` keeps passing `[contactLink]="content.resolveLink('email')"` unchanged.
- **Contact section** (`contact-section.component.html`): `primaryAction` slot changes from `<app-button-link [link]="primaryAction()" />` to a `<button type="button" class="button-link button-link--primary">{{ primaryAction().label }}</button>` calling `contactModal.open()`. `secondaryAction` (LinkedIn) and `supportingAction` (GitHub) stay unchanged as direct links.

## i18n additions

Add to `common.ts` (pt-BR and en) under a new `contactModal` key:

```ts
contactModal: {
  title: 'Como você prefere entrar em contato?', // en: 'How would you like to get in touch?'
  closeLabel: 'Fechar',                           // en: 'Close'
}
```

Add to the existing `links` block:

```ts
linkedinHandle: 'Patrick095', // same literal in both locales — it's a handle, not translated text
```

## Testing

- Update `site-header.component.spec.ts` for the button-not-anchor change on the contact trigger.
- New spec for `ContactChoiceModalComponent`: opens on service signal, closes on Esc/backdrop/link click, renders correct email/LinkedIn hrefs and display text.
- New spec for `ContactModalService`: open/close toggles the signal.
- `contact-section.component.spec.ts` (if it exists) updated for the button swap.
