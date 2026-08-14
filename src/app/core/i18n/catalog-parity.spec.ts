import { describe, expect, it } from 'vitest';

import { enCaseStudyMessages } from '@features/case-study/i18n/en';
import { ptBrCaseStudyMessages } from '@features/case-study/i18n/pt-BR';
import { findCatalogParityErrors } from './catalog-parity';
import { enCatalog } from './locales/en';
import { ptBrCatalog } from './locales/pt-BR';

describe('translation catalog parity', () => {
  it('keeps root and lazy case catalogs complete and non-empty', () => {
    expect(findCatalogParityErrors(enCatalog, ptBrCatalog)).toEqual([]);
    expect(findCatalogParityErrors(enCaseStudyMessages, ptBrCaseStudyMessages)).toEqual([]);
  });

  it('reports missing keys instead of silently accepting an incomplete locale', () => {
    expect(
      findCatalogParityErrors(
        { header: { action: 'Action' } },
        { header: {} },
      ),
    ).toContain('content.header.action: missing key');
  });
});
