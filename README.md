# ArkenERP — Next-Gen AI-Powered Cloud ERP

[![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16%20(pgvector)-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![MySQL 8](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Material UI](https://img.shields.io/badge/MUI-v6-007FFF?logo=mui&logoColor=white)](https://mui.com/)

**ArkenERP** is an enterprise-grade, multi-tenant Cloud ERP system featuring a **federated dual-database architecture** (.NET 10 Web API), an **autonomous AI Assistant engine**, and a high-fidelity **React 19 + TypeScript SPA**. Built from the ground up for high throughput, strict tenant isolation, and modern SaaS aesthetics.

---

## Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │        React 19 + TypeScript SPA       │
                      │  (Custom SaaS Design System / MUI v6)  │
                      └───────────────────┬────────────────────┘
                                          │  HTTP / REST + Bearer JWT
                                          │  X-Tenant-ID Header
                                          ▼
                      ┌────────────────────────────────────────┐
                      │        ASP.NET Core Web API 10         │
                      │ ────────────────────────────────────── │
                      │  • TenantResolverMiddleware (Fail-Fast)│
                      │  • JWT Auth & Refresh Token Rotation   │
                      │  • Automated Migration & Data Seeder   │
                      └──────────────┬──────────────────┬──────┘
                                     │                  │
           Tenant & Identity Context │                  │ Operational & AI Domain
             (ManagerDbContext)      │                  │   (RuntimeDbContext)
                                     ▼                  ▼
                    ┌──────────────────────┐  ┌──────────────────────┐
                    │       MySQL 8        │  │    PostgreSQL 16     │
                    │   (`arken_manage`)   │  │   (`arken_runtime`)  │
                    │ ──────────────────── │  │ ──────────────────── │
                    │ • Tenants & Domains  │  │ • Products & Stock   │
                    │ • Users & RBAC Roles │  │ • Customers & Orders │
                    │ • Refresh Tokens     │  │ • AI Insights & Agent│
                    │ • Audit Logs         │  │ • pgvector Semantic  │
                    └──────────────────────┘  └──────────────────────┘
```

---

## Key Highlights & Features

### 1. Dual-Database Federated Engine
- **MySQL 8 (`arken_manage` — Port 3308):** Manages identity, RBAC security (`Roles`, `Permissions`), cryptographic refresh tokens, tenant routing, and audit logs.
- **PostgreSQL 16 (`arken_runtime` — Port 5433):** High-performance transactional operational store with `pgvector` extension for vector embeddings, dynamic BI metrics, business bottlenecks, and sales pipelines.
- **EF Core Migrations:** Strict code-first migration strategy with automated database migration on startup.

### 2. Multi-Tenancy & Enterprise Security
- **Header-Driven Isolation:** Every operational request enforces the `X-Tenant-ID` header.
- **Fail-Fast Tenant Middleware:** Unauthorized or missing tenant contexts are rejected before hitting controllers.
- **EF Core Interceptor:** `TenantSaveChangesInterceptor` automatically injects the tenant ID into all tenant-scoped entities during persistence.
- **Authentication:** Dual-token JWT (Access Token + sliding window cryptographic Refresh Token with rotation).

### 3. Business Intelligence & AI Assistant
- **Real-Time KPIs:** Dynamic calculation of revenue velocity, customer retention rates, inventory health, and average ticket directly from the database without hardcoded values.
- **Autonomous Insights:** AI anomaly and opportunity detector (`BusinessInsight`) evaluating stock bottlenecks and customer engagement.
- **Embedded AI Assistant:** Sticky conversational drawer integrated directly into the dashboard for natural-language queries.

---

## Modules & Views

| Module | Description | Key Tech |
|---|---|---|
| **Authentication** | Two-column split login screen with 3D branding, multi-language selector, social SSO buttons, and JWT lifecycle | React 19, JWT, LocalStorage Sync |
| **Executive Dashboard** | Real-time overview of revenue charts, category shares (donut chart), recent orders, and quick ERP actions | MUI Charts, Area Charts, KPIs |
| **Catalog & Products** | Comprehensive inventory management, stock status badges, dynamic category filters, and product creation modal | DataTable, Modal Dialogs, Image Picker |
| **Customers (CRM)** | Customer directory, financial history, top purchased products, retention analytics, and contact card | CustomerDetailCard, Dynamic Avatars |
| **Sales & Orders** | Order lifecycle tracker, fulfillment status chips, temporal revenue breakdown, and sales conversion | Dynamic Filtering, Pagination |
| **Financial Overview** | Cash flow projection, accounts receivable/payable, supplier rankings, and transaction ledger | CashFlowChart, Financial Analytics |

---

## Tech Stack

### Backend
- **Framework:** .NET 10.0 (`net10.0`) ASP.NET Core Web API
- **ORM:** Entity Framework Core 10.0 (Pomelo MySQL + Npgsql PostgreSQL with `pgvector`)
- **Authentication:** Microsoft.AspNetCore.Authentication.JwtBearer + System.IdentityModel.Tokens.Jwt
- **Architecture:** Clean Architecture / Service-Oriented Domain Driven Design (DDD)
- **API Documentation:** OpenAPI / Swagger (`/openapi/v1.json`)

### Frontend
- **Runtime & Bundler:** React 19 + TypeScript + Vite + Rolldown
- **UI Components:** Material UI (MUI v6) + Custom Design System (`src/framework/`)
- **State & HTTP:** Centralized API client (`fetch`) with automatic Bearer token and `X-Tenant-ID` injection
- **Icons:** Material Icons & Lucide Icons

### Database & DevOps
- **Docker Compose:** Multi-service orchestration (MySQL 8 + PostgreSQL 16)
- **Persistence:** Local volume bindings in `./db/` with resource limits

---

## Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/) (v18+) and [Yarn](https://yarnpkg.com/)

---

### 1. Start Database Containers

Clone the repository and launch the databases via Docker Compose:

```bash
# Clone the repository
git clone https://github.com/lukaswpm/arken-dev.git
cd arken-dev

# Start MySQL and PostgreSQL
docker-compose up -d
```

Verify that both containers are healthy:
- **MySQL (`arken_manage`):** `localhost:3308`
- **PostgreSQL (`arken_runtime`):** `localhost:5433`

---

### 2. Run the Backend API

```bash
cd backend/ArkenERPCore/ArkenERPCore

# Restore dependencies and launch
dotnet run
```

> **Automatic Migration & Seed:** On the first run, the backend will automatically apply all pending EF Core migrations to both databases and seed the default tenant, admin user, product categories, catalog items, and customers.

API will be available at: `http://localhost:5247`  
OpenAPI specification: `http://localhost:5247/openapi/v1.json`

---

### 3. Run the Frontend SPA

In a new terminal window:

```bash
cd frontend/arken-erp-lite

# Install dependencies
yarn install

# Start Vite development server
yarn dev
```

Open your browser at: `http://localhost:5173`

---

### 4. Default Seed Credentials

| Property | Value |
|---|---|
| **URL** | `http://localhost:5173/login` |
| **Email** | `lucas@arken.io` |
| **Password** | `admin123` |
| **Tenant** | `loja-modelo` |

---

## Project Structure

```text
arken-dev/
├── docker-compose.yml                   # Docker composition (MySQL 8 + PostgreSQL 16)
├── db/                                  # Database volume persistence
├── backend/
│   ├── docs/                            # Deep-dive architecture and domain documentation
│   └── ArkenERPCore/
│       ├── ArkenERPCore.slnx            # Solution definition
│       ├── ArkenERP.Lib/                # Domain entities, EF Core DbContexts, and Migrations
│       │   ├── Context/                 # ManagerDbContext (MySQL) & RuntimeDbContext (Postgres)
│       │   ├── Data/Migrations/         # Code-first migrations (Manager & Runtime)
│       │   └── Domain/Entities/         # ERP, Identity, Tenancy, BI & AI Entities
│       └── ArkenERPCore/                # Web API project
│           ├── Controllers/             # REST controllers (Auth, Products, Customers, Sales, Dashboard)
│           ├── API/Middlewares/         # TenantResolverMiddleware
│           ├── Data/DataSeeder.cs       # Production-ready database seeder
│           └── Services/                # JWT & Authentication services
└── frontend/
    └── arken-erp-lite/
        ├── public/images/               # Local product photography and customer avatars
        └── src/
            ├── framework/               # Reusable ERP design system (Cards, Tables, Charts, Topbar)
            ├── pages/                   # Application views (Dashboard, Products, Customers, Sales, Login)
            └── services/                # HTTP API Client & service integration layer
```

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details. Built by **Lucas** as a professional portfolio demonstration of modern enterprise software architecture.
