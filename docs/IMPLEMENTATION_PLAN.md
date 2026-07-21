# Implementation Plan

## Arquitetura atual

Aplicação Next.js com Pages Router, React, TypeScript, SCSS Modules e endpoints API usados para consultar dados do GitHub. A versão e a saúde técnica serão confirmadas na auditoria.

## Arquitetura proposta

Aplicação Angular 22 standalone, conteúdo estático tipado e centralizado, home orientada a seções e rotas de estudo de caso apenas para conteúdo confirmado. Metadados, assets, testes e configuração de deploy ficarão explícitos e sem integrações decorativas.

## Fases e tarefas

| Fase | Tarefas | Dependências | Critério de aceite |
|------|---------|--------------|--------------------|
| 0 | Ler fontes, inspecionar imagens, criar controles, preservar worktree | — | Estado inicial consistente e retomável |
| 1 | Auditoria, GitHub e baseline | 0 | Auditoria documentada e falhas pré-existentes separadas |
| 2 | Estratégia de produto, conteúdo e IA | 1 | Conteúdo verdadeiro, centralizável e pendências registradas |
| 3 | Design system | 1, insumos de 2 | Tokens e comportamento responsivo/a11y definidos |
| 4 | Arquitetura Angular 22 | 1–3 | Estrutura simples, tipada, testável e implantável |
| 5–9 | Implementação e acabamento | 4 | Home completa, projects/IA integrados, sem links falsos |
| 10–11 | SEO, performance, a11y e responsividade | 5–9 | Requisitos técnicos verificados e problemas corrigidos |
| 12 | Testes e build | 10–11 | Comandos reais passam ou falhas externas são documentadas |
| 13 | Revisão, correção e entrega | 12 | Critérios finais atendidos e memória exata |

## Caminhos críticos

Auditoria → conteúdo/design → arquitetura Angular 22 → shell e dados → integração das seções → QA → build → revisão final.

## Tarefas paralelizáveis

Após a auditoria: estratégia de conteúdo, GitHub/projetos, IA, análise visual e análise preliminar de SEO/acessibilidade, desde que cada agente produza artefato próprio e não altere os mesmos arquivos.

## Riscos

- Migração integral de Next.js para Angular 22 pode invalidar scripts/deploy antigos.
- Dados profissionais podem não estar confirmados localmente; conteúdo incompleto deve ser ocultado.
- Projetos privados não podem receber links ou resultados inventados.
- Métricas Lighthouse dependem de navegador/servidor disponível no ambiente.

## Ordem de integração

1. Baseline e auditoria.
2. Modelo de conteúdo e design tokens.
3. Workspace Angular 22 e configuração.
4. Layout e componentes compartilhados.
5. Home e conteúdo confirmado.
6. Estudos de caso confirmados.
7. SEO/assets.
8. QA e correções.
9. Documentação e validação final.

## Critérios de aceite

Aplicação Angular 22; build, typecheck, lint e testes passando; foto real; links oficiais; conteúdo sem invenção; a11y, responsividade, SEO e performance validados; documentação e memória atualizadas.

