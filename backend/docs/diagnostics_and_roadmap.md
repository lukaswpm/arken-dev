# Diagnóstico Técnico e Roadmap de Implementação - ArkenERP Backend

> **Módulo**: Auditoria de Código, Débitos Técnicos e Plano de Ação  
> **Sistema**: ArkenERPCore (.NET 10 / ASP.NET Core)  
> **Data de Auditoria**: Outubro/2026  

---

## 1. Diagnóstico de Compilação e Código

Durante a análise técnica aprofundada da solução [ArkenERPCore.slnx](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERPCore.slnx), foi executado o comando `dotnet build` e foram identificados **4 erros de compilação** e **6 avisos de dependência**.

### 1.1 Erros de Compilação Detectados (`ArkenERP.Lib`)

Os arquivos do módulo `Website` sob a pasta [`Domain/Runtime/Website/`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/Website) foram importados com referências ao namespace de um projeto anterior (`ArkenAPI`):

1. **[`Website.cs:L1`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/Website/Website.cs#L1)**:
   - Erro `CS0234`: `The type or namespace name 'Entities' does not exist in the namespace 'ArkenAPI.Domain'`.
   - Causa: Linha 1 possui `using ArkenAPI.Domain.Entities.Base;` e Linha 8 possui `namespace ArkenAPI.Domain.Runtime.Website`.
   - **Correção Necessária**: Alterar para `using ArkenERP.Lib.Domain.Entities.Base;` e `namespace ArkenERP.Lib.Domain.Runtime.Website`.

2. **[`WebsitePage.cs:L1`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/Website/WebsitePage.cs#L1)**:
   - Erro `CS0234`: `The type or namespace name 'Entities' does not exist in the namespace 'ArkenAPI.Domain'`.
   - Causa: Linha 1 possui `using ArkenAPI.Domain.Entities.Base;` e Linha 9 possui `namespace ArkenAPI.Domain.Runtime.Website`.
   - **Correção Necessária**: Alterar para `using ArkenERP.Lib.Domain.Entities.Base;` e `namespace ArkenERP.Lib.Domain.Runtime.Website`.

3. **Arquivos Adjacentes no Módulo Website**:
   - [`WebsiteComponent.cs`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/Website/WebsiteComponent.cs), [`WebsiteLayout.cs`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/Website/WebsiteLayout.cs), [`WebsiteThemeConfig.cs`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/Website/WebsiteThemeConfig.cs) e [`SeoMetadata.cs`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/Website/SeoMetadata.cs) devem ter seus namespaces padronizados para `ArkenERP.Lib.Domain.Runtime.Website`.

### 1.2 Avisos de Restrição de Pacotes NuGet (NU1608)

O projeto está configurado para o Target Framework `.NET 10.0` (`net10.0` preview):
- `Pomelo.EntityFrameworkCore.MySql` versão `9.0.0` requer EF Core Relational `>= 9.0.0 && <= 9.0.999`, enquanto o projeto referencia `10.0.12`.
- `Microsoft.AspNetCore.OpenApi` `10.0.12` requer `Microsoft.OpenApi` `< 3.0.0`, enquanto o projeto referencia `3.10.2`.
- **Ação recomendada**: Manter alinhamento entre as versões de pacotes ou padronizar para a versão estável LTS (.NET 9) caso a prévia do .NET 10 cause incompatibilidades em tempo de execução com o driver MySQL Pomelo.

---

## 2. Matriz de Prontidão da Arquitetura

| Camada / Componente | Status Atual | O Que Está Feito | O Que Falta Implementar |
| :--- | :---: | :--- | :--- |
| **Modelagem de Domínio** | **100% Concluído** | Todas as entidades de ERP, Tenancy, Identity, AI e BI criadas e tipadas | Ajustar namespaces de 6 arquivos em `Website/` |
| **EF Core DbContexts** | **95% Concluído** | `ManagerDbContext` e `RuntimeDbContext` com `snake_case` e extensões | Registrar no DI em `Program.cs` com connection strings |
| **Isolamento Multi-Tenant** | **90% Concluído** | Middleware, Context e Interceptor prontos | Registrar middleware `TenantResolverMiddleware` no pipeline HTTP |
| **Infraestrutura Docker** | **100% Concluído** | MySQL 8 e Postgres 16 com `mysql_fdw` e `pgvector` prontos no docker-compose | - |
| **Especificação OpenAPI** | **90% Concluído** | Configuração do header `X-Tenant-ID` aplicada | Testar com endpoints reais |
| **Configuração de Conexão** | **20% Concluído** | Arquivos `appsettings` presentes | Inserir connection strings dos bancos MySQL e Postgres |
| **Controllers & Endpoints** | **0% Concluído** | Pasta `Controllers/` existente | Criar controllers para Auth, Tenants, Clientes, Produtos e Vendas |
| **Camada de Serviços (BLL)** | **0% Concluído** | - | Criar serviços de aplicação desacoplados com interfaces |
| **Migrações EF Core** | **0% Concluído** | - | Gerar `Initial_Create` para MySQL e PostgreSQL |

---

## 3. Roteiro Passo a Passo de Implementação (Roadmap)

### Fase 1: Correção do Build e Baseline Operacional (Imediato)
1. **Padronizar Namespaces**:
   Substituir referências a `ArkenAPI` por `ArkenERP.Lib` nos 6 arquivos da pasta [`Domain/Runtime/Website/`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERP.Lib/Domain/Runtime/Website).
2. **Validar Compilação**:
   Executar `dotnet build ArkenERPCore.slnx` até obter status verde (0 erros).

### Fase 2: Configuração do Host e Injeção de Dependências ([`Program.cs`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERPCore/Program.cs))
1. **Adicionar Connection Strings** em [`appsettings.Development.json`](file:///e:/Projects/Lucas/arken-dev/backend/ArkenERPCore/ArkenERPCore/appsettings.Development.json):
   ```json
   {
     "ConnectionStrings": {
       "ManagerDb": "Server=localhost;Port=3306;Database=arken_manage;User=arken_user;Password=GbcL9c1hw98YiZgCT4h1w9j86G306EWQ;",
       "RuntimeDb": "Host=localhost;Port=5432;Database=arken_runtime;Username=arken_user;Password=oawR731Ps68y06KPEgsEM0MRgB0eF66X;"
     }
   }
   ```
2. **Registrar DbContexts e Interceptor no DI**:
   - Registrar `TenantSaveChangesInterceptor` como `Singleton` ou `Scoped`.
   - Adicionar `ManagerDbContext` com `UseMySql(...)`.
   - Adicionar `RuntimeDbContext` com `UseNpgsql(...)` e `.UseVector()`.
3. **Plugar o Middleware**:
   - Inserir `app.UseMiddleware<TenantResolverMiddleware>();` no pipeline antes de `app.MapControllers()`.

### Fase 3: Geração das Migrações Iniciais do Banco de Dados
1. **Migrações do Manager (MySQL)**:
   ```powershell
   dotnet ef migrations add InitialManagerCreate --project ArkenERP.Lib.csproj --startup-project ArkenERPCore.csproj --context ManagerDbContext --output-dir Domain/Infrastructure/Data/Manage
   ```
2. **Migrações do Runtime (PostgreSQL)**:
   ```powershell
   dotnet ef migrations add InitialRuntimeCreate --project ArkenERP.Lib.csproj --startup-project ArkenERPCore.csproj --context RuntimeDbContext --output-dir Domain/Infrastructure/Data/Runtime
   ```
3. **Aplicar aos Bancos**:
   Executar `dotnet ef database update --context ManagerDbContext` e `dotnet ef database update --context RuntimeDbContext`.

### Fase 4: Camada de Serviços e Controllers
1. **Serviços de Domínio / Aplicação**:
   - `ITenantService` / `TenantService`: Criação e ativação de tenants.
   - `IProductService` / `ProductService`: CRUD de catálogo e inventário.
   - `IOrderService` / `OrderService`: Fluxo de vendas e pedidos.
   - `IAiAgentService` / `AiAgentService`: Execução de agentes e consulta a memórias com `pgvector`.
2. **Controllers REST**:
   - `TenantsController`: Endpoints de gestão de empresas.
   - `ProductsController`: Endpoints integrados com o frontend (`/api/v1/products`).
   - `CustomersController`: Endpoints para gestão de clientes (`/api/v1/customers`).
   - `SalesController`: Endpoints para pedidos e vendas (`/api/v1/sales`).
   - `AiController`: Endpoints para geração de insights e assistente de chat.

### Fase 5: Integração Frontend-Backend
1. Conectar as telas do frontend `arken-erp-lite` (que atualmente utilizam os dados de mock em `src/framework/data/`) aos novos endpoints da API, enviando o cabeçalho `X-Tenant-ID` em cada requisição do cliente HTTP (`axios` ou `fetch`).
