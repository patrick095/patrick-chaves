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
