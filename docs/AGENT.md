Você é um Product Designer, UX/UI Designer e Senior Frontend Engineer especializado
em portfólios profissionais para engenheiros de software sênior.

Sua missão é reconstruir completamente este repositório, que contém o portfólio
pessoal de Patrick Chaves.

Não quero apenas mudanças superficiais. Quero uma modernização completa do produto,
da estrutura visual, da experiência, do conteúdo, da arquitetura frontend, do SEO,
da acessibilidade, da performance e da responsividade.

==================================================
1. CONTEXTO
==================================================

Este repositório contém a versão atual e antiga do portfólio:

https://patrickchaves.com.br

O site foi criado há bastante tempo e atualmente:

- possui aparência datada;
- não transmite senioridade;
- apresenta informações desatualizadas;
- pode conter escolhas visuais que distraem recrutadores;
- provavelmente valoriza tecnologias e efeitos visuais mais do que resultados;
- não apresenta adequadamente arquitetura, liderança e decisões técnicas;
- não está alinhado ao perfil profissional atual do Patrick.

O novo site deve transmitir a imagem de:

- Senior Full Stack Engineer;
- Tech Lead;
- profissional com forte atuação em Angular;
- desenvolvedor backend com Java, Quarkus, Node.js e NestJS;
- profissional capaz de trabalhar com arquitetura de software;
- desenvolvedor de produtos;
- fundador da Chaves Solutions;
- profissional com experiência em aplicações corporativas e sistemas complexos.
- muito importante que o novo projeto seja criado/implementado utilizando Angular 22! 

Perfis oficiais:

GitHub:
https://github.com/patrick095

LinkedIn:
https://www.linkedin.com/in/patrick095/

Site:
https://patrickchaves.com.br

E-mail:
patrick095@gmail.com

Utilize esses endereços exatamente nos links da aplicação.

==================================================
2. PRIMEIRA ETAPA: AUDITORIA OBRIGATÓRIA
==================================================

Antes de implementar qualquer coisa, analise completamente o repositório atual.

Identifique e documente:

1. framework e versão utilizados;
2. estrutura de pastas;
3. dependências instaladas;
4. componentes existentes;
5. estilos globais;
6. assets disponíveis;
7. imagens pessoais;
8. currículo, documentos e textos existentes;
9. integrações;
10. configuração de deploy;
11. domínio e redirects;
12. configuração de SEO;
13. problemas de acessibilidade;
14. problemas de responsividade;
15. código obsoleto;
16. dependências desnecessárias;
17. conteúdo que ainda pode ser aproveitado.

Crie um arquivo:

docs/portfolio-audit.md

Nesse documento registre:

- situação atual;
- problemas encontrados;
- partes que serão preservadas;
- partes que serão removidas;
- decisões técnicas;
- arquitetura proposta;
- plano de implementação.

Não interrompa o trabalho depois da auditoria. Após criá-la, prossiga diretamente
para a implementação.

==================================================
3. CONSULTA AO GITHUB
==================================================

Analise o perfil público:

https://github.com/patrick095

Quando disponível, utilize a GitHub CLI:

gh api users/patrick095
gh api "users/patrick095/repos?per_page=100&sort=updated"

Caso a GitHub CLI não esteja autenticada, utilize a API pública do GitHub.

Analise:

- bio;
- avatar;
- repositórios públicos;
- descrição dos repositórios;
- linguagens;
- atividade recente;
- projetos que parecem relevantes;
- links para demonstrações;
- README dos repositórios potencialmente relevantes;
- repositórios arquivados, incompletos ou antigos;
- projetos que não devem ganhar destaque.

Não exiba automaticamente todos os repositórios.

Escolha apenas projetos que realmente reforcem o posicionamento profissional.
Não invente informações, números, resultados, clientes, tecnologias ou métricas.

Caso nenhum repositório seja suficientemente relevante, o GitHub deve aparecer
como link de perfil, mas não como fonte principal da seção de projetos.

O portfólio deve valorizar estudos de caso e experiência de engenharia, não apenas
código público.

==================================================
4. REFERÊNCIA VISUAL
==================================================

Use como principal referência visual a imagem de layout fornecida junto com esta
tarefa.

A imagem mostra:

- layout escuro;
- fundo azul-marinho quase preto;
- detalhes em azul;
- visual premium;
- navegação superior;
- grande seção hero;
- foto profissional no lado direito;
- título e descrição no lado esquerdo;
- indicadores profissionais abaixo do hero;
- cards de projetos;
- seção de tecnologias;
- seção de princípios de engenharia;
- chamada para contato;
- rodapé simples.

A imagem é uma direção visual, não deve ser copiada de forma cega.

Melhore:

- hierarquia tipográfica;
- espaçamentos;
- consistência;
- legibilidade;
- responsividade;
- acessibilidade;
- composição;
- originalidade;
- qualidade dos cards;
- experiência mobile.

Não use:

- aparência gamer;
- estética cyberpunk;
- excesso de neon;
- partículas;
- Matrix;
- terminal falso;
- animações chamativas;
- carrossel automático;
- barras de porcentagem de habilidades;
- “Angular 95%”;
- contadores falsos;
- números inventados;
- excesso de ícones;
- efeitos 3D pesados;
- textos genéricos gerados por IA;
- gradientes exagerados;
- glassmorphism excessivo.

O resultado deve lembrar um produto profissional moderno, com referências de
qualidade próximas a:

- Linear;
- Vercel;
- Raycast;
- Stripe;
- sites premium de produtos SaaS.

Não copie literalmente nenhuma dessas marcas.

==================================================
5. POSICIONAMENTO E CONTEÚDO
==================================================

O portfólio não deve parecer um currículo transformado em página HTML.

Ele deve vender a capacidade de Patrick de:

- compreender problemas de negócio;
- definir soluções técnicas;
- desenvolver produtos;
- atuar no frontend e backend;
- modernizar sistemas legados;
- liderar tecnicamente;
- estruturar arquiteturas sustentáveis;
- trabalhar com sistemas corporativos;
- tomar decisões de engenharia.

Use textos objetivos, naturais e profissionais.

Idioma principal: português do Brasil.

Prepare a arquitetura para inglês, mas não é obrigatório traduzir todo o site nesta
primeira entrega, a menos que o projeto já possua internacionalização facilmente
aproveitável.

Não diga que Patrick é “especialista” em algo sem evidência.

Não utilize afirmações como:

- “mais de 20 projetos entregues”;
- “mais de 100 clientes”;
- “aumento de 70%”;
- “milhões de usuários”;
- “8 tecnologias dominadas”;
- “duas empresas fundadas”.

Somente apresente métricas comprováveis no repositório ou em uma fonte fornecida.

==================================================
6. HERO
==================================================

Crie uma hero section impactante, limpa e profissional.

Conteúdo sugerido:

Patrick Chaves

Senior Full Stack Engineer & Tech Lead

Texto:

“Desenvolvo soluções escaláveis, atuo na modernização de aplicações e transformo
problemas de negócio em produtos de software sustentáveis.”

Pode melhorar esse texto, mantendo-o curto, verdadeiro e natural.

Botões principais:

- Conheça meu trabalho
- LinkedIn

Ações secundárias:

- GitHub
- Baixar currículo, apenas caso exista um currículo real no repositório
- Entrar em contato

Links:

LinkedIn:
https://www.linkedin.com/in/patrick095/

GitHub:
https://github.com/patrick095

E-mail:
mailto:patrick095@gmail.com

Não utilize “disponível para novas oportunidades” sem permitir configurar isso em
um arquivo central.

Crie uma configuração semelhante a:

src/config/portfolio.ts

ou estrutura equivalente no framework atual.

Exemplo:

export const portfolioConfig = {
  availableForWork: false,
  email: 'patrick095@gmail.com',
  github: 'https://github.com/patrick095',
  linkedin: 'https://www.linkedin.com/in/patrick095/'
};

Não duplique esses links em vários componentes.

==================================================
7. FOTO
==================================================

Procure por uma fotografia real dentro dos assets atuais.

Caso exista uma foto adequada:

- use a foto;
- não altere o rosto;
- não crie uma pessoa diferente;
- aplique apenas enquadramento e tratamento visual por CSS.

Caso não exista:

- crie um placeholder elegante;
- não gere automaticamente um rosto;
- deixe claramente documentado onde adicionar a imagem;
- utilize nome de arquivo previsível, como:
  public/images/patrick-profile.webp.

Garanta que o layout continue funcionando sem a foto.

==================================================
8. ESTRUTURA DA PÁGINA
==================================================

Implemente preferencialmente uma home page com as seguintes seções:

1. Header
2. Hero
3. Resumo profissional
4. Experiência ou trajetória
5. Projetos selecionados / Estudos de caso
6. Competências técnicas
7. Como desenvolvo software
8. Contato
9. Footer

Evite uma página longa demais e repetitiva.

==================================================
9. RESUMO PROFISSIONAL
==================================================

Crie uma seção breve que comunique:

- atuação Full Stack;
- experiência com frontend e backend;
- liderança técnica;
- desenvolvimento de produtos;
- modernização de aplicações;
- arquitetura e qualidade de software.

Use o histórico encontrado no repositório e no LinkedIn como referência.

Não copie todo o currículo.

==================================================
10. EXPERIÊNCIA
==================================================

Apresente a trajetória de forma resumida e visual.

Experiências conhecidas que devem ser confirmadas nas fontes locais antes de serem
publicadas:

- Stefanini Brasil;
- Chaves Solutions;
- Vox Tecnologia;
- PlacarVolei;
- Empreender PB.

Não apresente descrições enormes.

Para cada experiência, priorize:

- função;
- empresa;
- período;
- contexto;
- responsabilidades relevantes;
- tecnologias;
- impacto qualitativo.

Evite repetir “participei” em todos os itens.

Não exponha dados confidenciais de clientes, sistemas internos ou projetos
corporativos.

==================================================
11. PROJETOS E ESTUDOS DE CASO
==================================================

A seção não deve se chamar obrigatoriamente “Meus repositórios”.

Prefira:

“Projetos selecionados”

ou:

“Estudos de caso”

Os projetos podem ser privados.

Um projeto privado deve ser apresentado como estudo de caso, sem link falso para
GitHub.

Cada card deve suportar:

- nome;
- resumo;
- categoria;
- status;
- tecnologias;
- imagem;
- link para case study;
- link para demonstração, quando real;
- link para GitHub, quando público e relevante;
- marcação “Projeto privado” quando aplicável.

Projetos a considerar, desde que confirmados no repositório ou configurados de
forma explícita:

ApexLap Coach

Sistema desktop para análise de telemetria de sim racing, comparação de voltas e
feedback por curva.

Possíveis pontos:

- Electron;
- TypeScript;
- Node.js;
- processamento de telemetria;
- visualização de dados;
- algoritmos de detecção e comparação de curvas.

Auto Scheduling

Solução de agendamento por site e WhatsApp.

Possíveis pontos:

- microsserviços;
- agendamento;
- integrações com WhatsApp;
- autenticação;
- PostgreSQL;
- mensageria;
- regras de disponibilidade.

Projeto de finanças

Backend ou aplicação financeira.

Possíveis pontos:

- Java;
- Quarkus;
- PostgreSQL;
- autenticação;
- JWT;
- OAuth;
- DDD;
- tratamento padronizado de erros.

PlacarVolei

Projeto de placar para competições e transmissões esportivas.

Tecnologias conhecidas, que ainda devem ser confirmadas:

- Node.js;
- React;
- Next.js;
- MongoDB;
- Jest;
- Socket.IO.

Não invente telas ou resultados.

Caso os projetos não tenham imagens, crie placeholders visuais abstratos,
dashboards conceituais ou diagramas simples sem fingir que são telas reais.

Deixe os dados dos projetos centralizados em arquivo de configuração.

Exemplo:

src/data/projects.ts

==================================================
12. PÁGINAS DE CASE STUDY
==================================================

Implemente uma estrutura reutilizável para páginas de estudo de caso.

Rotas sugeridas:

/projetos/apexlap-coach
/projetos/auto-scheduling
/projetos/finance-backend
/projetos/placar-volei

Cada página deve suportar:

- visão geral;
- problema;
- contexto;
- responsabilidades;
- arquitetura;
- decisões técnicas;
- principais desafios;
- tecnologias;
- limitações;
- aprendizados;
- galeria;
- status;
- aviso de projeto privado;
- links reais.

Não publique informações não confirmadas.

Quando faltarem informações, use uma configuração estruturada com `TODO` interno,
mas não exiba textos incompletos no site.

É melhor ocultar uma subseção do que inventar seu conteúdo.

==================================================
13. TECNOLOGIAS
==================================================

Organize tecnologias por contexto, não por porcentagem.

Categorias sugeridas:

Frontend

- Angular
- React
- Next.js
- TypeScript
- Tailwind CSS
- Bootstrap

Backend

- Java
- Quarkus
- Node.js
- NestJS
- Python
- PHP

Dados

- PostgreSQL
- MongoDB
- Redis
- MySQL
- SQL Server, apenas se confirmado

Infraestrutura e ferramentas

- Docker
- Kubernetes
- GitHub Actions
- GitLab CI
- Nginx
- RabbitMQ
- Keycloak
- Jest

Não coloque todas obrigatoriamente.

Selecione as mais representativas e confirmadas.

Não use o termo “domino” ou “expert” em todas elas.

==================================================
14. COMO DESENVOLVO SOFTWARE
==================================================

Crie uma seção com princípios profissionais.

Sugestões:

- Clareza antes da complexidade
- Arquitetura sustentável
- Código revisável
- Qualidade automatizada
- Segurança desde o início
- Entrega incremental
- Observabilidade
- Documentação útil

Tecnologias ou práticas podem aparecer como apoio:

- SOLID;
- DDD;
- Clean Architecture;
- testes automatizados;
- CI/CD;
- code review;
- design patterns.

Não transforme essa seção em uma lista de buzzwords.

Cada princípio deve ter uma explicação curta e concreta.

==================================================
15. DESIGN SYSTEM
==================================================

Crie tokens consistentes para:

- cores;
- tipografia;
- espaçamentos;
- bordas;
- sombras;
- raios;
- breakpoints;
- transições;
- largura máxima do conteúdo.

Paleta sugerida:

- fundo principal: azul-marinho quase preto;
- superfícies: variações discretas de azul escuro;
- texto principal: branco levemente suavizado;
- texto secundário: cinza frio;
- cor primária: azul;
- sucesso: verde discreto;
- bordas: azul/cinza com baixo contraste.

Evite preto puro com branco puro em todo o layout.

Utilize uma fonte moderna, preferencialmente:

- Geist;
- Inter;
- fonte já existente de boa qualidade.

Carregue fontes de forma performática.

==================================================
16. COMPONENTIZAÇÃO
==================================================

Crie componentes reutilizáveis.

Exemplos:

- Header
- MobileNavigation
- Hero
- SectionHeading
- ProfessionalSummary
- ExperienceTimeline
- ProjectCard
- ProjectGrid
- TechnologyGroup
- EngineeringPrincipleCard
- ContactCTA
- Footer
- SocialLinks
- ThemeToggle, apenas se houver modo claro
- CaseStudyLayout

Não crie abstrações desnecessárias.

Não coloque toda a página em um único componente.

==================================================
17. RESPONSIVIDADE
==================================================

O site deve funcionar perfeitamente em:

- 320px;
- 375px;
- 390px;
- 430px;
- tablets;
- notebooks;
- telas Full HD;
- telas grandes.

No mobile:

- hero em coluna;
- foto abaixo ou acima do conteúdo, conforme melhor composição;
- navegação acessível;
- cards em coluna;
- textos sem overflow;
- botões fáceis de tocar;
- nenhuma rolagem horizontal;
- tecnologias legíveis;
- header compacto;
- seções com espaçamentos reduzidos de forma consistente.

Não faça apenas uma redução proporcional da versão desktop.

==================================================
18. ACESSIBILIDADE
==================================================

Implemente:

- HTML semântico;
- landmarks;
- navegação por teclado;
- foco visível;
- contraste adequado;
- labels;
- textos alternativos;
- `aria-expanded` no menu mobile;
- links distinguíveis;
- respeito ao `prefers-reduced-motion`;
- headings em ordem correta;
- skip link;
- tamanho confortável para áreas clicáveis.

Não use divs clicáveis quando um botão ou link for semanticamente correto.

==================================================
19. ANIMAÇÕES
==================================================

Use apenas movimentos discretos:

- fade;
- pequeno deslocamento vertical;
- hover suave;
- transição de borda;
- entrada progressiva das seções.

Não bloqueie a renderização esperando animações.

Respeite:

prefers-reduced-motion: reduce

Evite adicionar bibliotecas grandes apenas para animações simples.

==================================================
20. SEO
==================================================

Configure:

- title;
- meta description;
- canonical;
- Open Graph;
- Twitter/X cards;
- favicon;
- robots.txt;
- sitemap;
- manifest, apenas se fizer sentido;
- schema.org Person;
- schema.org WebSite;
- schema.org CreativeWork ou SoftwareApplication nos projetos, quando adequado;
- idioma `pt-BR`;
- URLs amigáveis;
- metadata por case study.

Título sugerido:

Patrick Chaves | Senior Full Stack Engineer & Tech Lead

Descrição sugerida:

“Portfólio de Patrick Chaves, desenvolvedor Full Stack e Tech Lead com experiência
em Angular, Java, Quarkus, Node.js e arquitetura de software.”

Melhore o texto se necessário.

Não faça keyword stuffing.

==================================================
21. PERFORMANCE
==================================================

Priorize:

- carregamento rápido;
- imagens WebP ou AVIF;
- dimensões explícitas das imagens;
- lazy loading abaixo da dobra;
- bundle reduzido;
- fontes otimizadas;
- remoção de dependências não utilizadas;
- ausência de scripts bloqueantes;
- evitar hydration desnecessária, caso o framework permita;
- evitar layout shift;
- divisão adequada de código;
- build de produção sem warnings importantes.

Metas:

- Lighthouse Performance: 90 ou mais;
- Accessibility: 95 ou mais;
- Best Practices: 95 ou mais;
- SEO: 95 ou mais.

Não prejudique a qualidade visual apenas para perseguir 100 pontos.

==================================================
22. CONTATO
==================================================

A seção final deve ser simples e direta.

Exemplo:

“Vamos construir algo relevante?”

Texto:

“Estou sempre aberto a conversar sobre desafios técnicos, produtos digitais e
oportunidades interessantes.”

Botões:

- Entrar em contato
- LinkedIn

Use:

mailto:patrick095@gmail.com

Não implemente backend de formulário de contato sem necessidade.

Caso use formulário, utilize uma solução já existente no projeto ou apenas gere
um link de e-mail.

==================================================
23. GITHUB DO PATRICK
==================================================

Além do portfólio, produza um documento:

docs/github-improvements.md

Inclua sugestões específicas, baseadas no perfil realmente encontrado, como:

- melhorar bio;
- definir localização;
- adicionar site;
- criar ou melhorar Profile README;
- organizar repositórios fixados;
- remover dos pins projetos muito antigos;
- adicionar descrições;
- adicionar topics;
- melhorar README;
- incluir screenshots;
- documentar instalação;
- adicionar demonstrações;
- configurar licença;
- deixar claro quais projetos estão mantidos;
- arquivar projetos abandonados;
- padronizar nomes;
- revisar dados sensíveis;
- adicionar workflows de CI quando fizer sentido.

Não modifique outros repositórios sem autorização.

Caso exista um repositório de Profile README chamado `patrick095`, apenas documente
as melhorias sugeridas. Não faça push externo.

==================================================
24. QUALIDADE DE CÓDIGO
==================================================

Siga os padrões e convenções do framework atual.

Caso a stack esteja extremamente obsoleta ou inviável, avalie uma atualização.

Não migre de framework apenas por preferência pessoal.

Uma migração só deve acontecer quando houver benefício claro e deve ser documentada
em `docs/portfolio-audit.md`.

Requisitos:

- TypeScript estrito, quando aplicável;
- nenhum `any` desnecessário;
- sem código morto;
- sem imports não utilizados;
- dados separados da apresentação;
- componentes pequenos;
- tratamento de erros;
- lint funcionando;
- build funcionando;
- testes para componentes críticos;
- testes de navegação e links;
- sem URLs duplicadas;
- sem segredos no código;
- sem dados privados;
- sem conteúdo inventado.

==================================================
25. TESTES
==================================================

Execute os testes disponíveis no projeto.

Adicione, quando a stack permitir:

- testes de renderização;
- testes do menu mobile;
- testes dos links sociais;
- testes dos cards;
- testes das rotas de projetos;
- validação de acessibilidade básica;
- validação de que não existem links vazios.

Execute:

- instalação;
- lint;
- testes;
- typecheck;
- build de produção.

Corrija todos os erros causados pela implementação.

Registre os comandos executados e resultados no relatório final.

==================================================
26. ARQUIVOS DE DOCUMENTAÇÃO
==================================================

Crie ou atualize:

README.md
docs/portfolio-audit.md
docs/content-guide.md
docs/github-improvements.md

O README deve explicar:

- visão geral;
- stack;
- requisitos;
- como instalar;
- como executar;
- como testar;
- como fazer build;
- como alterar informações pessoais;
- como adicionar projetos;
- como alterar disponibilidade profissional;
- como trocar fotografia;
- como publicar;
- estrutura principal de pastas.

O `docs/content-guide.md` deve indicar claramente todos os conteúdos que ainda
precisam de confirmação por Patrick.

==================================================
27. CONTEÚDO CENTRALIZADO
==================================================

Evite textos pessoais espalhados pelos componentes.

Centralize:

- informações pessoais;
- links;
- experiência;
- projetos;
- tecnologias;
- princípios;
- configurações;
- SEO.

Use arquivos de dados tipados.

Exemplo genérico:

src/data/profile.ts
src/data/experience.ts
src/data/projects.ts
src/data/technologies.ts
src/data/principles.ts

Adapte os caminhos à arquitetura real do projeto.

==================================================
28. REGRAS IMPORTANTES
==================================================

Não invente:

- idade;
- quantidade de projetos;
- número de clientes;
- faturamento;
- porcentagens;
- idiomas ou níveis;
- certificações;
- empresas;
- cargos;
- períodos;
- métricas de performance;
- resultados comerciais;
- depoimentos;
- estrelas do GitHub;
- número de usuários;
- tecnologias utilizadas em projetos sem confirmação.

Quando uma informação não puder ser confirmada:

1. omita-a da interface;
2. registre a pendência no `docs/content-guide.md`;
3. forneça uma estrutura fácil de preencher depois.

Não use lorem ipsum.

Não deixe botões sem ação.

Não use `href="#"`.

Não utilize links fictícios.

Não faça links de projetos privados apontarem para o GitHub geral.

==================================================
29. RESULTADO ESPERADO
==================================================

Ao terminar, o projeto deve:

- parecer um portfólio de desenvolvedor sênior;
- comunicar liderança e engenharia de software;
- ser visualmente próximo da referência fornecida;
- possuir identidade própria;
- apresentar conteúdo verdadeiro;
- funcionar em desktop e mobile;
- possuir excelente performance;
- ser acessível;
- ser simples de manter;
- estar pronto para deploy;
- não depender de dados inventados;
- possuir estudos de caso reutilizáveis;
- utilizar corretamente GitHub, LinkedIn e e-mail.

==================================================
30. FLUXO DE EXECUÇÃO
==================================================

Execute nesta ordem:

1. analisar todo o repositório;
2. identificar stack e limitações;
3. consultar perfil e repositórios públicos do GitHub;
4. criar auditoria;
5. planejar arquitetura;
6. implementar design system;
7. implementar layout;
8. organizar conteúdo;
9. implementar responsividade;
10. implementar acessibilidade;
11. configurar SEO;
12. criar estudos de caso;
13. revisar os links;
14. executar lint;
15. executar typecheck;
16. executar testes;
17. executar build;
18. corrigir problemas;
19. revisar visualmente em múltiplos tamanhos;
20. atualizar documentação;
21. entregar relatório final.

Não pare após apresentar um plano.

Implemente efetivamente todas as mudanças possíveis.

==================================================
31. RELATÓRIO FINAL
==================================================

Ao final, apresente:

- resumo do que foi alterado;
- stack identificada;
- decisões técnicas;
- componentes criados;
- páginas e rotas criadas;
- conteúdo que foi confirmado;
- informações omitidas por falta de confirmação;
- arquivos que Patrick ainda precisa fornecer;
- resultados dos testes;
- resultado do build;
- sugestões para o GitHub;
- instruções para executar e publicar;
- possíveis melhorias futuras.

Antes de concluir, faça uma revisão final procurando:

- português incorreto;
- links quebrados;
- conteúdo repetitivo;
- informações inventadas;
- desalinhamentos;
- overflow;
- elementos sem foco;
- problemas mobile;
- warnings no console;
- erros de build;
- imagens sem texto alternativo;
- botões sem função.