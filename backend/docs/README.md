# Documentação Técnica do Backend - ArkenERPCore

Bem-vindo à documentação técnica oficial da camada backend do ecossistema **ArkenERP**.

Esta pasta contém o detalhamento da arquitetura, decisões técnicas de engenharia, catálogo de entidades de dados, auditoria do código atual e roteiro de evolução.

---

## Índice de Documentos

1. **[Documentação Técnica Mestre (`technical_documentation.md`)](file:///e:/Projects/Lucas/arken-dev/backend/docs/technical_documentation.md)**  
   Guia abrangente cobrindo a visão geral do sistema, stack de tecnologias, estrutura física de pastas, estratégia de persistência federada, modelo de segurança multi-tenant, ciclo de requisições, diagnósticos e instruções de execução.

2. **[Visão Arquitetural e Federação de Dados (`architecture_overview.md`)](file:///e:/Projects/Lucas/arken-dev/backend/docs/architecture_overview.md)**  
   Diagramas e análise detalhada sobre a separação de bancos (MySQL 8 para Tenancy e PostgreSQL 16 para Runtime/IA), federação via `mysql_fdw`, mecanismo vetorial com `pgvector` e a tripla barreira de isolamento multi-tenant.

3. **[Dicionário de Domínio e Entidades (`domain_dictionary.md`)](file:///e:/Projects/Lucas/arken-dev/backend/docs/domain_dictionary.md)**  
   Catálogo estruturado de todas as entidades, propriedades, relacionamentos e os 15 enums fortemente tipados que compõem o modelo de negócio do ERP e os módulos de IA.

4. **[Diagnóstico Técnico e Roadmap de Implementação (`diagnostics_and_roadmap.md`)](file:///e:/Projects/Lucas/arken-dev/backend/docs/diagnostics_and_roadmap.md)**  
   Relatório de auditoria da compilação (`dotnet build`), identificação de débitos técnicos e erros a corrigir, matriz de prontidão atual e roteiro passo a passo dividido em 5 fases para conduzir o backend à produção.

5. **[Backlog de Sincronização Frontend ⇄ Backend (`sync_roadmap.md`)](file:///e:/Projects/Lucas/arken-dev/backend/docs/sync_roadmap.md)**  
   Quadro detalhado de tasks de sincronização divididas entre backend, camada de API, cliente HTTP no frontend e conexão das telas aos dados reais.

---

## Localização dos Principais Componentes no Código

- **Arquivo de Solução**: [`backend/ArkenERPCore/ArkenERPCore.slnx`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERPCore.slnx)
- **Biblioteca de Domínio & Contextos**: [`backend/ArkenERPCore/ArkenERP.Lib`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib)
- **Host Web & API**: [`backend/ArkenERPCore/ArkenERPCore`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERPCore)
- **Configuração dos Bancos de Dados**: [`docker-compose.yml`](file:///e:/Projects/Lucas/arken-dev/docker-compose.yml) e [`db/postgre/Dockerfile`](file:///e:/Projects/Lucas/arken-dev/db/postgre/Dockerfile)
