# Implementar Tudo

## Objetivo Geral

Reconstruir o portfólio em Angular 22, com conteúdo verificável e qualidade premium de frontend, seguindo `docs/AGENT.md`, `docs/ADICIONAL.md` e as referências.

## Estratégia

Executar auditoria antes de código, usar subagentes com escopos fechados, integrar apenas entregáveis revisados e manter estado persistente em `docs/EXECUTION_MEMORY.md`.

## Fila de Execução

### Fase 1 — Preparação
- Repository Auditor

### Fase 2 — Execução Paralela
- Product and Content Strategist
- UI/UX and Design System
- AI Content Specialist

### Fase 3 — Execução Dependente
- Frontend Architecture após auditoria, conteúdo e design
- Core Implementation após arquitetura
- Projects and Case Studies após conteúdo/arquitetura
- SEO and Performance e Accessibility/Responsive QA após integração
- Test and Build Validator após QA

### Fase 4 — Consolidação
- Final Reviewer
- Orquestrador corrige itens aprovados e revalida

## Mapa de Dependências

`Auditoria → {Conteúdo, UI/UX, IA} → Arquitetura → {Core, Projects} → {SEO, A11y} → Validação → Revisão`.

## Subagentes

Os 11 agentes obrigatórios, escopos e arquivos estão registrados em `docs/EXECUTION_MEMORY.md` e em `.ai-orchestration/agents/`.

## Instruções de Execução

Cada agente consulta apenas fontes relevantes, não altera arquivos fora do escopo, produz resumo incremental e encerra com arquivos, decisões, testes, riscos e recomendações.

## Como lidar com bugs

Críticos bloqueiam dependentes; importantes são corrigidos antes da consolidação; baixos ficam registrados para o acabamento.

## Como lidar com conflitos

Não executar agentes com arquivos reservados coincidentes. O orquestrador revisa todo diff antes de integrar.

## Como finalizar

Executar lint, typecheck, testes, build e QA visual; criar resumo permanente; atualizar memória; não commitar sem autorização.

