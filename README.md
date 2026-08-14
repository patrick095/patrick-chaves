# Portfólio — Patrick Chaves

Portfólio profissional bilíngue reconstruído em Angular 22 para apresentar a atuação de Patrick Chaves como Desenvolvedor Full Stack Sênior e Tech Lead, com foco em arquitetura, frontend, backend, produto e liderança técnica.

## Stack

- Angular 22.0.7 com componentes standalone e templates strict;
- TypeScript 6.0.2;
- prerender estático com Angular SSR e hidratação no cliente;
- internacionalização runtime `pt-BR`/`en` com `@ngx-translate/core` e catálogos locais tipados;
- SCSS sem biblioteca visual ou fonte remota;
- Vitest para testes unitários;
- Playwright e axe-core para responsividade e acessibilidade;
- ESLint e scripts próprios para validar conteúdo, assets e artefato estático.

## Requisitos

- Node.js `22.22.3` — versão registrada em `.nvmrc` e `package.json`;
- npm `>=10.9.0 <11`.

## Desenvolvimento

```bash
npm ci
npm start
```

O servidor local do Angular fica disponível em `http://localhost:4200`.

## Validação

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
npm run verify:static
```

O gate completo é:

```bash
npm run verify
```

Os testes E2E usam `PLAYWRIGHT_CHROME_PATH` quando informado, o Google Chrome local no macOS quando disponível ou o Chromium instalado pelo Playwright como fallback.

## Conteúdo e estrutura

- contratos editoriais e links invariantes: `src/app/core/content/`;
- traduções da home, shell e SEO: `src/app/core/i18n/locales/{pt-BR,en}/`;
- traduções do estudo de caso: `src/app/features/case-study/i18n/`;
- detecção, persistência, fallback e currículos: `src/app/core/i18n/`;
- SEO e dados estruturados: `src/app/core/seo/`;
- seções da home: `src/app/features/`;
- header, footer e navegação: `src/app/layout/`;
- tokens e estilos globais: `src/styles.scss`;
- foto original autorizada: `docs/references/profile.png`;
- variantes otimizadas da foto: `public/images/`;
- estudo de caso: `src/app/features/case-study/`;
- pendências que não podem aparecer publicamente: `docs/CONTENT_PENDING.md`.

Na primeira execução no navegador, idiomas iniciados por `pt` usam `pt-BR`; os demais usam `en`. A seleção manual é salva em `localStorage` na chave `patrick-chaves.language` e passa a ter prioridade. O prerender permanece em português para garantir hidratação estável no deploy estático.

As regras editoriais e o fluxo seguro de atualização estão em [docs/content-guide.md](docs/content-guide.md).

## Build e deploy

```bash
npm ci
npm run verify
```

O site estático é gerado em `dist/patrick-chaves/browser`. Esse diretório deve ser publicado integralmente em um host estático, preservando os arquivos `index.html` das rotas prerenderizadas, `robots.txt`, `sitemap.xml`, favicons e imagens.

Configuração típica para Cloudflare Pages ou Vercel:

- build command: `npm run build`;
- output directory: `dist/patrick-chaves/browser`;
- Node.js: `22.22.3`.

O domínio observado em produção redireciona para `https://www.patrickchaves.com.br`, que é a origem canônica do SEO. A propriedade atual do projeto Vercel e da configuração Cloudflare precisa ser confirmada antes de um deploy real; consulte `docs/CONTENT_PENDING.md`. Nenhum deploy ou push é executado automaticamente por este repositório.

## Rotas

- `/` — portfólio;
- `/projetos/apexlap-coach` — estudo técnico baseado em fontes públicas verificadas.

A home apresenta uma seleção das experiências profissionais confirmadas pelos currículos autorizados. Disponibilidade, dados pessoais, projetos privados e detalhes sem fonte permanecem ocultos. Os PDFs ficam em `public/pdfs/` e o site seleciona o arquivo correspondente ao idioma ativo.
