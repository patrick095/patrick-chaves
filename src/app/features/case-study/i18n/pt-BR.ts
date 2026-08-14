import type { CaseStudyMessages } from './en';

export const ptBrCaseStudyMessages = {
  backToProjects: 'Voltar aos projetos',
  eyebrow: 'Estudo técnico · Repositório público',
  sections: {
    overview: 'Visão geral',
    technicalContext: 'Contexto técnico',
    documentedFlow: 'Fluxo documentado',
    architecture: 'Arquitetura',
    publicStatus: 'Estado público',
  },
  sourcesTitle: 'Fontes públicas consultadas',
  apexLap: {
    headline: 'ApexLap Coach: telemetria transformada em orientação de pilotagem',
    overview: {
      title: 'Da volta registrada ao feedback de voz',
      body:
        'O ApexLap Coach usa a telemetria disponível no iRacing para comparar a volta atual com uma referência do mesmo carro, pista e layout. A análise alinha os pontos por distância ou posição na pista, segmenta setores e curvas e transforma diferenças observadas em feedback de voz e histórico para consulta.',
    },
    technicalContext: {
      title: 'Comparar voltas sem perder o contexto da pista',
      body:
        'Voltas com tempos diferentes não mantêm os mesmos eventos no mesmo instante. A documentação do projeto evita essa dependência de tempo absoluto: os pontos são normalizados por distância e lapPct, permitindo relacionar as mesmas regiões da pista antes de comparar fases da curva e eventos de freio, acelerador, volante, marcha e dinâmica do carro.',
    },
    pipeline: {
      title: 'Pipeline de análise',
      capture: { label: 'Coleta', description: 'Recebe ou importa telemetria.' },
      normalization: {
        label: 'Normalização',
        description: 'Organiza os pontos por distância e posição na pista.',
      },
      reference: { label: 'Referência', description: 'Carrega uma volta compatível.' },
      segmentation: { label: 'Segmentação', description: 'Identifica setores e curvas.' },
      comparison: {
        label: 'Comparação',
        description: 'Avalia diferenças por fase da curva.',
      },
      classification: {
        label: 'Classificação',
        description: 'Identifica eventos e aplica regras de confiança.',
      },
      persistence: {
        label: 'Persistência',
        description: 'Registra volta, setores, curvas e evidências no armazenamento local.',
      },
      voice: {
        label: 'Voz',
        description: 'Enfileira a mensagem respeitando prioridade e intervalo entre feedbacks.',
      },
    },
    decisions: {
      title: 'Decisões técnicas documentadas',
      spatialAlignment: {
        title: 'Alinhamento espacial',
        body:
          'A comparação usa distância e lapPct para preservar a correspondência entre as regiões da pista quando os tempos das voltas são diferentes.',
      },
      domainBoundary: {
        title: 'Domínio separado da interface',
        body:
          'O guia de desenvolvimento define que o domínio decide o coaching sem depender de infraestrutura, Electron ou renderer. A interface React apresenta os dados e não deve calcular a telemetria crítica.',
      },
      feedbackTiming: {
        title: 'Feedback fora do momento crítico',
        body:
          'O feedback principal ocorre depois da curva. Mensagens de técnica recebem prioridade, e a fila de voz considera prioridade e intervalo para não sobrepor orientações.',
      },
      localVoice: {
        title: 'Voz preparada localmente',
        body:
          'O projeto mantém frases e áudios por locale e documenta o uso de áudio pré-gerado, sem chamada de síntese de voz durante a execução do aplicativo.',
      },
      releaseGates: {
        title: 'Verificação antes do empacotamento',
        body:
          'O workflow público executa typecheck e testes antes de gerar os executáveis Windows e atualizar a release.',
      },
    },
    constraints: {
      title: 'Confiabilidade depende de contexto',
      body:
        'A documentação considera referências incompatíveis, voltas inválidas, perda herdada de uma curva anterior e eventos como auto blip que poderiam ser confundidos com um erro de acelerador. Esses casos são tratados como restrições da análise, sem alegação pública de precisão ou desempenho.',
    },
    publicStatus: {
      title: 'O que está disponível',
      body:
        'O código e a documentação podem ser consultados no GitHub. O repositório registra a versão 0.6.2 e oferece uma release pública com artefatos para Windows. As fontes auditadas não apresentam demonstração web, galeria aprovada ou licença identificada pela API do GitHub.',
    },
    diagram: {
      label: 'Diagrama conceitual',
      accessibleName: 'Fluxo conceitual da telemetria até o feedback de voz.',
      telemetry: 'Telemetria',
      normalization: 'Normalização',
      reference: 'Referência compatível',
      sectors: 'Setores e curvas',
      feedbackRules: 'Regras de feedback',
      voice: 'Voz',
      caption: 'Diagrama conceitual derivado da documentação pública do ApexLap Coach.',
    },
    sources: {
      repositoryApi: 'API pública do repositório',
      readme: 'README no commit auditado',
      manifest: 'Manifesto da aplicação',
      developerGuide: 'Guia de desenvolvimento',
      driverGuide: 'Guia do piloto',
      releaseWorkflow: 'Workflow público de release',
      publicRelease: 'Release pública v0.6.2',
    },
  },
} as const satisfies CaseStudyMessages;
