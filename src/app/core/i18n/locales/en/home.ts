export const home = {
    hero: {
        name: "Patrick Chaves",
        professionalTitle: "Senior Full Stack Developer & Tech Lead",
        supportingText:
            "For more than 6 years, I have built web applications across the front end and back end. My experience combines Angular in enterprise environments, Java and Quarkus, Node.js and NestJS, solution architecture, and technical leadership.",
        portraitAlt: "Professional portrait of Patrick Chaves in his office",
    },
    summary: {
        eyebrow: "Approach",
        title: "Hands-on experience with web products, enterprise systems, and architecture",
        body: "My background combines front-end and full-stack development, projects in the financial and public sectors, and technical leadership. I work across interfaces, services, and architecture to turn business requirements into software that can keep evolving.",
        points: {
            context: {
                title: "Enterprise front end",
                description:
                    "Experience with Angular, from AngularJS to modern versions, TypeScript, design systems, performance, and accessibility.",
            },
            decisions: {
                title: "Back end and integrations",
                description:
                    "Services and APIs with Java and Quarkus, Node.js and NestJS, relational databases, and MongoDB.",
            },
            evolution: {
                title: "Architecture and leadership",
                description:
                    "Solution architecture, library refactoring, and technical leadership across teams and deliveries.",
            },
        },
    },
    experience: {
        eyebrow: "Professional journey",
        title: "Experience behind the work",
        introduction:
            "A selection of the experience most relevant to front-end, full-stack, and technical leadership roles. The résumé includes the complete career history.",
        resumePrompt:
            "Looking for the complete career history, education, and additional skills?",
        resumeAction: "Download resume",
        stefanini: {
            company: "Stefanini Brasil",
            companyPeriod: "Dec 2023 — present",
            context: "Enterprise projects in the financial sector",
            roles: {
                developer: {
                    title: "Mid-level Software Developer",
                    period: "Dec 2023 — present",
                },
            },
            highlights: {
                fullStack:
                    "Full-stack work on enterprise applications, from Angular front ends to Java and Quarkus back ends.",
                delivery:
                    "Contributions across the development lifecycle with attention to quality, performance, and continuous delivery.",
            },
            technologies:
                "Angular, Java, Quarkus, Banco do Brasil Design System",
        },
        chavesSolutions: {
            company: "Chaves Solutions",
            companyPeriod: "Mar 2024 — present",
            context: "Software development and digital solutions consultancy",
            roles: {
                founder: {
                    title: "Founder and Technical Lead",
                    period: "Mar 2024 — present",
                },
            },
            highlights: {
                leadership:
                    "Technical leadership for Agile teams and guidance of web applications from planning through delivery.",
                fullStack:
                    "End-to-end solutions using front-end and back-end technologies selected for the product context.",
            },
            technologies:
                "Angular, React, TypeScript, Node.js, NestJS, Java, Python",
        },
        vox: {
            company: "Vox Tecnologia",
            companyPeriod: "Sep 2021 — Dec 2023",
            context: "Digital solutions for the public sector",
            roles: {
                architecture: {
                    title: "Mid-level Developer III — Architecture",
                    period: "Jul 2023 — Dec 2023",
                },
                midLevel: {
                    title: "Mid-level Front-end Developer II",
                    period: "May 2022 — Jul 2023",
                },
                frontend: {
                    title: "Front-end Developer",
                    period: "Sep 2021 — May 2022",
                },
            },
            highlights: {
                progression:
                    "Progressed from front-end delivery to the solution architecture team.",
                products:
                    "Built portals and workflows for business registration, digital signing, and JavaScript integrations.",
                quality:
                    "Worked on performance, accessibility, unit testing, and Angular library refactoring.",
            },
            technologies:
                "Angular, TypeScript, Bootstrap, Symfony, Zend, DSGOV",
        },
        placarVolei: {
            company: "PlacarVolei",
            companyPeriod: "Nov 2019 — Sep 2021",
            context:
                "Personal project for volleyball competitions and broadcasts",
            roles: {
                developer: {
                    title: "Full Stack Developer",
                    period: "Nov 2019 — Sep 2021",
                },
            },
            highlights: {
                product:
                    "Built a scoreboard platform for large-screen displays and live broadcasts.",
                realTime:
                    "Implemented the front end, back end, authentication, persistence, and real-time communication.",
            },
            technologies:
                "React, Next.js, TypeScript, Node.js, MongoDB, Socket.io, Jest",
        },
    },
    projects: {
        eyebrow: "Engineering in context",
        title: "Selected projects",
        introduction:
            "A selection of problems and technical decisions documented in public projects.",
        documentedTechnologiesLabel: "Documented technologies",
    },
    technologies: {
        eyebrow: "Core stack",
        title: "Technologies in the right context",
        introduction:
            "These technologies appear consistently throughout my professional experience. The complete list remains available in my résumé.",
        angular: {
            category: "Front end",
            name: "Angular and TypeScript",
            context:
                "Enterprise applications, design systems, shared libraries, testing, performance, and accessibility.",
        },
        javaQuarkus: {
            category: "Back end",
            name: "Java and Quarkus",
            context:
                "Services and integrations for enterprise applications in the financial sector.",
        },
        nodeNest: {
            category: "Full stack",
            name: "Node.js and NestJS",
            context:
                "APIs, integrations, and digital products connected to Angular, React, and Next.js front ends.",
        },
    },
    principles: {
        eyebrow: "Engineering principles",
        title: "How I build software",
        introduction:
            "Simple principles help guide better decisions as requirements, timelines, and systems change.",
        clarity: {
            title: "Clarity before complexity",
            description:
                "A solution should be understandable before it is sophisticated. I start with the problem, the constraints, and what needs to change.",
        },
        change: {
            title: "Architecture designed for change",
            description:
                "Clear boundaries reduce dependencies and let the product evolve without turning every change into a rewrite.",
        },
        quality: {
            title: "Quality throughout the workflow",
            description:
                "Review, testing, and automation work best when they are part of delivery, not an afterthought.",
        },
        incremental: {
            title: "Incremental delivery",
            description:
                "Breaking work into smaller stages accelerates learning, reduces risk, and keeps decisions close to the real context.",
        },
        documentation: {
            title: "Useful documentation",
            description:
                "I document what helps someone else make decisions, operate, or continue the work; everything else should remain clear in the code itself.",
        },
    },
    contact: {
        eyebrow: "Contact",
        title: "Let's talk about your next challenge.",
        body: "If you'd like to discuss a product, a technical decision, or a collaboration opportunity, send me a message.",
    },
} as const;

export const projects = {
    apexLap: {
        eyebrow: "Desktop application · Public repository",
        name: "ApexLap Coach",
        summary:
            "An iRacing application that compares lap telemetry with a compatible reference and organizes voice feedback after each corner.",
        category: "Telemetry and desktop application",
        status: "Documented public version: 0.6.2",
        links: {
            caseStudy: "Read case study",
            repository: "View repository",
            release: "View public release",
        },
    },
} as const;
