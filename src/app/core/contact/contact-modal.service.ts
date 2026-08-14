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
