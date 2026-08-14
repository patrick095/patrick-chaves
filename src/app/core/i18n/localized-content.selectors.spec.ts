import { describe, expect, it } from 'vitest';

import { createPortfolioContent } from './localized-content.selectors';
import { ptBrCatalog } from './locales/pt-BR';

describe('createPortfolioContent', () => {
  it('points the email link at the contato@patrickchaves.com.br mailbox', () => {
    const content = createPortfolioContent(ptBrCatalog);
    expect(content.site.links.email.href).toBe('mailto:contato@patrickchaves.com.br');
  });
});
