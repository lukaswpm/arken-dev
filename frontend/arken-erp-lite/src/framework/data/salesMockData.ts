export interface OrderItem {
  id: string
  orderNumber: string
  date: string
  customer: string
  itemsCount: number
  total: string
  status: 'Concluído' | 'Em andamento' | 'Pendente' | 'Cancelado'
}

export const salesOrders: OrderItem[] = [
  {
    id: 'ord-128',
    orderNumber: '#000128',
    date: '16/07/2025',
    customer: 'Maria Oliveira ME',
    itemsCount: 3,
    total: 'R$ 1.250,00',
    status: 'Concluído',
  },
  {
    id: 'ord-127',
    orderNumber: '#000127',
    date: '15/07/2025',
    customer: 'Construtora Alfa',
    itemsCount: 5,
    total: 'R$ 980,00',
    status: 'Concluído',
  },
  {
    id: 'ord-126',
    orderNumber: '#000126',
    date: '14/07/2025',
    customer: 'Supermercado Bom Preço',
    itemsCount: 2,
    total: 'R$ 2.340,50',
    status: 'Em andamento',
  },
  {
    id: 'ord-125',
    orderNumber: '#000125',
    date: '12/07/2025',
    customer: 'Tech Solutions Ltda',
    itemsCount: 4,
    total: 'R$ 3.480,00',
    status: 'Concluído',
  },
  {
    id: 'ord-124',
    orderNumber: '#000124',
    date: '10/07/2025',
    customer: 'Almeida & Cia',
    itemsCount: 1,
    total: 'R$ 760,00',
    status: 'Pendente',
  },
]

export const salesEvolutionVendas = [
  { date: '01/07', value: 2500, label: 'R$ 2.500' },
  { date: '05/07', value: 4200, label: 'R$ 4.200' },
  { date: '10/07', value: 5000, label: 'R$ 5.000' },
  { date: '15/07', value: 4100, label: 'R$ 4.100' },
  { date: '20/07', value: 6100, label: 'R$ 6.100' },
  { date: '25/07', value: 6800, label: 'R$ 6.800' },
  { date: '31/07', value: 8400, label: 'R$ 8.400' },
]

export const salesEvolutionTicket = [
  { date: '01/07', value: 1900, label: 'R$ 320' },
  { date: '05/07', value: 2300, label: 'R$ 345' },
  { date: '10/07', value: 2400, label: 'R$ 355' },
  { date: '15/07', value: 3400, label: 'R$ 375' },
  { date: '20/07', value: 3200, label: 'R$ 360' },
  { date: '25/07', value: 4900, label: 'R$ 410' },
  { date: '31/07', value: 5700, label: 'R$ 440' },
]

export const salesCategoryShares = [
  { name: 'Eletrônicos', percentage: '32,5%', numPercentage: 32.5, color: '#2563eb' },
  { name: 'Roupas', percentage: '22,7%', numPercentage: 22.7, color: '#f97316' },
  { name: 'Alimentos', percentage: '15,4%', numPercentage: 15.4, color: '#10b981' },
  { name: 'Casa', percentage: '12,6%', numPercentage: 12.6, color: '#8b5cf6' },
  { name: 'Outros', percentage: '14,1%', numPercentage: 14.1, color: '#c084fc' },
]
