# Sincronizar conteúdo do site com `example/` e adicionar seção Stats

## Contexto

`example/` (`index.html`, `style.css`, `script.js`) é um protótipo estático bilíngue que o usuário
aprovou como fonte da verdade de conteúdo (textos, projetos, trajetória, stack, formação, idiomas)
para o portfólio Angular em `src/`. O site atual diverge do `example/` em vários pontos:

- Não existe seção **Stats** (anos de experiência, setores, tecnologias, empresa fundada).
- **Projetos**: o site atual só suporta 1 projeto, o "ApexLap Coach", com um sistema de dados
  rígido (`Evidenced<T>`, `ProjectEvidenceId`, case study dedicado em `/projetos/apexlap-coach`).
  O `example/` lista 4 projetos diferentes (nenhum é o ApexLap Coach) sem esse aparato de evidência.
- **Tecnologias**: o site atual tem 3 entradas soltas (Angular, Java/Quarkus, Node/NestJS); o
  `example/` tem 4 grupos com várias tags cada (Frontend, Backend, Dados & Infra, Processo & Qualidade).
- **Princípios**: o site atual tem uma seção "Princípios" com 5 itens detalhados (título +
  descrição); o `example/` tem uma seção "Como eu trabalho" enxuta, com 6 chips curtos.
- **Trajetória**: título de cargo, período e destaques da Stefanini e da Chaves Solutions divergem
  do `example/`; não existem as subseções Formação e Idiomas.
- Existe uma seção **Atuação** ("Sobre") no site atual sem equivalente no `example/`.

## Decisões já validadas com o usuário

1. **Projetos**: substituir o conteúdo da seção Projetos pelos 4 projetos do `example/`
   (Plataforma de rentabilidade, Plataforma Grupo Parvi, Sigfácil, PlacarVolei). O projeto
   ApexLap Coach — e sua página de case study dedicada (`/projetos/apexlap-coach`, pipeline,
   decisões técnicas, diagrama) — é **removido por completo**, pois não consta no `example/`.
2. **Anos de experiência**: o texto do Hero continua dizendo "mais de 6 anos" (não mexe). O
   card de Stats mostra **"6+"** (não "5+" como no example), para não contradizer o Hero.
3. **Trajetória**:
   - Sincronizar títulos de cargo, contexto e destaques da Stefanini, Chaves Solutions e Vox com
     o texto do `example/`.
   - Chaves Solutions: período passa a **"mar. 2024 — jun. 2026"** (sem "atual"), conforme o
     `example/` — a data já passou (hoje é 14/08/2026), então o cargo de Founder é tratado como
     encerrado.
   - **PlacarVolei continua na timeline de Trajetória** (o `example/` só lista PlacarVolei como
     projeto, não como trajetória, mas o usuário pediu para manter como está hoje).
   - Adicionar **Formação** (3 itens) e **Idiomas** (2 itens) dentro da seção Trajetória, como no
     `example/`.
4. **Estrutura/ordem das seções da home**: adotar a ordem do `example/`:
   `Hero → Stats → Projetos → Tecnologias → Princípios (formato chips) → Trajetória → Contato`.
   - A seção **Atuação (Sobre)** é **removida** (não existe no `example/`).
   - **Princípios** deixa de ter 5 itens detalhados e passa a ser a seção enxuta "Como eu
     trabalho" (eyebrow + título + subtítulo + 6 chips), como no `example/`.
5. **Pill de disponibilidade** ("Disponível para novos desafios"): **fora de escopo**, não é
   ativado nesta mudança.

## Modelo de dados (`content.models.ts`)

Mudanças:

- **Remover** todo o aparato de evidência específico do ApexLap: `Evidenced<T>`,
  `ProjectEvidenceId`, `ProjectEvidence`, `ProjectSlug`, `ProjectRoute`, `ProjectLink` /
  `ProjectExternalLink` / `ProjectInternalLink`, `ProjectPipelineStep`, `ProjectDecision`,
  `ProjectSummaryContent`, `ProjectCaseContent`. Nenhum projeto novo precisa dessas garantias
  (o `example/` não linka case studies, repositórios nem releases nos cards de projeto).
- **Novo `ProjectItem`**:
  ```ts
  interface ProjectItem {
    readonly id: string;
    readonly title: string;
    readonly tag: string; // ex.: "Bancário", "Govtech", "Projeto pessoal"
    readonly description: string;
    readonly technologies: readonly string[];
  }
  ```
- **`ProjectsContent extends SectionIdentity`** passa a ter `items: readonly ProjectItem[]`
  (mínimo 4, sem restrição de tamanho fixo). Remove `documentedTechnologiesLabel` do texto
  visível (vira só `aria-label` da lista de tecnologias, reaproveitando a mesma chave de tradução).
- **Novo `TechnologyGroup`**:
  ```ts
  interface TechnologyGroup {
    readonly id: string;
    readonly label: string; // "Frontend", "Backend", "Dados & Infra", "Processo & Qualidade"
    readonly tags: readonly string[];
  }
  ```
  `TechnologyContent extends SectionIdentity { groups: readonly TechnologyGroup[] }` (substitui o
  formato antigo `{category, name, context}`).
- **`PrinciplesContent`** passa a:
  ```ts
  interface PrinciplesContent extends SectionIdentity {
    readonly subtitle: string;
    readonly items: readonly string[]; // chips curtos
  }
  ```
- **Novo `EducationItem` / `LanguageItem`**, adicionados dentro de `ExperienceContent`:
  ```ts
  interface EducationItem { readonly degree: string; readonly institution: string; readonly period: string; }
  interface LanguageItem { readonly name: string; readonly level: string; }

  interface ExperienceContent extends SectionIdentity {
    readonly items: readonly ExperienceItem[];
    readonly resumePrompt: string;
    readonly resumeAction: string;
    readonly educationLabel: string;
    readonly education: readonly EducationItem[];
    readonly languagesLabel: string;
    readonly languages: readonly LanguageItem[];
  }
  ```
- **Novo `StatsContent`** (seção sem heading, só tiles):
  ```ts
  interface StatItem { readonly id: string; readonly value: string; readonly label: string; }
  interface StatsContent { readonly items: readonly StatItem[]; }
  ```
- **`PortfolioContent`**: remove `summary`; adiciona `stats: PublishedSection<StatsContent>`.

## Conteúdo (i18n) — `pt-BR` e `en`

Ambos os catálogos (`locales/pt-BR/home.ts`, `locales/en/home.ts`) recebem as mesmas mudanças
estruturais, traduzidas:

- **Remove** o bloco `summary` (seção Atuação/Sobre).
- **`stats`**: 4 itens — "6+ Anos de experiência", "3 Setores atendidos", "20+ Tecnologias no dia
  a dia", "1 Empresa fundada" (equivalentes em inglês).
- **`experience`**:
  - Stefanini: cargo passa a "Full Stack Developer — Angular + Java/Quarkus" (remove "Analista
    Desenvolvedor Pleno"); destaques reescritos para citar a plataforma de análise de
    rentabilidade de um dos maiores bancos da América Latina, tabelas gerenciais densas, filtros
    em duas camadas, drill-down organizacional (conforme `example/`).
  - Chaves Solutions: período "mar. 2024 — jun. 2026"; destaques citam a liderança de equipe de
    3 a 6 devs e o cliente Grupo Parvi (120+ concessionárias, 14 estados).
  - Vox: mantém como está hoje (já bate com o `example/`).
  - PlacarVolei: mantém como item de trajetória (decisão do usuário), sem mudança de conteúdo.
  - Adiciona `education` (Tecnólogo em Sistemas para Internet — Estácio 2021–2023; Licenciatura em
    Educação Física — UNIASSELVI 2018–2019; Licenciatura em Educação Física — Centro Universitário
    de João Pessoa 2014–2017) e `languages` (Português — Nativo; Inglês — Intermediário).
- **`projects`**: substitui `apexLap` pelos 4 projetos do `example/`: Plataforma de rentabilidade
  (Bancário), Plataforma Grupo Parvi (Cliente · Varejo), Sigfácil — Integrador REDESIM (Govtech),
  PlacarVolei (Projeto pessoal), com textos e listas de tecnologias do `example/`.
- **`technologies`**: 4 grupos — Frontend (Angular, TypeScript, RxJS, Design Systems, Arquitetura
  Front-End), Backend (Node.js, NestJS, Java, Quarkus, TypeORM, REST APIs), Dados & Infra
  (PostgreSQL, MongoDB, Docker, Kubernetes, CI/CD), Processo & Qualidade (Jest, Cypress,
  Playwright, Git · GitHub · GitLab, Metodologias Ágeis, BI / Data Viz).
- **`principles`** (chips): eyebrow "Como eu trabalho" *(nome de seção continua "Princípios" na
  navegação/rota `#principios` para não quebrar o link já existente)*, subtítulo "Times ágeis,
  arquitetura pensada para durar e entregas que fazem sentido para o negócio.", chips: Código
  limpo, Arquitetura escalável, Entrega contínua, Liderança de times ágeis, Foco nas regras de
  negócio, Design systems compartilhados.
- **`seo.ts`**: remove as chaves de SEO específicas do case study do ApexLap.

## Componentes Angular

- **Nova feature `stats`**: `src/app/features/stats/stats-section.component.{ts,html,scss}` —
  grid de 4 tiles (`value` grande + `label`), sem heading de seção (mesmo estilo do `.stats-wrap`
  do `example/`). Usa `app-container` para alinhar com o resto do layout.
- **`projects-section` / `project-card`**: simplifica o template — sem `eyebrow`/`status`/links de
  case-study/repositório (o `example/` não linka nada nos cards); mostra `tag` como badge no
  cabeçalho do card, `description`, lista de `technologies` como tags.
- **`technologies-section`**: passa a iterar `groups` renderizando `label` + lista de `tags`
  (chips), em vez de `category/name/context` por item.
- **`principles-section`**: template simplificado para eyebrow + título + subtítulo + `tag-row` de
  chips (sem cards title/description).
- **`experience-section`**: adiciona blocos de Formação e Idiomas ao final (equivalente ao
  `.foot-cols` do `example/`), reaproveitando o layout de lista existente onde fizer sentido.
- **`home-page.component.html`**: remove `<app-professional-summary>`, adiciona
  `<app-stats-section>` logo após o Hero, reordena para
  Hero → Stats → Projetos → Tecnologias → Princípios → Trajetória → Contato.
- **Remover por completo**: `features/professional-summary/**`, `features/case-study/**`
  (componente, service, i18n, spec), rota `/projetos/apexlap-coach` em `app.routes.ts` e
  `app.routes.server.ts`, `caseStudySeo` em `seo.selectors.ts`, entradas de sitemap relacionadas.

## Navegação e links

- `LocalizedContentService.navigation` deixa de incluir `content.summary` (seção removida).
- O `LinkId` `'principles'` e a rota `#principios` continuam existindo (a seção não desaparece, só
  muda de formato).
- `resolveResumeDownload`/download de currículo não muda.

## Testes

Atualizar/remover specs que assumem a estrutura antiga:

- `content.selectors.spec.ts`: reescrever asserções (deixam de checar `apexlap-coach`,
  `ProjectEvidenceId`; passam a checar os 4 novos projetos, stats, education/languages).
- `home-page.component.spec.ts`, `projects-section.component.spec.ts`,
  `site-header.component.spec.ts`: ajustar para a nova estrutura de conteúdo.
- `case-study-page.component.spec.ts`: removido junto com a feature.
- Adicionar spec básico para `stats-section.component`.

## Fora de escopo

- Pill "Disponível para novos desafios" no Hero.
- Qualquer redesenho visual além do necessário para acomodar Stats, os novos grupos de
  Tecnologias, os chips de Princípios e os blocos de Formação/Idiomas — reaproveita o design
  system (`app-container`, `app-section-heading`, tokens de cor/tipografia) já usado pelas outras
  seções.
