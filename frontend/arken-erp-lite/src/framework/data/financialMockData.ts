import type { CategoryShare } from './mockData'

export interface CashFlowPoint {
  date: string
  entradas: number
  saidas: number
  saldo: number
}

export interface ReceivableItem {
  id: string
  cliente: string
  descricao: string
  vencimento: string
  valor: string
  status: 'Pendente' | 'Pago'
}

export interface PayableItem {
  id: string
  fornecedor: string
  descricao: string
  vencimento: string
  valor: string
  status: 'Pendente' | 'Pago'
}

export interface SupplierItem {
  id: string
  fornecedor: string
  totalComprado: string
  ultimaCompra: string
}

export interface OverdueItem {
  id: string
  titulo: string
  subtitulo: string
  valor: string
  diasAtraso: string
}

export const financialKpiMetrics = [
  {
    label: 'Receitas',
    value: 'R$ 48.532,80',
    change: '12,5%',
    trendDirection: 'up' as const,
    caption: 'em relação ao período anterior',
    tone: 'green' as const,
  },
  {
    label: 'Despesas',
    value: 'R$ 22.840,30',
    change: '8,3%',
    trendDirection: 'down' as const,
    isNegative: true,
    caption: 'em relação ao período anterior',
    tone: 'red' as const,
  },
  {
    label: 'Contas a Receber',
    value: 'R$ 15.320,00',
    change: '6,7%',
    trendDirection: 'up' as const,
    caption: 'em relação ao período anterior',
    tone: 'blue' as const,
  },
  {
    label: 'Contas a Pagar',
    value: 'R$ 9.650,40',
    change: '4,2%',
    trendDirection: 'down' as const,
    trendColor: '#10b981',
    caption: 'em relação ao período anterior',
    tone: 'purple' as const,
  },
]

export const cashFlowChartData: CashFlowPoint[] = [
  { date: '01/07', entradas: 22000, saidas: 13000, saldo: 21000 },
  { date: '05/07', entradas: 26000, saidas: 15500, saldo: 23500 },
  { date: '10/07', entradas: 30000, saidas: 17800, saldo: 25000 },
  { date: '15/07', entradas: 33000, saidas: 19500, saldo: 28000 },
  { date: '20/07', entradas: 37500, saidas: 21000, saldo: 33000 },
  { date: '25/07', entradas: 41000, saidas: 21900, saldo: 36000 },
  { date: '31/07', entradas: 48532, saidas: 22840, saldo: 42000 },
]

export const expensesCategories: CategoryShare[] = [
  { name: 'Compras de Mercadorias', percentage: '32,8%', numPercentage: 32.8, color: '#2563eb' },
  { name: 'Salários e Encargos', percentage: '22,4%', numPercentage: 22.4, color: '#f59e0b' },
  { name: 'Aluguel', percentage: '12,6%', numPercentage: 12.6, color: '#10b981' },
  { name: 'Serviços', percentage: '11,3%', numPercentage: 11.3, color: '#8b5cf6' },
  { name: 'Outros', percentage: '20,9%', numPercentage: 20.9, color: '#a855f7' },
]

export const paymentMethods: CategoryShare[] = [
  { name: 'Pix', percentage: '45,2%', numPercentage: 45.2, color: '#06b6d4' },
  { name: 'Cartão de Crédito', percentage: '28,6%', numPercentage: 28.6, color: '#ef4444' },
  { name: 'Dinheiro', percentage: '15,3%', numPercentage: 15.3, color: '#10b981' },
  { name: 'Boleto', percentage: '7,6%', numPercentage: 7.6, color: '#8b5cf6' },
  { name: 'Transferência', percentage: '3,3%', numPercentage: 3.3, color: '#d946ef' },
]

export const contasReceberData: ReceivableItem[] = [
  {
    id: '1',
    cliente: 'Maria Oliveira ME',
    descricao: 'Venda #000128',
    vencimento: '16/07/2025',
    valor: 'R$ 2.450,00',
    status: 'Pendente',
  },
  {
    id: '2',
    cliente: 'Tech Solutions Ltda',
    descricao: 'Venda #000127',
    vencimento: '15/07/2025',
    valor: 'R$ 3.480,00',
    status: 'Pendente',
  },
  {
    id: '3',
    cliente: 'Construtora Alfa',
    descricao: 'Venda #000126',
    vencimento: '12/07/2025',
    valor: 'R$ 980,00',
    status: 'Pago',
  },
  {
    id: '4',
    cliente: 'Supermercado Bom Preço',
    descricao: 'Venda #000125',
    vencimento: '10/07/2025',
    valor: 'R$ 2.340,50',
    status: 'Pago',
  },
  {
    id: '5',
    cliente: 'Almeida & Cia',
    descricao: 'Venda #000124',
    vencimento: '08/07/2025',
    valor: 'R$ 760,00',
    status: 'Pago',
  },
]

export const contasPagarData: PayableItem[] = [
  {
    id: '1',
    fornecedor: 'Distribuidora Santos',
    descricao: 'Compra de mercadorias',
    vencimento: '17/07/2025',
    valor: 'R$ 4.820,00',
    status: 'Pendente',
  },
  {
    id: '2',
    fornecedor: 'TechService LTDA',
    descricao: 'Manutenção de equipamentos',
    vencimento: '18/07/2025',
    valor: 'R$ 960,00',
    status: 'Pendente',
  },
  {
    id: '3',
    fornecedor: 'Aluguel',
    descricao: 'Aluguel do imóvel',
    vencimento: '20/07/2025',
    valor: 'R$ 3.200,00',
    status: 'Pendente',
  },
  {
    id: '4',
    fornecedor: 'Energia S.A.',
    descricao: 'Contas de energia',
    vencimento: '22/07/2025',
    valor: 'R$ 620,40',
    status: 'Pendente',
  },
  {
    id: '5',
    fornecedor: 'Internet Telecom',
    descricao: 'Internet e telefonia',
    vencimento: '25/07/2025',
    valor: 'R$ 450,00',
    status: 'Pago',
  },
]

export const topSuppliersData: SupplierItem[] = [
  {
    id: '1',
    fornecedor: 'Distribuidora Santos',
    totalComprado: 'R$ 12.450,00',
    ultimaCompra: '16/07/2025',
  },
  {
    id: '2',
    fornecedor: 'TechService LTDA',
    totalComprado: 'R$ 8.370,50',
    ultimaCompra: '15/07/2025',
  },
  {
    id: '3',
    fornecedor: 'Comercial Alfa',
    totalComprado: 'R$ 6.980,00',
    ultimaCompra: '12/07/2025',
  },
  {
    id: '4',
    fornecedor: 'Eletrônica do Brasil',
    totalComprado: 'R$ 4.320,00',
    ultimaCompra: '10/07/2025',
  },
  {
    id: '5',
    fornecedor: 'Fone & Cia',
    totalComprado: 'R$ 2.750,30',
    ultimaCompra: '08/07/2025',
  },
]

export const overdueAccountsData: OverdueItem[] = [
  {
    id: '1',
    titulo: 'Distribuidora Santos',
    subtitulo: 'Compra de mercadorias',
    valor: 'R$ 4.820,00',
    diasAtraso: '3 dias',
  },
  {
    id: '2',
    titulo: 'TechService LTDA',
    subtitulo: 'Manutenção de equipamentos',
    valor: 'R$ 980,00',
    diasAtraso: '2 dias',
  },
  {
    id: '3',
    titulo: 'Energia S.A.',
    subtitulo: 'Contas de energia',
    valor: 'R$ 620,40',
    diasAtraso: '1 dia',
  },
]

export const aiBalanceTrendPoints = [
  { date: '01/07', value: 12000 },
  { date: '10/07', value: 20000 },
  { date: '20/07', value: 23000 },
  { date: '31/07', value: 34000 },
]
