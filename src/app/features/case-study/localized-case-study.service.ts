import { computed, inject, Injectable } from '@angular/core';

import { LanguageService } from '@core/i18n/language.service';
import { LocalizedContentService } from '@core/i18n/localized-content.selectors';
import {
  createApexLapCoachCase,
  createApexLapCoachEvidence,
} from './apexlap-coach.content';
import { CaseStudyMessages, enCaseStudyMessages } from './i18n/en';
import { ptBrCaseStudyMessages } from './i18n/pt-BR';

const caseMessagesByLanguage = {
  en: enCaseStudyMessages,
  'pt-BR': ptBrCaseStudyMessages,
} as const satisfies Readonly<Record<string, CaseStudyMessages>>;

@Injectable()
export class LocalizedCaseStudyService {
  private readonly language = inject(LanguageService);
  private readonly content = inject(LocalizedContentService);

  readonly messages = computed(
    () => caseMessagesByLanguage[this.language.activeLanguage()],
  );
  readonly project = computed(() =>
    createApexLapCoachCase(
      this.messages(),
      this.content.messages().seo.apexLap,
      this.content.portfolio().projects.value.items[0],
    ),
  );
  readonly sources = computed(() =>
    createApexLapCoachEvidence(this.messages(), this.project()),
  );
}
