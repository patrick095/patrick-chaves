import { describe, expect, it } from 'vitest';

import { resolveResumeDownload } from './resume.config';

describe('resolveResumeDownload', () => {
  it('returns the cross-platform Portuguese resume alias and Unicode filename', () => {
    expect(resolveResumeDownload('pt-BR')).toEqual({
      href: '/pdfs/curriculo-patrick-chaves.pdf',
      filename: 'Currículo - Patrick Chaves.pdf',
    });
  });

  it('returns the English resume contract', () => {
    expect(resolveResumeDownload('en')).toEqual({
      href: '/pdfs/Resume%20-%20Patrick%20Chaves.pdf',
      filename: 'Resume - Patrick Chaves.pdf',
    });
  });
});
