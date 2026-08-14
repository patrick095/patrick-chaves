import { isDevMode } from '@angular/core';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';

export class ReportMissingTranslationHandler extends MissingTranslationHandler {
  override handle({ key }: MissingTranslationHandlerParams): string {
    if (isDevMode()) console.error(`[i18n] Missing translation: ${key}`);
    return '';
  }
}
