# Documentação Técnica - ArkenERP Lite

> **Versão**: 1.0.0  
> **Status**: Estável / Pronto para Produção  
> **Arquitetura**: Frontend Mini-Framework Modular (React 19 + TypeScript + MUI v6 + Vite)

---

## 1. Visão Geral do Sistema

O **ArkenERP Lite** é uma aplicação web empresarial projetada para alta performance, consistência visual e máxima reutilização de componentes. Concebido como um **mini-framework**, o projeto separa claramente as camadas de layout, apresentação, estado de tela e componentes analíticos/preditivos alimentados por IA.

### Stack Tecnológica
- **Linguagem & Runtime**: TypeScript 5.x / React 19
- **Build Tool & Bundler**: Vite 8.x
- **Biblioteca de Componentes**: Material UI (MUI v6) com `@emotion/react` e `@emotion/styled`
- **Ícones**: `@mui/icons-material`
- **Roteamento**: `react-router-dom` v6
- **Tipografia**: Família *Inter* e *Roboto*

---

## 2. Estrutura de Diretórios

A estrutura do projeto foi organizada seguindo o padrão de domínio e separação de responsabilidades:

```text
arken-erp-lite/
├── public/
│   └── images/                     # Ativos estáticos e fotografias de produtos/avatares
│       ├── notebook.jpg            # Foto real Dell Inspiron
│       ├── mouse.jpg               # Foto real Mouse Sem Fio
│       ├── cable.jpg               # Foto real Cabo HDMI
│       ├── keyboard.jpg            # Foto real Teclado Mecânico
│       ├── dell_hero.jpg           # Imagem hero para detalhes de notebook
│       ├── lucas_avatar.jpg        # Foto de perfil do usuário administrador
│       ├── joao.jpg                # Foto de perfil João Ferreira
│       ├── fernanda.jpg            # Foto de perfil Fernanda Costa
│       ├── santos.jpg              # Foto Distribuidora Santos
│       └── ana.jpg                 # Foto de perfil Ana Paula Lima
├── src/
│   ├── App.tsx                     # Roteador central e provedor de tema
│   ├── navigation.tsx              # Itens e rotas do menu de navegação
│   ├── index.css                   # Resets globais de tipografia e layout
│   ├── framework/                  # MINI-FRAMEWORK ARKEN
│   │   ├── index.ts                # Barrel export centralizado de componentes e dados
│   │   ├── theme/                  # Sistema de design tokens e tema MUI
│   │   │   ├── tokens.ts           # Cores HSL, espaçamentos, sombras e tipografia
│   │   │   └── theme.ts            # Configuração e overrides do MUI createTheme
│   │   ├── components/             # Biblioteca de componentes reutilizáveis
│   │   │   ├── layout/             # Shell principal, Topbar e Sidebar
│   │   │   │   ├── ArkenLayout.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Topbar.tsx
│   │   │   ├── kpi/                # Indicadores de desempenho (KPIs)
│   │   │   │   └── KpiCard.tsx
│   │   │   ├── cards/              # Cards especializados de conteúdo e detalhe
│   │   │   │   ├── SectionCard.tsx
│   │   │   │   ├── ActionCard.tsx
│   │   │   │   ├── OrderDetailsCard.tsx
│   │   │   │   ├── ProductDetailCard.tsx
│   │   │   │   └── CustomerDetailCard.tsx
│   │   │   ├── tables/             # Tabelas estruturadas e chips semânticos
│   │   │   │   ├── DataTable.tsx
│   │   │   │   └── StatusChip.tsx
│   │   │   ├── charts/             # Gráficos e visualizações de dados
│   │   │   │   ├── AreaLineChart.tsx
│   │   │   │   ├── DonutChart.tsx
│   │   │   │   ├── HorizontalBarChart.tsx
│   │   │   │   └── CashFlowChart.tsx
│   │   │   ├── ai/                 # Componentes analíticos e preditivos com IA
│   │   │   │   ├── AIAssistantDrawer.tsx
│   │   │   │   ├── SalesAICard.tsx
│   │   │   │   └── FinanceAICard.tsx
│   │   │   └── filters/            # Controles de filtro e datas
│   │   │       └── DateRangeSelect.tsx
│   │   └── data/                   # Modelos de dados e mocks fortemente tipados
│   │       ├── mockData.ts         # Dados de Dashboard
│   │       ├── salesMockData.ts    # Dados de Vendas e Pedidos
│   │       ├── productsMockData.ts # Dados de Catálogo e Produtos
│   │       ├── financialMockData.ts# Dados de Fluxo de Caixa e Títulos
│   │       └── customersMockData.ts# Dados de Clientes e Perfis
│   └── pages/                      # Telas da Aplicação
│       ├── DashboardPage.tsx       # Visão Geral (/dashboard)
│       ├── SalesPage.tsx           # Gestão de Vendas (/sales)
│       ├── ProductsPage.tsx        # Catálogo de Produtos (/products)
│       ├── FinancialPage.tsx       # Gestão Financeira (/finance)
│       ├── CustomersPage.tsx       # Gestão de Clientes (/customers)
│       └── ModulePage.tsx          # Placeholder dinâmico para módulos em construção
```

---

## 3. O Mini-Framework (`src/framework`)

O mini-framework foi concebido para que qualquer desenvolvedor possa criar novas páginas de ERP em minutos com **100% de consistência visual**, sem reescrever estilos CSS ou regras de layout.

### 3.1 Design System & Tokens ([`theme/tokens.ts`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/theme/tokens.ts))
Define os valores canônicos da identidade Arken:
- **Cores de Destaque**:
  - `primary`: `#2563eb` (azul vibrante) com hover `#1d4ed8`.
  - `success`: `#16a34a` (verde status positivo) com fundo `#dcfce7`.
  - `warning`: `#b45309` (âmbar pendente/inativo) com fundo `#fef3c7`.
  - `error`: `#b91c1c` (vermelho) com fundo `#fee2e2`.
  - `purple`: `#8b5cf6` (marca IA) com fundo `#f5f3ff`.
- **Neutros**:
  - Fundo principal: `#f8fafc`.
  - Fundo de cards/superfícies: `#ffffff`.
  - Bordas: `#e2e8f0` e `#cbd5e1`.
  - Texto principal: `#0f172a`.
  - Texto secundário/caption: `#64748b` e `#94a3b8`.

### 3.2 Shell de Layout
- **[`ArkenLayout.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/layout/ArkenLayout.tsx)**: Organiza a viewport com `Sidebar` fixa à esquerda, `Topbar` persistente no topo e contêiner principal com espaçamento `px: { xs: 2, md: 3.5 }, py: 3`.
- **[`Sidebar.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/layout/Sidebar.tsx)**:
  - Navegação entre rotas (`/dashboard`, `/sales`, `/products`, `/customers`, `/inventory`, `/finance`, `/reports`, `/settings`).
  - Destaque com efeito de pílula azul suave para o item ativo.
  - Subseções colapsáveis com setas animadas.
  - Card promocional "Assistente IA" no rodapé e perfil do administrador Lucas Santos.
- **[`Topbar.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/layout/Topbar.tsx)**:
  - Barra de busca global com **placeholder contextual** que detecta a rota atual:
    - `/customers`: `"Buscar por nome, documento, email ou telefone..."`
    - `/finance`: `"Buscar por descrição, fornecedor, categoria ou qualquer termo..."`
    - `/products`: `"Buscar por nome, código, categoria ou código de barras..."`
    - `/sales`: `"Buscar por número do pedido, cliente, produto..."`
  - Sino de notificações com badge numérico interativo e perfil de usuário.

---

## 4. Componentes Centrais Reutilizáveis

### 4.1 [`KpiCard.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/kpi/KpiCard.tsx)
Cartão para exibição de métricas vitais.
- **Propriedades**: `label`, `value`, `change`, `caption`, `trendDirection` (`'up' | 'down'`), `tone` (`'blue' | 'green' | 'purple' | 'orange' | 'red'`), `icon`.
- **Comportamento**: Exibe ícone com fundo tonal, valor em destaque com tipografia forte, seta de variação com cor semântica e legenda sem risco de truncamento.

### 4.2 [`StatusChip.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/tables/StatusChip.tsx)
Badge semântico padronizado para tabelas e cards.
- **Mapeamento de Cores Integrado**:
  - `Ativo`, `Concluído`, `Pago`, `Em estoque` → Verde (`bg: '#dcfce7', color: '#15803d'`).
  - `Inativo`, `Pendente`, `Estoque baixo` → Âmbar (`bg: '#fef3c7', color: '#b45309'`).
  - `Cancelado`, `Sem estoque` → Vermelho (`bg: '#fee2e2', color: '#b91c1c'`).
  - `Processando`, `Em andamento` → Azul (`bg: '#dbeafe', color: '#1d4ed8'`).
- **Resolução de Clipping**: Largura mínima ajustada para que status longos (ex.: *Inativo*) nunca quebrem ou fiquem com reticências.

### 4.3 Padrão de Checkbox em Tabelas
Para resolver a questão de checkboxes colados ao texto da coluna adjacente:
```tsx
// 1. Célula de Checkbox com largura estrita e padding direcionado:
<TableCell sx={{ width: 38, minWidth: 38, maxWidth: 38, p: 0, pl: 1.25, pr: 0 }}>
  <Checkbox size="small" checked={isSelected} ... />
</TableCell>

// 2. Coluna adjacente com recuo generoso (pl: 2 / 16px):
<TableCell sx={{ width: '25%', pl: 2 }}>
  {/* Conteúdo com folga adequada */}
</TableCell>
```

---

## 5. Módulos e Telas Construídas

### 5.1 Dashboard Geral ([`DashboardPage.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/pages/DashboardPage.tsx) - `/dashboard`)
- 4 KPIs estratégicos (Faturamento, Total de Pedidos, Ticket Médio, Clientes Ativos).
- Gráfico de Faturamento dos últimos 6 meses com linha de tendência.
- Gráfico de Vendas por Categoria em rosca.
- Tabela com os pedidos recentes e status em tempo real.
- Atalhos de ações rápidas operacionais.

### 5.2 Vendas ([`SalesPage.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/pages/SalesPage.tsx) - `/sales`)
- Indicadores de conversão, ticket médio e volume faturado.
- Tabela de pedidos com filtro de datas e status.
- Card lateral [`OrderDetailsCard.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/cards/OrderDetailsCard.tsx) detalhando itens do pedido e valores unitários.
- Card analítico [`SalesAICard.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/ai/SalesAICard.tsx) com ranking de produtos vendidos e query SQL para exportação direta.

### 5.3 Produtos ([`ProductsPage.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/pages/ProductsPage.tsx) - `/products`)
- Indicadores de estoque: Total de Produtos, Em Estoque, Alerta de Estoque Baixo e Rupturas.
- Barra de filtros com busca, categoria, status e seletor de modo de visualização (Lista vs Grade).
- Tabela com thumbnails dos produtos, código de referência, preço de venda e margem.
- Painel lateral [`ProductDetailCard.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/cards/ProductDetailCard.tsx) com fotografia do item, dados de garantia/dimensões e insights de reposição da IA.

### 5.4 Financeiro ([`FinancialPage.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/pages/FinancialPage.tsx) - `/finance`)
- KPIs de Receitas, Despesas, Contas a Receber e Contas a Pagar.
- Gráfico de Fluxo de Caixa diário ([`CashFlowChart.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/charts/CashFlowChart.tsx)) comparando Entradas vs Saídas com linha de saldo.
- Grade dividida em duas colunas:
  - Esquerda: Tabelas sincronizadas de Contas a Receber e Contas a Pagar.
  - Direita: Tabela de Principais Fornecedores, Card de Alerta de Títulos Vencidos com contadores de dias de atraso e [`FinanceAICard.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/ai/FinanceAICard.tsx) com diagnóstico financeiro.

### 5.5 Clientes ([`CustomersPage.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/pages/CustomersPage.tsx) - `/customers`)
- **Header**: Breadcrumbs `Clientes > Lista`, título com subtítulo de apoio e botões `+ Novo Cliente` e `Filtros ˅`.
- **KPIs**: Total de Clientes (128), Clientes Ativos (112), Novos no Mês (18) e Ticket Médio (R$ 3.820,50).
- **Filtros**: Busca rápida, status (*Todos, Ativo, Inativo*), cidades (*Vitória, Vila Velha, Serra, Cariacica, Viana, Guarapari*) e ordenação.
- **Tabela**: 10 clientes com avatares em cores dedicadas ou fotos de alta qualidade, CNPJ/CPF formatados e última compra.
- **Interatividade**: Seleção de linha com realce visual (`#f0f7ff`) e sincronização imediata com o painel lateral.
- **Painel Lateral ([`CustomerDetailCard.tsx`](file:///e:/Projects/Lucas/arken-dev/frontend/arken-erp-lite/src/framework/components/cards/CustomerDetailCard.tsx))**:
  - Links de topo `← Voltar para a lista` e botão `Editar`.
  - Dados completos de contato e localização.
  - 4 abas operacionais (*Visão Geral, Compras, Financeiro, Observações*).
  - Métricas de compras: *Total Comprado, Última Compra e Ticket Médio*.
  - Lista de produtos mais adquiridos com fotos reais e totalizadores.
  - Card de **Insights da IA** com análises preditivas e botão de ação direta.
  - Barra inferior de prompt para perguntas conversacionais sobre o cliente.

---

## 6. Como Executar e Validar

### Instalação de Dependências
```bash
npm install
# ou
yarn install
```

### Execução em Ambiente de Desenvolvimento
```bash
npm run dev
# Servidor disponível em http://localhost:5173
```

### Validação de Tipagem e Build de Produção
```bash
npm run build
# Executa tsc -b e vite build garantindo zero erros de tipagem
```

---

## 7. Diretrizes para Novos Desenvolvimentos

1. **Reaproveitamento de Componentes**: Sempre verifique se o elemento necessário já existe em `src/framework/`. Novos cards ou tabelas devem estender os componentes existentes.
2. **Tokens de Design**: Evite cores hexadecimais arbitrarias nos componentes de página; utilize a paleta centralizada em `src/framework/theme/tokens.ts` ou as cores semânticas já configuradas no tema do MUI.
3. **Padrão de Tabelas**: Mantenha o recuo padronizado entre colunas de checkbox e conteúdo (`pl: 2` na coluna seguinte).
4. **Imagens Reais**: Ao adicionar novos produtos ou clientes, evite placeholders genéricos; posicione imagens otimizadas em `/public/images/`.
