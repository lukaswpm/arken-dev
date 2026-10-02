# ArkenERP Lite - Documentação Técnica

Aplicação web moderna de gestão empresarial (ERP) construída com arquitetura de **Mini-Framework Modular**, foco em alta fidelidade visual, consistência de design e recursos inteligentes orientados por IA.

---

## 🚀 Tecnologias Utilizadas

- **Core**: React 19, TypeScript 5, Vite 8
- **Design System & UI**: Material UI (MUI v6) com `@emotion/react` e `@emotion/styled`
- **Ícones**: `@mui/icons-material`
- **Roteamento**: `react-router-dom` v6
- **Tipografia**: Família *Inter* e *Roboto*

---

## 🏛️ Arquitetura: Mini-Framework (`src/framework`)

O projeto é estruturado em torno de um mini-framework reutilizável que desacopla a apresentação, regras de tema e modelos de dados, permitindo acelerar o desenvolvimento de novos módulos mantendo uniformidade visual estrita.

```text
src/framework/
├── index.ts                  # Barrel export centralizado de componentes e modelos
├── theme/                    # Design tokens e customização do tema MUI
│   ├── tokens.ts             # Cores HSL, gradientes, bordas e tipografia
│   └── theme.ts              # Overrides dos componentes base do MUI
├── components/
│   ├── layout/               # ArkenLayout, Sidebar colapsável, Topbar dinâmica
│   ├── kpi/                  # KpiCard com setas semânticas e suporte a 5 tonalidades
│   ├── cards/                # SectionCard, ActionCard, OrderDetailsCard, ProductDetailCard, CustomerDetailCard
│   ├── tables/               # DataTable genérico, StatusChip padronizado com cores semânticas
│   ├── charts/               # AreaLineChart, DonutChart, HorizontalBarChart, CashFlowChart
│   ├── ai/                   # AIAssistantDrawer, SalesAICard, FinanceAICard
│   └── filters/              # DateRangeSelect com presets temporais
└── data/                     # Modelos de dados e mocks fortemente tipados
    ├── mockData.ts           # Métricas e transações do Dashboard
    ├── salesMockData.ts      # Pedidos e histórico de faturamento
    ├── productsMockData.ts   # Catálogo completo com 10 produtos e fotos reais
    ├── financialMockData.ts  # Fluxo de caixa diário, contas a pagar e receber
    └── customersMockData.ts  # Catálogo com 10 clientes, documentos, avatares e métricas
```

---

## 📱 Telas Implementadas

| Rota | Módulo | Descrição dos Recursos |
|---|---|---|
| `/dashboard` | **Dashboard** | 4 KPIs executivos, gráfico de faturamento semestral, gráfico em rosca de categorias, pedidos recentes e atalhos rápidos. |
| `/sales` | **Vendas** | Indicadores de conversão, tabela de pedidos com filtros de status/datas, detalhes do pedido (`OrderDetailsCard`) e card preditivo de vendas (`SalesAICard`). |
| `/products` | **Produtos** | Gestão de inventário com alternância Lista/Grade, filtros por categoria/status, fotos de alta qualidade e painel lateral com ficha técnica (`ProductDetailCard`). |
| `/finance` | **Financeiro** | Painel de fluxo de caixa diário (Entradas vs Saídas e Saldo), tabelas paralelas de Contas a Pagar/Receber, fornecedores líderes, títulos em atraso e IA de diagnóstico financeiro (`FinanceAICard`). |
| `/customers` | **Clientes** | Tabela rica com avatares dedicados (fotos de estúdio e iniciais), documentos formatados, cidades capixabas, seleção dinâmica e painel lateral (`CustomerDetailCard`) com produtos mais comprados, insights preditivos e prompt de IA interativo. |

---

## 🎨 Boas Práticas e Padrões Estabelecidos

1. **Separação de Checkboxes e Conteúdo**:
   Todas as tabelas utilizam largura fixa na coluna de checkbox (`width: 38`, `pl: 1.25`) e recuo generoso na coluna adjacente (`pl: 2` / ~16px), garantindo que o checkbox nunca encoste no texto ou avatar.

2. **StatusChip Semântico**:
   Centralização de cores de status em `StatusChip.tsx` com tratamento nativo para:
   - `Ativo`, `Concluído`, `Pago`, `Em estoque` → Fundo verde claro e texto verde escuro.
   - `Inativo`, `Pendente`, `Estoque baixo` → Fundo âmbar claro e texto âmbar escuro.
   - `Cancelado`, `Sem estoque` → Fundo vermelho claro e texto vermelho escuro.

3. **Topbar com Busca Contextual Inteligente**:
   O campo de busca global ajusta seu *placeholder* automaticamente de acordo com o módulo ativo na URL.

4. **Imagens Reais e Assets Otimizados**:
   Fotografias em alta definição salvas em `/public/images/` para produtos (notebooks, periféricos, acessórios) e avatares executivos (João, Fernanda, Santos, Ana e Lucas).

---

## 🛠️ Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento (Vite com HMR)
npm run dev

# Checagem de tipos TypeScript e compilação para produção
npm run build
```

---

> Para a documentação técnica expandida com diagrama de arquitetura e contratos de dados, consulte o artefato [technical_documentation.md](file:///C:/Users/lukas/.gemini/antigravity-ide/brain/6e112fef-465d-4b95-a3d7-e9c9b98962de/technical_documentation.md).
