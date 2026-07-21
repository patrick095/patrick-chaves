# Auditoria do portfólio atual

Auditoria read-only realizada em 21 de julho de 2026. O estado descrito como “local” corresponde ao commit `7f5b083` na branch `feat/novo-portifolio`; a aplicação e as dependências não foram alteradas.

## Resumo executivo

O repositório local é um portfólio em Next.js 11, React 17 e TypeScript 4.4 criado em 2021. A base é pequena e compreensível, mas a interface, o conteúdo, a integração com o GitHub e a toolchain estão defasados para o posicionamento atual. Lint e typecheck passam. O build não funciona no Node 22.22.3 por incompatibilidades da toolchain antiga, mas compila completamente no Node 16.20.2.

A versão publicada não é idêntica ao commit local: o HTML observado em `https://www.patrickchaves.com.br/` contém conteúdo, dependências e metadados mais recentes que os arquivos auditados. Antes de substituir produção, é necessário identificar a origem/deployment atual e preservar apenas conteúdo confirmado.

## Inventário atual

### Stack e configuração

- Next.js `11.1.2`, Pages Router, React/React DOM `17.0.2`, TypeScript `4.4.4` em modo `strict` e Sass Modules.
- Material UI v4 é usado para dois ícones; Axios faz as chamadas HTTP; `dotenv` é carregado nas rotas de API; `next-sitemap` gera sitemap e robots no `postbuild`.
- Scripts: `dev`, `build`, `start` e `lint`. Não existem scripts de teste ou typecheck dedicados.
- `next.config.js`: React Strict Mode, locale único `pt-br` e domínio i18n `patrickchaves.com.br` sem `www`.
- `next-sitemap.js`: URL canônica configurada como `https://www.patrickchaves.com.br`, divergente do domínio i18n.
- Não há `engines`, `.nvmrc`, workflow de CI, testes, configuração Vercel versionada ou regras de redirect no repositório.

### Estrutura e componentes

- `src/pages`: home, currículo, contato, “portifolio” e rota `/api/gitlanguage`.
- `src/components/pageDefault`: shell, navegação lateral/direita, menu mobile e footer.
- `src/components/leftBar`: foto, disponibilidade, links sociais, currículo e linguagens do GitHub.
- `src/components/language`: barra e contador percentual de linguagem.
- `src/pages/api`: integração GitHub e cálculo agregado de linguagens. Arquivos auxiliares dentro de `pages/api` são tratados pelo Next como endpoints; o build lista cinco rotas de API, embora apenas `gitlanguage.ts` seja um handler intencional.
- O conteúdo está hardcoded nos componentes, sem camada editável centralizada.

### Assets e conteúdo reaproveitável

- `public/perfil.jpeg`: foto JPEG de 914 × 823, com metadados de 2021. Pode servir apenas como fallback após validação de autorização/atualidade.
- `docs/references/profile.png`: referência de perfil fornecida, 1086 × 1448; candidata preferencial, sujeita à decisão visual.
- `docs/references/portfolio-reference.png`: referência visual fornecida, 1024 × 1536.
- `public/js-ts.png`: banner usado na home. A estética de código/terminal conflita com a direção premium solicitada.
- `public/github.png` e `public/vercel.svg`: não são referenciados no código atual.
- Links oficiais confirmados no briefing e já presentes: GitHub, LinkedIn e e-mail. O link do Google Drive para o CV local precisa ser reconfirmado, pois a produção observada usa outro ID.
- Textos locais de formação e skills são históricos e inconsistentes com a produção/briefing; devem ser tratados como fonte secundária, não como verdade atual.

## Problemas encontrados

### Produto e conteúdo

- A apresentação usa código fictício, tags como `<About>`, barras percentuais e lista bruta de repositórios; isso prioriza efeito visual/tecnologias em vez de decisões, arquitetura e resultados.
- A home local afirma “28 anos”, João Pessoa, mais de quatro anos e foco Front-end. São dados datados e não devem ser migrados sem confirmação.
- “Javascript Developer / Fullstack”, footer `© 2021`, formação “Atual” e conteúdo do CV estão desatualizados.
- A página de projetos busca e exibe automaticamente todos os repositórios, incluindo forks e projetos incompletos, sem descrição, curadoria, loading ou tratamento de erro.
- `placarvolei.com.br` e `univolei.com.br` não resolveram DNS na consulta de 21/07/2026; não devem permanecer como demos sem validação.

### Engenharia e integrações

- Next 11, React 17, Material UI v4, Axios 0.23 e TypeScript 4.4 estão defasados. `npm audit` encontrou 34 vulnerabilidades no grafo instalado: 1 baixa, 9 moderadas, 14 altas e 10 críticas. A correção exige atualização planejada, não `npm audit fix --force` às cegas.
- `package.json` e o pacote raiz do lockfile têm nomes diferentes (`patrick-chaves` e `portifolio`).
- `@material-ui/core` não é importado diretamente; `dotenv` é redundante em runtime Next na forma atual; ambos devem ser reavaliados na reconstrução. `@material-ui/icons`, Axios e `next-sitemap` têm uso confirmado no legado.
- Há `any` recorrente em respostas/repositórios e tipagem de erros inconsistente, apesar de `strict: true`.
- `calcAllReposLanguages` dispara uma chamada por repositório, pode ficar pendente com lista vazia e trata respostas de erro como objetos de linguagens. A agregação mede bytes públicos do GitHub, não proficiência.
- `createInstance` possui lógica de autenticação ambígua e pode enviar `Authorization: token undefined`. O endpoint depende de `GIT_TOKEN`; não há contrato/env example nem tratamento robusto no cliente.
- A página de projetos chama a API pública diretamente no browser, sem paginação, timeout, retry ou fallback. A barra lateral chama a API interna em toda visita.
- A navegação e os accordions manipulam DOM/classes diretamente em vez de estado semântico. Há typo `getGitLanuages`, `toogleNotification` e `rel="... noopner"`.
- Não há telemetria própria confirmada, formulário/backend de contato ou outras integrações além de GitHub, Google Drive e links externos.

### SEO, domínio e deploy

- Localmente há apenas `title`, viewport e description genérica. Faltam canonical, Open Graph, Twitter Cards, favicon/manifest modernos, JSON-LD, metadados por página e uma estratégia explícita de indexação.
- O documento não define `lang` no HTML. A descrição local ainda posiciona Patrick como “Fullstack javascript”.
- `public/sitemap.xml` local tem `lastmod` de 2021 e inclui rotas legadas; `robots.txt` aponta para `www`.
- Em 21/07/2026, HTTP e HTTPS sem `www` redirecionaram para `https://www.patrickchaves.com.br/`; a resposta final foi `200`. Os headers evidenciam Cloudflare na borda e Vercel na origem (`x-vercel-*`). Essas regras não estão versionadas neste repositório.
- O sitemap publicado aponta para `sitemap-0.xml`, com `lastmod` de 2024. A produção renderizada contém experiências e versões de dependências ausentes no commit local, confirmando drift entre código local e deploy.

### Acessibilidade

- Menu, notificação e títulos de projetos clicáveis são `div`/`h2` sem botão, teclado, nome/estado acessível ou foco gerenciado.
- A notificação não usa `aria-live`; o menu não expõe `aria-expanded`/`aria-controls`; não há skip link.
- A foto usa alt genérico `profile-image`; SVGs decorativos não têm política consistente; headings não formam uma hierarquia editorial clara.
- Não há estilos de `:focus-visible`. Interações dependem de hover/click e cores.
- Combinações como `#6d6d6d` sobre `#292929` têm risco alto de contraste insuficiente; é necessária medição WCAG no novo design.
- Animações contínuas (`writing`, pulse, contadores) não respeitam `prefers-reduced-motion`.
- Barras de idioma/percentuais não têm significado semântico e representam uma métrica inadequada.

### Responsividade e performance

- Layout usa `100vh`, scroll aninhado e sidebar fixa de 320 px; há apenas um breakpoint principal em 800 px. Tablets, telas baixas, zoom e orientação landscape não têm tratamento dedicado.
- Fontes em `vw`, larguras fixas e menu mobile estreito podem produzir texto pequeno, clipping e perda de contexto.
- O overlay mobile referencia classes inconsistentes (`centershadow`, `active`, `activeCenter`) e não fecha/gerencia foco de forma acessível.
- A tela depende de chamadas GitHub após hidratação; falhas deixam áreas vazias. A página de projetos aumenta o custo e a instabilidade sem benefício editorial.
- Build Node 16 reportou First Load JS compartilhado de 103 kB. A reconstrução deve eliminar Material UI/Axios quando APIs nativas e ícones locais bastarem, otimizar imagem e manter conteúdo principal estático.

## Baseline e falhas pré-existentes

Ambiente: macOS, Node `22.22.3`, npm `10.9.8`; diagnóstico adicional com Node `16.20.2`, npm `8.19.4`. O ambiente possui `NODE_TLS_REJECT_UNAUTHORIZED=0`; todos os comandos Node emitiram alerta de TLS inseguro. Isso é externo ao repositório e deve ser corrigido no ambiente/CI.

| Comando | Resultado |
|---|---|
| `npm ls --depth=0` antes da instalação | Falhou: todas as 13 dependências declaradas estavam ausentes. |
| `npm ci` | Passou; 553 pacotes instalados, 554 auditados; 34 vulnerabilidades. Lockfile permaneceu sem diff. |
| `npm run lint` | Passou, sem warnings ou erros. |
| `npx tsc --noEmit` | Passou, sem saída. |
| `npm run build --ignore-scripts` no Node 22 | Falhou com `ERR_OSSL_EVP_UNSUPPORTED` no Webpack antigo. `--ignore-scripts` evitou reescrever sitemap/robots via `postbuild`. |
| `NODE_OPTIONS=--openssl-legacy-provider npm run build --ignore-scripts` no Node 22 | Avançou, mas falhou ao carregar `squoosh/mozjpeg_node_dec.wasm` para `public/perfil.jpeg`. |
| `nvm exec 16 npm run build --ignore-scripts` | Passou: compilação e 12 páginas geradas. O build expôs cinco arquivos auxiliares de `pages/api` como rotas. |
| Testes | Não executados: não existe script `test` nem arquivos de teste no repositório. |

Todas as falhas acima precedem qualquer implementação desta iniciativa.

## Preservar, substituir e remover

Preservar após confirmação: domínio e URLs oficiais; intenção de contato por e-mail; foto de referência; formação e experiências apenas quando validadas; sinais técnicos verificáveis dos projetos públicos; configuração TypeScript estrita; princípio de site estático e rápido.

Substituir: shell inteiro, navegação, conteúdo hardcoded, SEO, identidade visual, página automática de repositórios, integração runtime de linguagens e arquitetura de dados.

Remover: terminal/código fictício, percentuais de linguagem, pulse de disponibilidade, lista indiscriminada de GitHub, idade/localização datadas, links mortos, assets não usados, endpoints auxiliares expostos e dependências legadas sem necessidade.

## Decisões técnicas e arquitetura proposta

- A reconstrução em Angular 22 é requisito explícito do produto e tem benefício claro: alinha a vitrine à especialidade principal e remove uma stack Next 11 com vulnerabilidades e incompatibilidade de runtime. Deve ser uma substituição controlada, não atualização incremental do legado.
- Usar aplicação Angular standalone, strict, conteúdo tipado em arquivos editáveis, componentes por seção e design tokens globais. Manter conteúdo principal prerenderizado/estático; avaliar SSR/prerender do Angular para SEO antes de decidir hosting.
- Não depender da API do GitHub no carregamento. Curar poucos projetos em conteúdo local com links/fontes e atualizar deliberadamente.
- Adotar HTML semântico, WCAG 2.2 AA, `prefers-reduced-motion`, navegação completa por teclado, foco visível e breakpoints orientados ao conteúdo.
- Centralizar metadados, canonical `www`, sitemap/robots gerados no pipeline e JSON-LD `Person`/`WebSite` apenas com fatos confirmados.
- Definir Node suportado, scripts `lint`, `typecheck`, `test` e `build`, CI e testes de navegação, links, menu mobile e acessibilidade.
- Confirmar o projeto Vercel/Cloudflare atualmente ligado ao domínio antes do corte; documentar redirects e rollback.

## Plano de implementação

1. Congelar fontes confirmadas e resolver pendências de conteúdo, foto, CV, Chaves Solutions, cases e deploy atual.
2. Criar base Angular 22 strict, conteúdo tipado, tokens, layout e navegação sem transportar dependências legadas.
3. Implementar hero, credenciais, cases curados, capacidades, IA, princípios e contato com progressive enhancement.
4. Implementar SEO/prerender, sitemap, robots, imagens responsivas e política de motion.
5. Cobrir componentes críticos, menu, rotas, links e a11y; validar lint/typecheck/test/build em Node fixado.
6. Fazer QA em mobile/tablet/desktop, validar links externos e comparar produção; publicar com redirect/rollback documentados.

## Fontes e pendências

Fontes consultadas: código/configuração local; [perfil público do GitHub](https://github.com/patrick095); [API pública do usuário](https://api.github.com/users/patrick095); [API pública de repositórios](https://api.github.com/users/patrick095/repos?per_page=100&sort=updated); [site publicado](https://www.patrickchaves.com.br/); [robots publicado](https://www.patrickchaves.com.br/robots.txt); [sitemap publicado](https://www.patrickchaves.com.br/sitemap.xml).

Pendências que não podem ser inferidas: fonte exata do deploy atual; acesso Vercel/Cloudflare; confirmação de conteúdo profissional e métricas; estado/licença de cases privados; URL atual do CV; autorização/foto final; analytics desejado; política de privacidade; disponibilidade real; destino dos links de Chaves Solutions.
