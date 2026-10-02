# File Structure - ArkenERPCore

```text
backend/
├── docs/
│   ├── README.md                          # Índice da documentação
│   ├── technical_documentation.md         # Documento mestre de arquitetura
│   ├── architecture_overview.md           # Federação dual-database e multi-tenancy
│   ├── domain_dictionary.md               # Catálogo de entidades, atributos e enums
│   └── diagnostics_and_roadmap.md         # Auditoria de build e roteiro de evolução
└── ArkenERPCore/
    ├── ArkenERPCore.slnx
    ├── .aimemory/
    │   ├── project-overview.md
    │   └── file-structure.md
    ├── ArkenERP.Lib/
    │   ├── ArkenERP.Lib.csproj
    │   ├── Context/
    │   │   ├── ITenantContext.cs
    │   │   ├── ManagerDbContext.cs        # MySQL (arken_manage)
    │   │   └── RuntimeDbContext.cs        # PostgreSQL 16 (arken_runtime)
    │   ├── Data/
    │   │   └── Migrations/                # Migrações EF Core (Manager & Runtime)
    │   └── Domain/
    │       ├── Entities/
    │       │   ├── Base/ (Entity, AuditableEntity, TenantEntity)
    │       │   ├── ERP/ (Client, Orders, Product, ProductCategory, Sale)
    │       │   ├── Identity/ (User, TenantUser, Role, RolePermission, Session)
    │       │   ├── Observability/ (AuditLog)
    │       │   └── Tenancy/ (Tenant, TenantSettings, TenantStatus)
    │       ├── Enums/ (15 enums tipados)
    │       └── Runtime/
    │           ├── AI/ (AiAgent, AiConversation, AiMemory, AiMessage, BusinessInsight, OptimizationLog)
    │           ├── BI/ (Dashboard, DashboardVisual)
    │           ├── Website/ (Website, WebsitePage, WebsiteComponent, WebsiteLayout, etc.)
    │           ├── EntitiesRegistry.cs
    │           ├── FileEntity.cs
    │           ├── IntegrationLog.cs
    │           ├── IntegrationRuntime.cs
    │           ├── McpOperation.cs
    │           ├── OutboxEvent.cs
    │           └── SemanticCache.cs
    └── ArkenERPCore/
        ├── ArkenERP.Core.csproj
        ├── Program.cs
        ├── appsettings.json
        ├── appsettings.Development.json
        ├── API/Middlewares/TenantResolverMiddleware.cs
        ├── Controllers/
        ├── Interceptors/TenantSaveChangesInterceptor.cs
        └── Security/TenantContext.cs
```
