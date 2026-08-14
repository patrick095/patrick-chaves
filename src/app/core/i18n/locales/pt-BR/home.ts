import type { TranslationCatalog } from "@core/i18n/i18n.models";

export const home = {
    hero: {
        name: "Patrick Chaves",
        professionalTitle: "Desenvolvedor Full Stack Sênior e Tech Lead",
        supportingText:
            "Há mais de 6 anos construo aplicações web do frontend ao backend. Minha experiência combina Angular em ambientes corporativos, Java e Quarkus, Node.js e NestJS, arquitetura de soluções e liderança técnica.",
        portraitAlt: "Retrato profissional de Patrick Chaves em seu escritório",
    },
    summary: {
        eyebrow: "Atuação",
        title: "Experiência prática em produtos web, sistemas corporativos e arquitetura",
        body: "Minha trajetória reúne desenvolvimento frontend e full stack, atuação em projetos dos setores financeiro e público e liderança técnica. Trabalho entre interface, serviços e arquitetura para transformar requisitos de negócio em software que possa continuar evoluindo.",
        points: {
            context: {
                title: "Frontend corporativo",
                description:
                    "Experiência com Angular, do AngularJS às versões modernas, TypeScript, design systems, performance e acessibilidade.",
            },
            decisions: {
                title: "Backend e integrações",
                description:
                    "Desenvolvimento de serviços e APIs com Java e Quarkus, Node.js e NestJS, bancos relacionais e MongoDB.",
            },
            evolution: {
                title: "Arquitetura e liderança",
                description:
                    "Atuação em arquitetura de soluções, refatoração de bibliotecas e liderança técnica de equipes e entregas.",
            },
        },
    },
    experience: {
        eyebrow: "Trajetória profissional",
        title: "Experiência que sustenta o trabalho",
        introduction:
            "Uma seleção das experiências mais relevantes para oportunidades de frontend, full stack e liderança técnica. O currículo traz a trajetória completa.",
        resumePrompt: "Quer ver a trajetória completa, formação e demais competências?",
        resumeAction: "Baixar currículo",
        stefanini: {
            company: "Stefanini Brasil",
            companyPeriod: "dez. 2023 — atual",
            context: "Projetos corporativos do setor financeiro",
            roles: {
                developer: {
                    title: "Analista Desenvolvedor Pleno",
                    period: "dez. 2023 — atual",
                },
            },
            highlights: {
                fullStack:
                    "Atuação full stack em aplicações corporativas, do frontend Angular ao backend Java com Quarkus.",
                delivery:
                    "Participação em todo o ciclo de desenvolvimento, com atenção a qualidade, performance e entrega contínua.",
            },
            technologies: "Angular, Java, Quarkus, Design System Banco do Brasil",
        },
        chavesSolutions: {
            company: "Chaves Solutions",
            companyPeriod: "mar. 2024 — atual",
            context: "Desenvolvimento de software e consultoria em soluções digitais",
            roles: {
                founder: {
                    title: "Founder e Líder Técnico",
                    period: "mar. 2024 — atual",
                },
            },
            highlights: {
                leadership:
                    "Liderança técnica de equipes ágeis e acompanhamento de aplicações web do planejamento à entrega.",
                fullStack:
                    "Desenvolvimento de soluções completas com tecnologias frontend e backend escolhidas conforme o contexto do produto.",
            },
            technologies:
                "Angular, React, TypeScript, Node.js, NestJS, Java, Python",
        },
        vox: {
            company: "Vox Tecnologia",
            companyPeriod: "set. 2021 — dez. 2023",
            context: "Soluções digitais para o setor público",
            roles: {
                architecture: {
                    title: "Desenvolvedor Pleno III — Arquitetura",
                    period: "jul. 2023 — dez. 2023",
                },
                midLevel: {
                    title: "Desenvolvedor Frontend Pleno II",
                    period: "mai. 2022 — jul. 2023",
                },
                frontend: {
                    title: "Desenvolvedor Frontend",
                    period: "set. 2021 — mai. 2022",
                },
            },
            highlights: {
                progression:
                    "Progressão da equipe frontend para a equipe de arquitetura de soluções.",
                products:
                    "Desenvolvimento de portais e fluxos de abertura de empresas, assinatura digital e integrações JavaScript.",
                quality:
                    "Trabalho com performance, acessibilidade, testes unitários e refatoração de bibliotecas Angular.",
            },
            technologies: "Angular, TypeScript, Bootstrap, Symfony, Zend, DSGOV",
        },
        placarVolei: {
            company: "PlacarVolei",
            companyPeriod: "nov. 2019 — set. 2021",
            context: "Projeto pessoal para competições e transmissões de voleibol",
            roles: {
                developer: {
                    title: "Desenvolvedor Full Stack",
                    period: "nov. 2019 — set. 2021",
                },
            },
            highlights: {
                product:
                    "Desenvolvimento de uma plataforma de placar para exibição em telão e uso em transmissões ao vivo.",
                realTime:
                    "Implementação de frontend, backend, autenticação, persistência e comunicação em tempo real.",
            },
            technologies:
                "React, Next.js, TypeScript, Node.js, MongoDB, Socket.io, Jest",
        },
    },
    projects: {
        eyebrow: "Engenharia em contexto",
        title: "Projetos selecionados",
        introduction:
            "Uma seleção de problemas e decisões técnicas documentadas em projetos públicos.",
        documentedTechnologiesLabel: "Tecnologias documentadas",
    },
    technologies: {
        eyebrow: "Stack principal",
        title: "Tecnologias no contexto certo",
        introduction:
            "Estas são as tecnologias que aparecem de forma recorrente na minha experiência profissional. A lista completa permanece no currículo.",
        angular: {
            category: "Frontend",
            name: "Angular e TypeScript",
            context:
                "Aplicações corporativas, design systems, bibliotecas compartilhadas, testes, performance e acessibilidade.",
        },
        javaQuarkus: {
            category: "Backend",
            name: "Java e Quarkus",
            context:
                "Serviços e integrações para aplicações corporativas do setor financeiro.",
        },
        nodeNest: {
            category: "Full stack",
            name: "Node.js e NestJS",
            context:
                "APIs, integrações e produtos digitais conectados a frontends Angular, React e Next.js.",
        },
    },
    principles: {
        eyebrow: "Princípios de engenharia",
        title: "Como desenvolvo software",
        introduction:
            "Princípios simples ajudam a tomar decisões melhores quando requisitos, prazos e sistemas mudam.",
        clarity: {
            title: "Clareza antes da complexidade",
            description:
                "Uma solução deve ser compreensível antes de ser sofisticada. Começo pelo problema, pelas restrições e pelo que precisa mudar.",
        },
        change: {
            title: "Arquitetura preparada para mudança",
            description:
                "Boas fronteiras reduzem dependências e deixam o produto evoluir sem transformar cada ajuste em uma reescrita.",
        },
        quality: {
            title: "Qualidade durante o fluxo",
            description:
                "Revisão, testes e automação funcionam melhor quando fazem parte da entrega, não quando aparecem apenas no fim.",
        },
        incremental: {
            title: "Entrega incremental",
            description:
                "Dividir o trabalho em etapas menores antecipa aprendizado, reduz risco e mantém as decisões próximas do contexto real.",
        },
        documentation: {
            title: "Documentação útil",
            description:
                "Documento o que ajuda outra pessoa a decidir, operar ou continuar o trabalho; o restante deve permanecer simples no próprio código.",
        },
    },
    contact: {
        eyebrow: "Contato",
        title: "Vamos conversar sobre o próximo desafio?",
        body: "Se você quer discutir um produto, uma decisão técnica ou uma oportunidade de colaboração, envie uma mensagem.",
    },
} as const satisfies TranslationCatalog["home"];

export const projects = {
    apexLap: {
        eyebrow: "Aplicativo desktop · Repositório público",
        name: "ApexLap Coach",
        summary:
            "Aplicativo para iRacing que compara telemetria de uma volta com uma referência compatível e organiza feedback de voz após as curvas.",
        category: "Telemetria e aplicação desktop",
        status: "Versão pública documentada: 0.6.2",
        links: {
            caseStudy: "Ler estudo de caso",
            repository: "Ver repositório",
            release: "Ver release pública",
        },
    },
} as const satisfies TranslationCatalog["projects"];
