export interface MetricItem {
  id: string
  label: string
  value: string
  change: string
  caption: string
  isNegative?: boolean
  tone: 'green' | 'blue' | 'purple' | 'orange'
}

export interface SaleItem {
  id: string
  date: string
  customer: string
  total: string
  status: 'Concluída' | 'Pendente' | 'Cancelada'
}

export interface ProductItem {
  id: string
  name: string
  image: string
  sales: number
  value: string
}

export interface CategoryShare {
  name: string
  percentage: string
  numPercentage: number
  color: string
}

export interface BestCustomer {
  name: string
  value: string
  percentageWidth: number
}

export const initialMetrics: MetricItem[] = [
  {
    id: 'sales',
    label: 'Total de Vendas',
    value: 'R$ 48.532,80',
    change: '12,5%',
    caption: 'em relação ao período anterior',
    isNegative: false,
    tone: 'green',
  },
  {
    id: 'products',
    label: 'Produtos Vendidos',
    value: '342',
    change: '8,3%',
    caption: 'em relação ao período anterior',
    isNegative: false,
    tone: 'blue',
  },
  {
    id: 'customers',
    label: 'Total de Clientes',
    value: '128',
    change: '6,7%',
    caption: 'em relação ao período anterior',
    isNegative: false,
    tone: 'purple',
  },
  {
    id: 'stock',
    label: 'Estoque em Baixa',
    value: '5',
    change: '28,6%',
    caption: 'em relação ao período anterior',
    isNegative: true,
    tone: 'orange',
  },
]

export const recentSales: SaleItem[] = [
  {
    id: 'sale-1',
    date: '16/07/2025',
    customer: 'Maria Oliveira ME',
    total: 'R$ 1.250,00',
    status: 'Concluída',
  },
  {
    id: 'sale-2',
    date: '16/07/2025',
    customer: 'Tech Solutions Ltda',
    total: 'R$ 3.480,00',
    status: 'Concluída',
  },
  {
    id: 'sale-3',
    date: '15/07/2025',
    customer: 'Construtora Alfa',
    total: 'R$ 980,00',
    status: 'Concluída',
  },
  {
    id: 'sale-4',
    date: '15/07/2025',
    customer: 'Supermercado Bom Preço',
    total: 'R$ 2.340,50',
    status: 'Concluída',
  },
  {
    id: 'sale-5',
    date: '14/07/2025',
    customer: 'Almeida & Cia',
    total: 'R$ 760,00',
    status: 'Pendente',
  },
]

export const featuredProducts: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Notebook Dell Inspiron',
    image: '/images/notebook.jpg',
    sales: 45,
    value: 'R$ 22.500,00',
  },
  {
    id: 'prod-2',
    name: 'Smartphone Galaxy A54',
    image: '/images/smartphone.jpg',
    sales: 38,
    value: 'R$ 15.200,00',
  },
  {
    id: 'prod-3',
    name: 'Camiseta Premium',
    image: '/images/tshirt.jpg',
    sales: 62,
    value: 'R$ 8.680,00',
  },
  {
    id: 'prod-4',
    name: 'Fone Bluetooth',
    image: '/images/headphones.jpg',
    sales: 34,
    value: 'R$ 6.120,00',
  },
  {
    id: 'prod-5',
    name: 'Cafeteira Elétrica',
    image: '/images/coffeemaker.jpg',
    sales: 28,
    value: 'R$ 4.760,00',
  },
]

export const categoryShares: CategoryShare[] = [
  { name: 'Eletrônicos', percentage: '35,2%', numPercentage: 35.2, color: '#2563eb' },
  { name: 'Roupas', percentage: '22,7%', numPercentage: 22.7, color: '#f97316' },
  { name: 'Alimentos', percentage: '15,4%', numPercentage: 15.4, color: '#10b981' },
  { name: 'Casa', percentage: '12,6%', numPercentage: 12.6, color: '#8b5cf6' },
  { name: 'Outros', percentage: '14,1%', numPercentage: 14.1, color: '#c084fc' },
]

export const revenueData = [
  { date: '10/07', value: 2500, label: 'R$ 2.500' },
  { date: '11/07', value: 4300, label: 'R$ 4.300' },
  { date: '12/07', value: 5000, label: 'R$ 5.000' },
  { date: '13/07', value: 3700, label: 'R$ 3.700' },
  { date: '14/07', value: 4800, label: 'R$ 4.800' },
  { date: '15/07', value: 6200, label: 'R$ 6.200' },
  { date: '16/07', value: 7800, label: 'R$ 7.800' },
]

export const topCustomers: BestCustomer[] = [
  { name: 'Tech Solutions Ltda', value: 'R$ 12.450,00', percentageWidth: 100 },
  { name: 'Maria Oliveira ME', value: 'R$ 8.320,50', percentageWidth: 67 },
  { name: 'Construtora Alfa', value: 'R$ 6.980,00', percentageWidth: 56 },
  { name: 'Supermercado Bom Preço', value: 'R$ 5.760,30', percentageWidth: 46 },
  { name: 'Almeida & Cia', value: 'R$ 4.320,00', percentageWidth: 35 },
]
