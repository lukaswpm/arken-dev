# Project Overview - ArkenERPCore

## 1. Identificação
- **Projeto**: ArkenERPCore (Backend do ecossistema ArkenERP)
- **Framework**: .NET 10.0 (`net10.0`)
- **Tipo**: ASP.NET Core Web API + Class Library
- **Solução**: `backend/ArkenERPCore/ArkenERPCore.slnx`

## 2. Portas e Persistência
- **Portas Customizadas (Docker)**:
  - **MySQL 8 (`arken_manage`)**: Porta mapeada no host: `3308` (container: `3306`)
  - **PostgreSQL 16 (`arken_runtime`)**: Porta mapeada no host: `5433` (container: `5432`)
- **Dual-Database Federado**:
  - **MySQL 8 (`arken_manage`)**: Mapeado por `ManagerDbContext`. Gerencia `Tenants`, `Users`, `Sessions`, `Roles`, `Permissions`, `RefreshTokens` e `AuditLogs`.
  - **PostgreSQL 16 (`arken_runtime`)**: Mapeado por `RuntimeDbContext`. Motor com `pgvector` e `mysql_fdw`. Contém dados operacionais de ERP (`Clients`, `Products`, `Orders`, `Sale`), agentes de IA (`AiAgent`, `AiMemory`, `BusinessInsight`), dashboards analíticos de BI (`Dashboard`, `DashboardVisual`), cache semântico de prompts (`SemanticCache`) e fila de eventos (`OutboxEvent`).

## 3. Segurança e Autenticação
- **Autenticação JWT & Refresh Token**:
  - `AuthenticationController` (`/api/v1/auth/login`, `/api/v1/auth/refresh`, `/api/v1/auth/logout`, `/api/v1/auth/me`).
  - `IAuthService` / `AuthService`: Validação de credenciais e gestão de tokens.
  - `ITokenService` / `TokenService`: Geração de JWT Access Token (15 min) e Refresh Tokens criptográficos com rotação.
- **Multi-Tenancy**:
  - Header: `X-Tenant-ID`.
  - Fail-Fast: `TenantResolverMiddleware` bloqueia requisições sem header (exceto `/health`, `/swagger`, `/openapi` e `/api/v1/auth`).
  - Isolamento no EF Core: `TenantSaveChangesInterceptor` injeta automaticamente o `TenantId` do `ITenantContext` em todas as entidades derivadas de `TenantEntity`.

## 4. Endpoints Operacionais (ERP & IA)
- `ProductsController` (`/api/v1/products`): Catálogo paginado, busca por termo e filtro de categoria.
- `CustomersController` (`/api/v1/customers`):
  - `GET /api/v1/customers`: Lista com filtros de `search`, `status` e `city`. Métricas calculadas via agregações de `Orders` (`totalSpent`, `lastPurchase`, `ordersCount`, `initials`, `avatarColor`).
  - `GET /api/v1/customers/kpis` & `/metrics`: KPIs consolidados de clientes (`Total de Clientes`, `Clientes Ativos`, `Novos (mês)`, `Ticket Médio`) calculados dinamicamente das tabelas `clients` e `orders`.
  - `GET /api/v1/customers/{id}`: Perfil detalhado com histórico de pedidos, ticket médio, catálogo de produtos mais comprados (`topProducts` via `products`) e insights analíticos de IA combinando histórico do cliente e `business_insights`.
  - `POST /api/v1/customers`: Cadastro de novo cliente.
  - `PUT /api/v1/customers/{id}`: Atualização cadastral.
  - `DELETE /api/v1/customers/{id}`: Inativação lógica do cliente.
- `DashboardController` (`/api/v1/dashboard/summary`): Resumo executivo consolidado com faturamento, pedidos, clientes ativos, ticket médio, evolução temporal de receita, participação por categorias, vendas recentes e produtos em destaque.
- `SalesController` (`/api/v1/sales`): Pedidos e KPIs consolidados de vendas, evolução temporal e participação de categorias 100% dinâmicos do banco.
- `AiController` (`/api/v1/ai`): Insights estratégicos com ação e chat com agente.

## 5. Camada de Integração Frontend (`src/services/` e `src/pages/`)
- `client.ts`: Cliente HTTP centralizado (`fetch`) com injeção automática de `X-Tenant-ID` e `Authorization: Bearer <token>`.
- `endpoints.ts`: Mapeamento centralizado de todas as rotas da API.
- `authService.ts`: Serviço de login, refresh token, logout e sessão do usuário sincronizado com `localStorage`.
- `LoginPage.tsx`: Tela de autenticação fiel em 2 colunas com mascote 3D, branding ArkenERP, seletor de idiomas, botões sociais, atalhos de primeiro acesso e validação com o backend.
- `productService.ts`: Integração da tela de produtos, filtros por categoria, KPIs e operações de CRUD (com suporte a `imageUrl` e `image`).
- `customerService.ts`: Integração da carteira de clientes, detalhamento e KPIs.
- `salesService.ts`: Integração da tabela de pedidos, KPIs e gráficos de vendas.
- `dashboardService.ts`: Integração do painel principal (métricas, gráficos e tabelas).
- `aiService.ts`: Integração do drawer de chat com IA e insights estratégicos.
- **Gestão de Imagens**: Suporte bidirecional a imagens em produtos (`ImageUrl` e `Image`) e clientes (`avatarImage`), seletor interativo com galeria local em modal de criação/edição e tratativas de fallback com `onError`.
- **Feedback Visual (Loading States)**: Estados de carregamento dinâmicos (`isLoading`) com barras superiores `LinearProgress` e animações de loading centralizadas na `DataTable` em Dashboard, Produtos, Clientes e Vendas.

## 6. Seed de Dados (`DataSeeder`)
- Popula automaticamente tenant padrão (`loja-modelo`), role `Admin`, usuário admin (`lucas@arken.io` / `admin123`), categorias, os 10 produtos e 9 clientes com referências a imagens locais em `/images/`.
