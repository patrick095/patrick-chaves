# Melhorias recomendadas para o GitHub público

Consulta pública realizada em 21 de julho de 2026. Nenhum repositório externo foi alterado. Datas, contagens e campos abaixo são retratos da API nessa data, não métricas permanentes.

## Diagnóstico do perfil

O perfil [patrick095](https://github.com/patrick095) tem nome “Patrick Chaves”, avatar e 55 repositórios públicos. Bio, empresa, localização e site estão vazios na API. Há 14 seguidores e 17 perfis seguidos; esses números não são relevantes para o portfólio e não devem virar prova social.

Dos 55 repositórios, 44 são próprios e 11 forks; nenhum está arquivado. Quarenta e um não têm descrição, 37 não têm homepage, 54 não têm topics e 39 não apresentam licença reconhecida pela API. A linguagem principal detectada é TypeScript em 25 repositórios, JavaScript em 13 e nenhuma linguagem em 13. Esses totais descrevem arquivos públicos, não senioridade ou domínio técnico.

Existe o repositório especial [patrick095/patrick095](https://github.com/patrick095/patrick095), porém seu README contém apenas “Olá, me chamo Patrick Chaves”.

## Curadoria recomendada

Não exibir automaticamente todos os repositórios. O portfólio deve usar cases confirmados; GitHub entra como evidência complementar.

| Repositório | Evidência pública | Recomendação |
|---|---|---|
| [ApexLap-Coach](https://github.com/patrick095/ApexLap-Coach) | Projeto TypeScript recente; README descreve app Electron/React que transforma telemetria de iRacing em feedback de voz, com guias de usuário, negócio, QA e desenvolvimento, testes/typecheck e workflow de release. | Melhor candidato a destaque após adicionar descrição, topics, licença, screenshots/demo e esclarecer autoria, estado e o que pode ser exposto. Não inventar adoção ou resultados. |
| [rune-wars](https://github.com/patrick095/rune-wars) | Projeto TypeScript recente com Angular 19, Phaser, NestJS, PostgreSQL/TypeORM, Redis e Socket.IO; README e documentação extensa descrevem arquitetura e roadmap. | Bom case de produto/arquitetura em construção. Marcar claramente como projeto em desenvolvimento; adicionar resumo visual, quick start, status executável, licença e CI. |
| [git-changes](https://github.com/patrick095/git-changes) | Atualizado em 20/07/2026; Express/TypeScript para gerar relatório de alterações. README explica configuração, mas não há descrição/topics/licença e o script de teste é placeholder. | Só destacar após revisão de privacidade, nomenclatura, screenshots, testes e explicação neutra do problema. O README cita organização/processo corporativo e solicita scopes amplos de token clássico. |
| [angular-dynamic-form](https://github.com/patrick095/angular-dynamic-form) | Demonstra Angular 15, Reactive Forms e Factory para formulários dinâmicos/dependentes. README explica a intenção técnica. | Amostra secundária de Angular; atualizar versão, adicionar demo/testes/screenshot e explicar decisões/trade-offs antes de fixar. |
| [organizer-angular](https://github.com/patrick095/organizer-angular) + [organizer-service](https://github.com/patrick095/organizer-service) | Frontend/backend de 2022 com badges de lint/teste e README de endpoints; demo Angular respondeu 200 na consulta. | Manter como histórico, não como principal prova de senioridade. Atualizar status, remover linguagem casual, testar demo/API e consolidar narrativa se continuar mantido. |

### Não destacar agora

- [desafio-fullstack](https://github.com/patrick095/desafio-fullstack): a árvore pública tem apenas README e licença com a especificação do desafio, sem implementação.
- [orquestrados-rpa](https://github.com/patrick095/orquestrados-rpa): repositório pequeno, sem README, descrição, licença ou testes reais.
- [time-ly-challenge](https://github.com/patrick095/time-ly-challenge): bom README histórico com screenshots e cobertura declarada, mas é um teste de vaga de 2022 e a homepage retornou 404 em 21/07/2026.
- `patrick-chaves` e `portifolio`: versões legadas do próprio site, úteis como histórico, não como projetos principais.
- Forks, cursos, revisões, clones, repositórios vazios e desafios antigos: não fixar como trabalho autoral. Arquivar quando abandonados ou documentar claramente a finalidade histórica.

## Plano de melhoria priorizado

### Prioridade 0 — segurança e contexto

1. Executar secret scanning no histórico dos 55 repositórios e revisar `.env`, dumps, chaves, tokens, dados pessoais e nomes/processos internos. A auditoria atual não prova ausência de segredos.
2. Revisar `git-changes`: remover/reformular exemplos corporativos, trocar instruções de token clássico com scopes `repo`, `user` e `project` por fine-grained token de menor privilégio e explicar armazenamento/rotação segura.
3. Definir visibilidade adequada para projetos que contenham material de cliente/empregador; público não significa automaticamente autorizado para case.

### Prioridade 1 — perfil e pins

1. Preencher bio curta e factual, por exemplo: “Senior Full Stack Engineer • Tech Lead • Angular, Java/Quarkus, Node.js/NestJS • Building products at Chaves Solutions”. Ajustar somente após confirmação do título e empresa.
2. Adicionar localização e site `https://patrickchaves.com.br` se Patrick quiser torná-los públicos; não inferir local atual.
3. Reconstruir o Profile README com proposta de valor, stack principal, foco em produto/arquitetura, 2–4 cases curados e contatos. Evitar grids extensos de badges, contadores e gráficos de linguagens.
4. Fixar no máximo 4–6 itens, priorizando ApexLap Coach, Rune Wars e somente projetos maduros após as correções. Não fixar forks, cursos, clones ou desafios incompletos.

### Prioridade 2 — higiene dos repositórios

1. Adicionar descrições objetivas, topics e homepage apenas quando funcional. Hoje 41/55 não têm descrição e 54/55 não têm topics.
2. Definir estado explícito em cada README: ativo, experimental, arquivado ou histórico. Nenhum dos 55 está marcado como arquivado, embora muitos não recebam push desde 2020–2023.
3. Arquivar repositórios vazios/inacabados como `organizer-mail-service`, `organizer-item-service` e `e-commerce-api-java`, ou completar/documentar se houver plano real.
4. Padronizar nomes gradualmente: corrigir “portifolio”, casing inconsistente (`ReactApp`, `Organizer`, `curso-typeScript`) e nomes genéricos. Preservar redirects do GitHub ao renomear.
5. Adicionar licença somente quando Patrick detiver os direitos e escolher conscientemente os termos. Ausência de licença não deve ser corrigida automaticamente.

### Prioridade 3 — padrão mínimo de README e qualidade

Cada projeto candidato a pin deve conter:

- problema e público-alvo;
- status/manutenção e autoria;
- screenshots ou GIF curto com alt text;
- arquitetura e principais decisões/trade-offs;
- stack confirmada e estrutura;
- pré-requisitos, instalação, variáveis de ambiente sem valores e comandos reproduzíveis;
- testes, lint, build e CI;
- demo funcional ou remoção do link quebrado;
- limitações, roadmap e licença.

Configurar CI quando fizer sentido para lint, typecheck, testes e build. Dependabot/Renovate, CodeQL e branch protection podem ser adicionados primeiro aos projetos ativos. Badges só devem apontar para workflows reais e atuais.

## Ajustes específicos dos melhores candidatos

### ApexLap Coach

- Adicionar description/topics (`typescript`, `electron`, `react`, `telemetry`, quando corretos), hero screenshot e status/plataformas suportadas.
- Resumir no README a arquitetura Electron + React, SQLite e integração de telemetria; manter detalhes nos guias já existentes.
- Explicar a presença da integração OpenAI apenas no nível publicamente seguro; não afirmar que todo feedback usa IA sem evidência.
- Publicar licença ou declarar “source available/no license” conscientemente; documentar releases e checks do workflow.

### Rune Wars

- Expor uma captura ou vídeo curto do vertical slice e separar “implementado” de “planejado”. O README atual mistura visão ampla e instruções para agentes.
- Criar quick start real via Docker, matriz de serviços e CI para frontend/backend.
- Atualizar a apresentação quando migrar do Angular 19; não usar o repositório como evidência de Angular 22 antes disso.
- Adicionar description/topics/licença e uma página de arquitetura enxuta para recrutadores.

### Git Changes

- Renomear para refletir GitHub e finalidade genérica, ou explicar suporte GitHub/GitLab sem contradições.
- Adicionar screenshots, modelo de dados, threat model de tokens e uso de fine-grained PAT/OAuth com menor privilégio.
- Substituir o teste placeholder por testes reais; adicionar lint/typecheck e CI.
- Remover instruções e exemplos específicos de organização/processo antes de promover o projeto.

## Uso no novo portfólio

Até os candidatos terem documentação, licença/status e confirmação do proprietário, usar GitHub como link de perfil e apresentar cases editoriais com fatos aprovados. Não usar estrelas, tamanho do repositório, quantidade de linguagens ou datas de update como métricas de impacto. Links de demo devem ser checados no build/CI para evitar reincidência de 404/DNS.

## Fontes públicas consultadas

- [Perfil](https://github.com/patrick095) e [API do usuário](https://api.github.com/users/patrick095)
- [API dos repositórios, ordenada por atualização](https://api.github.com/users/patrick095/repos?per_page=100&sort=updated)
- READMEs e metadados dos repositórios linkados na curadoria
- Endpoints públicos de árvore, linguagens e conteúdo da API GitHub para os candidatos

A GitHub CLI não estava instalada (`gh: command not found`); por isso a coleta usou a API pública, sem autenticação. A API não expõe diretamente os repositórios fixados; a seleção atual de pins deve ser conferida manualmente no perfil antes de executar a reorganização.
