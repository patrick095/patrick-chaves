export type VerificationStatus = 'confirmed' | 'safe-wording';
export type HttpUrl = `https://${string}`;
export type MailtoUrl = `mailto:${string}`;
export type AnchorUrl = `#${string}`;
export type HomeSectionUrl = `/#${string}`;
export type ProjectSlug = 'apexlap-coach';
export type ProjectRoute = `/projetos/${ProjectSlug}`;
export type PortfolioUrl = HttpUrl | MailtoUrl | AnchorUrl;

export type PublishedValue<T> = Readonly<{
  value: T;
  verification: VerificationStatus;
  publication: 'publish';
  evidence?: string;
}>;

export type HiddenValue = Readonly<{
  verification: 'pending';
  publication: 'hide';
}>;

export type EditorialValue<T> = PublishedValue<T> | HiddenValue;

export type PublishedSection<T> = Readonly<{
  publication: 'publish';
  value: T;
}>;

export type HiddenSection = Readonly<{ publication: 'hide' }>;
export type EditorialSection<T> = PublishedSection<T> | HiddenSection;

export type LinkId =
  | 'experience'
  | 'principles'
  | 'linkedin'
  | 'github'
  | 'email'
  | 'website';

export interface PortfolioLink {
  readonly id: LinkId;
  readonly label: string;
  readonly href: PortfolioUrl;
  readonly external: boolean;
}

export interface SiteContent {
  readonly name: string;
  readonly professionalTitle: string;
  readonly links: Readonly<Record<LinkId, PortfolioLink>>;
  readonly availableForWork: EditorialValue<boolean>;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: HomeSectionUrl;
}

export interface SectionIdentity {
  readonly id: string;
  readonly navigationLabel: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction?: string;
}

export interface HeroContent {
  readonly name: string;
  readonly professionalTitle: string;
  readonly supportingText: string;
  readonly primaryAction: LinkId;
  readonly secondaryAction: LinkId;
  readonly supportingActions: readonly [LinkId, LinkId];
  readonly professionalChannelsLabel: string;
  readonly portrait: Readonly<{
    alt: string;
    width: 1086;
    height: 1448;
  }>;
}

export interface SummaryContent extends SectionIdentity {
  readonly body: string;
  readonly points: readonly Readonly<{
    title: string;
    description: string;
  }>[];
}

export interface ExperienceRole {
  readonly title: string;
  readonly period: string;
}

export interface ExperienceItem {
  readonly id: string;
  readonly company: string;
  readonly companyPeriod: string;
  readonly context: string;
  readonly roles: readonly ExperienceRole[];
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
}

export interface ExperienceContent extends SectionIdentity {
  readonly items: readonly ExperienceItem[];
  readonly resumePrompt: string;
  readonly resumeAction: string;
}

export type ProjectEvidenceId =
  | 'APEX-01'
  | 'APEX-02'
  | 'APEX-03'
  | 'APEX-04'
  | 'APEX-05'
  | 'APEX-06'
  | 'APEX-07';

export type Evidenced<T> = Readonly<{
  value: T;
  evidence: readonly [ProjectEvidenceId, ...ProjectEvidenceId[]];
}>;

export interface ProjectEvidence {
  readonly id: ProjectEvidenceId;
  readonly label: string;
  readonly href: HttpUrl;
}

export interface ProjectLink {
  readonly label: string;
  readonly href: HttpUrl | ProjectRoute;
  readonly kind: 'case-study' | 'repository' | 'release';
  readonly external: boolean;
}

export interface ProjectExternalLink extends ProjectLink {
  readonly href: HttpUrl;
  readonly kind: 'repository' | 'release';
  readonly external: true;
}

export interface ProjectInternalLink extends ProjectLink {
  readonly href: ProjectRoute;
  readonly kind: 'case-study';
  readonly external: false;
}

export interface ProjectPipelineStep {
  readonly id: string;
  readonly label: Evidenced<string>;
  readonly description: Evidenced<string>;
}

export interface ProjectDecision {
  readonly id: string;
  readonly title: Evidenced<string>;
  readonly body: Evidenced<string>;
}

export interface ProjectSummaryContent {
  readonly slug: ProjectSlug;
  readonly privacy: 'public';
  readonly eyebrow: Evidenced<string>;
  readonly name: Evidenced<'ApexLap Coach'>;
  readonly summary: Evidenced<string>;
  readonly category: Evidenced<string>;
  readonly status: Evidenced<string>;
  readonly technologies: readonly Evidenced<
    'Electron' | 'TypeScript' | 'React' | 'SQLite'
  >[];
  readonly links: Readonly<{
    caseStudy: ProjectInternalLink;
    repository: ProjectExternalLink;
    release: ProjectExternalLink;
  }>;
}

export interface ProjectCaseContent extends ProjectSummaryContent {
  readonly headline: Evidenced<string>;
  readonly overview: Readonly<{
    title: Evidenced<string>;
    body: Evidenced<string>;
  }>;
  readonly technicalContext: Readonly<{
    title: Evidenced<string>;
    body: Evidenced<string>;
  }>;
  readonly pipeline: Readonly<{
    title: Evidenced<string>;
    steps: readonly ProjectPipelineStep[];
  }>;
  readonly decisions: Readonly<{
    title: Evidenced<string>;
    items: readonly ProjectDecision[];
  }>;
  readonly constraints: Readonly<{
    title: Evidenced<string>;
    body: Evidenced<string>;
  }>;
  readonly publicStatus: Readonly<{
    title: Evidenced<string>;
    body: Evidenced<string>;
  }>;
  readonly diagram: Readonly<{
    label: string;
    accessibleName: string;
    steps: readonly [string, string, string, string, string, string];
    caption: string;
  }>;
  readonly sourceEvidence: readonly ProjectEvidenceId[];
  readonly seo: SeoContent;
}

export interface ProjectsContent extends SectionIdentity {
  readonly documentedTechnologiesLabel: string;
  readonly items: readonly [ProjectSummaryContent];
}

export interface TechnologyContent extends SectionIdentity {
  readonly groups: readonly Readonly<{
    id: string;
    category: string;
    name: string;
    context: string;
  }>[];
}

export interface PrinciplesContent extends SectionIdentity {
  readonly items: readonly Readonly<{
    id: string;
    title: string;
    description: string;
  }>[];
}

export interface ContactContent extends SectionIdentity {
  readonly body: string;
  readonly primaryAction: LinkId;
  readonly secondaryAction: LinkId;
  readonly supportingAction: LinkId;
}

export interface SeoContent {
  readonly title: string;
  readonly description: string;
  readonly canonical: HttpUrl;
  readonly locale: 'pt_BR' | 'en_US';
  readonly language: 'pt-BR' | 'en';
  readonly robots: 'index,follow';
  readonly openGraphType: 'website' | 'article';
}

export interface PortfolioContent {
  readonly site: SiteContent;
  readonly hero: PublishedSection<HeroContent>;
  readonly summary: PublishedSection<SummaryContent>;
  readonly experience: PublishedSection<ExperienceContent>;
  readonly projects: PublishedSection<ProjectsContent>;
  readonly technologies: PublishedSection<TechnologyContent>;
  readonly principles: PublishedSection<PrinciplesContent>;
  readonly contact: PublishedSection<ContactContent>;
  readonly seo: PublishedSection<SeoContent>;
}
