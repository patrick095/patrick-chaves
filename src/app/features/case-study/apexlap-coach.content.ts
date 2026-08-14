import {
  Evidenced,
  HttpUrl,
  ProjectCaseContent,
  ProjectEvidence,
  ProjectEvidenceId,
  ProjectSummaryContent,
} from '@core/content/content.models';
import type { TranslationCatalog } from '@core/i18n/i18n.models';
import type { CaseStudyMessages } from './i18n/en';

const commitHash = '10d15d88cf539ca27220204468f2b1c098de6b32';

const evidenced = <T>(
  value: T,
  evidence: readonly [ProjectEvidenceId, ...ProjectEvidenceId[]],
): Evidenced<T> => ({ value, evidence });

export const createApexLapCoachCase = (
  messages: CaseStudyMessages,
  seoMessages: TranslationCatalog['seo']['apexLap'],
  summary: ProjectSummaryContent,
): ProjectCaseContent => {
  const apex = messages.apexLap;
  return {
    ...summary,
    headline: evidenced(apex.headline, ['APEX-02', 'APEX-04', 'APEX-05']),
    overview: {
      title: evidenced(apex.overview.title, ['APEX-04', 'APEX-05']),
      body: evidenced(apex.overview.body, ['APEX-04', 'APEX-05']),
    },
    technicalContext: {
      title: evidenced(apex.technicalContext.title, ['APEX-04', 'APEX-05']),
      body: evidenced(apex.technicalContext.body, ['APEX-04', 'APEX-05']),
    },
    pipeline: {
      title: evidenced(apex.pipeline.title, ['APEX-04']),
      steps: [
        ['capture', apex.pipeline.capture],
        ['normalization', apex.pipeline.normalization],
        ['reference', apex.pipeline.reference],
        ['segmentation', apex.pipeline.segmentation],
        ['comparison', apex.pipeline.comparison],
        ['classification', apex.pipeline.classification],
        ['persistence', apex.pipeline.persistence],
        ['voice', apex.pipeline.voice],
      ].map(([id, step]) => ({
        id: id as string,
        label: evidenced((step as { label: string }).label, ['APEX-04']),
        description: evidenced((step as { description: string }).description, ['APEX-04']),
      })),
    },
    decisions: {
      title: evidenced(apex.decisions.title, ['APEX-04', 'APEX-05', 'APEX-06']),
      items: [
        ['spatial-alignment', apex.decisions.spatialAlignment, ['APEX-05']],
        ['domain-boundary', apex.decisions.domainBoundary, ['APEX-04']],
        ['feedback-timing', apex.decisions.feedbackTiming, ['APEX-04', 'APEX-05']],
        ['local-voice', apex.decisions.localVoice, ['APEX-04']],
        ['release-gates', apex.decisions.releaseGates, ['APEX-06']],
      ].map(([id, decision, evidence]) => ({
        id: id as string,
        title: evidenced(
          (decision as { title: string }).title,
          evidence as [ProjectEvidenceId, ...ProjectEvidenceId[]],
        ),
        body: evidenced(
          (decision as { body: string }).body,
          evidence as [ProjectEvidenceId, ...ProjectEvidenceId[]],
        ),
      })),
    },
    constraints: {
      title: evidenced(apex.constraints.title, ['APEX-04', 'APEX-05']),
      body: evidenced(apex.constraints.body, ['APEX-04', 'APEX-05']),
    },
    publicStatus: {
      title: evidenced(apex.publicStatus.title, ['APEX-01', 'APEX-03', 'APEX-07']),
      body: evidenced(apex.publicStatus.body, ['APEX-01', 'APEX-03', 'APEX-07']),
    },
    diagram: {
      label: apex.diagram.label,
      accessibleName: apex.diagram.accessibleName,
      steps: [
        apex.diagram.telemetry,
        apex.diagram.normalization,
        apex.diagram.reference,
        apex.diagram.sectors,
        apex.diagram.feedbackRules,
        apex.diagram.voice,
      ],
      caption: apex.diagram.caption,
    },
    sourceEvidence: [
      'APEX-01',
      'APEX-02',
      'APEX-03',
      'APEX-04',
      'APEX-05',
      'APEX-06',
      'APEX-07',
    ],
    seo: {
      title: seoMessages.title,
      description: seoMessages.description,
      canonical: 'https://www.patrickchaves.com.br/projetos/apexlap-coach',
      locale: seoMessages.ogLocale as 'pt_BR' | 'en_US',
      language: seoMessages.language as 'pt-BR' | 'en',
      robots: 'index,follow',
      openGraphType: 'article',
    },
  };
};

export const createApexLapCoachEvidence = (
  messages: CaseStudyMessages,
  project: ProjectCaseContent,
): readonly ProjectEvidence[] => {
  const commitUrl = `${project.links.repository.href}/blob/${commitHash}` as const;
  const labels = messages.apexLap.sources;
  const evidence: Readonly<Record<ProjectEvidenceId, ProjectEvidence>> = {
    'APEX-01': {
      id: 'APEX-01',
      label: labels.repositoryApi,
      href: 'https://api.github.com/repos/patrick095/ApexLap-Coach',
    },
    'APEX-02': { id: 'APEX-02', label: labels.readme, href: `${commitUrl}/README.md` as HttpUrl },
    'APEX-03': {
      id: 'APEX-03',
      label: labels.manifest,
      href: `${commitUrl}/system/package.json` as HttpUrl,
    },
    'APEX-04': {
      id: 'APEX-04',
      label: labels.developerGuide,
      href: `${commitUrl}/docs/developer-guide.md` as HttpUrl,
    },
    'APEX-05': {
      id: 'APEX-05',
      label: labels.driverGuide,
      href: `${commitUrl}/docs/user-guide.md` as HttpUrl,
    },
    'APEX-06': {
      id: 'APEX-06',
      label: labels.releaseWorkflow,
      href: `${commitUrl}/.github/workflows/release.yml` as HttpUrl,
    },
    'APEX-07': {
      id: 'APEX-07',
      label: labels.publicRelease,
      href: project.links.release.href,
    },
  };
  return project.sourceEvidence.map((id) => evidence[id]);
};
