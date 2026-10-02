# Dicionário de Domínio e Entidades - ArkenERP Backend

> **Módulo**: Catálogo de Entidades, Modelos e Enums  
> **Camada**: [ArkenERP.Lib/Domain](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain)  
> **Status**: Totalmente Modelado  

---

## 1. Classes Base

| Entidade | Arquivo | Propriedades Principais | Descrição |
| :--- | :--- | :--- | :--- |
| **`Entity`** | [`Entity.cs`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Base/Entity.cs) | `Id` (Guid) | Raiz com identificador único global gerado via `Guid.NewGuid()`. |
| **`AuditableEntity`** | [`AuditableEntity.cs`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Base/AuditableEntity.cs) | `CreatedBy`, `CreatedAt`, `UpdatedBy`, `UpdatedAt` | Rastreabilidade de criação e modificação em UTC. |
| **`TenantEntity`** | [`TenantEntity.cs`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Base/TenantEntity.cs) | `TenantId` (Guid) | Base para qualquer registro isolado logicamente por inquilino. |

---

## 2. Domínio de Tenancy & Gestão (MySQL - `ManagerDbContext`)

### 2.1 [`Tenant`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Tenancy/Tenant.cs)
Representa a empresa/organização que contrata a plataforma.
- `CompanyName` (string): Razão Social ou Nome Fantasia.
- `Slug` (string): Identificador único amigável em minúsculas (ex: `"loja-modelo"`).
- `Status` ([`TenantStatus`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums/TenantStatus.cs)): `Trial`, `Active`, `Suspended`, `Canceled`, `Expired`.
- `OwnerUserId` (Guid?): Identificador do usuário proprietário da conta.
- `StripeCustomerId` (string?): Identificador do cliente no gateway de pagamento Stripe.
- `TrialEndsAt` / `SuspendedAt` / `DeletedAt` (DateTime?): Controle de ciclo de vida e suspensão.
- `SettingsJson` ([`TenantSettings`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Tenancy/TenantSettings.cs)): Configurações customizadas do inquilino.
- `Users` (ICollection<TenantUser>): Coleção de vínculos de usuários autorizados no tenant.

### 2.2 [`TenantSettings`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Tenancy/TenantSettings.cs)
Configurações corporativas em formato JSON embutido (`TimeZone`, `Currency`, `FiscalSettings`).

---

## 3. Domínio de Identidade & Acesso (MySQL - `ManagerDbContext`)

### 3.1 [`User`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Identity/User.cs)
Usuário global na plataforma Arken.
- `Email` (string): E-mail único do usuário.
- `Username` (string): Nome de login único.
- `PasswordHash` (string): Hash criptográfico da senha.
- `FirstName` / `LastName` (string?): Nome completo.
- `AvatarUrl` (string?): URL da foto de perfil.
- `EmailVerifiedAt` (DateTime?): Data de confirmação do e-mail.
- `LastLoginAt` (DateTime?): Último acesso registrado.
- `IsActive` (bool): Situação do usuário no sistema.

### 3.2 [`TenantUser`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Identity/TenantUser.cs)
Tabela associativa entre `User` e `Tenant`, permitindo que um usuário acesse múltiplas empresas com diferentes papéis.
- `TenantId` (Guid): Identificador do inquilino.
- `UserId` (Guid): Identificador do usuário.
- `RoleId` (Guid?): Papel atribuído no escopo daquele tenant.
- `Status` (string): Ex: `"active"`, `"invited"`, `"disabled"`.
- `JoinedAt` (DateTime?): Data de adesão do usuário ao tenant.

### 3.3 [`Role`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Identity/Role.cs) & [`RolePermission`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Identity/RolePermission.cs)
- Perfis de permissão escopados por tenant (`Role` herda de `TenantEntity`).
- `RolePermission` mapeia chaves específicas de acesso (ex.: `"sales.view"`, `"products.edit"`, `"ai.insights.apply"`).

### 3.4 [`Session`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/Identity/Session.cs)
Controle de tokens de autenticação persistentes.
- `UserId` (Guid): Dono da sessão.
- `RefreshTokenHash` (string): Hash de integridade do refresh token.
- `IpAddress` / `UserAgent` (string?): Origem da sessão.
- `ExpiresAt` (DateTime): Expiração do token.
- `RevokedAt` (DateTime?): Revogação manual ou logout.

---

## 4. Domínio ERP Operacional (PostgreSQL - `RuntimeDbContext`)

### 4.1 [`Client`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/ERP/Client.cs)
Clientes cadastrados na base do ERP.
- `Name`, `Surname`, `Email`, `Phone`, `Document` (CPF/CNPJ).
- `Address`, `City`, `State`.
- `Status` ([`ClientStatus`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums/ClientStatus.cs)): `Active`, `Inactive`, `Blocked`.

### 4.2 [`Product`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/ERP/Product.cs) & [`ProductCategory`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/ERP/ProductCategory.cs)
Catálogo e inventário de mercadorias.
- `Name`, `Description`, `Code`, `SKU`.
- `Brand`, `Model`, `Color`, `Size`, `Material`, `Weight`, `ImageUrl`.
- `Price` (decimal): Preço de venda.
- `StockQuantity` (int): Saldo físico de estoque.
- `Status` ([`ProductStatus`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums/ProductStatus.cs)): `Active`, `Inactive`, `Discontinued`.
- Métodos utilitários de negócio: `GenerateSKU()` e `GenerateCode()`.

### 4.3 [`Orders`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/ERP/Orders.cs) & [`Sale`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Entities/ERP/Sale.cs)
- Registros transacionais de vendas e pedidos integrados com os clientes correspondentes.
- `TotalAmount` (decimal), `OrderDate`/`SaleDate` (DateTime), `Status` ([`SaleStatus`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums/SaleStatus.cs)).

---

## 5. Domínio de IA & Runtime Inteligente (PostgreSQL - `RuntimeDbContext`)

### 5.1 [`AiAgent`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/AI/AiAgent.cs)
Definição dos agentes autônomos que operam sobre o ERP.
- `Name`, `Description`: Nome do agente (ex: "Especialista em Fluxo de Caixa").
- `ModelProvider`: Provedor (ex: `"Gemini"`, `"OpenAI"`, `"Anthropic"`).
- `ModelName`: Identificador do modelo (ex: `"gemini-1.5-pro"`, `"gpt-4o"`).
- `SystemPrompt`: Instrução mestre do agente.
- `Temperature`: Ajuste de variabilidade/criatividade.
- `MemoryEnabled`: Habilita busca semântica no histórico.

### 5.2 [`AiMemory`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/AI/AiMemory.cs) (pgvector)
- `AgentId` (Guid): Identificador do agente associado.
- `MemoryType` (string): Ex: `"factual"`, `"procedural"`, `"preference"`.
- `Content` (string): Fato ou conhecimento armazenado.
- `Embedding` (`float[]`): Vetor multidimensional indexado no PostgreSQL via `pgvector` para similaridade por cosseno/produto escalar.

### 5.3 [`BusinessInsight`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/AI/BusinessInsight.cs)
Sugestões proativas do "Modo CEO IA".
- `Type` ([`InsightType`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums/InsightType.cs)): `InventoryAlert`, `PricingOpportunity`, `CustomerRetention`, `CashFlowWarning`, `OperationalBottleneck`.
- `Priority` ([`InsightPriority`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums/InsightPriority.cs)): `Low`, `Medium`, `High`, `Critical`.
- `ActionPayloadJson` (string): Dados JSON para automação com um clique na UI.
- `Status` ([`InsightStatus`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums/InsightStatus.cs)): `Pending`, `Applied`, `Dismissed`.

### 5.4 [`SemanticCache`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/SemanticCache.cs)
Cache vetorial de prompts para evitar chamadas redundantes a LLMs externas.
- `PromptHash`, `Prompt`, `Response`, `Embedding` (`float[]`), `LastUsedAt`.

---

## 6. Domínio de BI & Visualizações (PostgreSQL - `RuntimeDbContext`)

- **[`Dashboard`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/BI/Dashboard.cs)**: Gerencia o canvas visual (`LayoutJson`) e favoritos (`IsFavorite`).
- **[`DashboardVisual`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/BI/DashboardVisual.cs)**: Mapeia cada gráfico específico (`Type` do enum [`ChartType`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums/ChartType.cs), `DataQuerySql`, `ConfigJson`, `RefreshIntervalSeconds`).

---

## 7. Catálogo Completo de Enums ([`Domain/Enums`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Enums))

1. **`BillingCycle`**: `Monthly`, `Quarterly`, `SemiAnnually`, `Annually`
2. **`ChartType`**: `Bar`, `Line`, `Pie`, `Area`, `Donut`, `Heatmap`, `Scatter`, `MetricCard`
3. **`ClientStatus`**: `Active`, `Inactive`, `Blocked`
4. **`InsightPriority`**: `Low`, `Medium`, `High`, `Critical`
5. **`InsightStatus`**: `Pending`, `Applied`, `Dismissed`
6. **`InsightType`**: `InventoryAlert`, `PricingOpportunity`, `CustomerRetention`, `CashFlowWarning`, `OperationalBottleneck`
7. **`InvoiceStatus`**: `Draft`, `Issued`, `Paid`, `Overdue`, `Cancelled`
8. **`MarketplaceItemType`**: `Plugin`, `Agent`, `Theme`, `Integration`
9. **`OutboxEventStatus`**: `Pending`, `Processing`, `Published`, `Failed`
10. **`PaymentStatus`**: `Pending`, `Succeeded`, `Failed`, `Refunded`
11. **`ProductStatus`**: `Active`, `Inactive`, `Discontinued`
12. **`PurchaseStatus`**: `Draft`, `Pending`, `Approved`, `Received`, `Canceled`
13. **`SaleStatus`**: `Pending`, `Completed`, `Canceled`
14. **`SubscriptionStatus`**: `Trialing`, `Active`, `PastDue`, `Canceled`, `Unpaid`
15. **`TenantStatus`**: `Trial`, `Active`, `Suspended`, `Canceled`, `Expired`
