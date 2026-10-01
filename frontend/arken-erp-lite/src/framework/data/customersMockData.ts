export interface CustomerItem {
  id: string
  name: string
  email: string
  document: string
  city: string
  lastPurchase: string
  totalSpent: string
  status: 'Ativo' | 'Inativo'
  phone?: string
  customerSince?: string
  initials?: string
  avatarColor?: string
  avatarImage?: string
}

export interface PurchasedProductItem {
  id: string
  name: string
  units: string
  value: string
  image: string
}

export interface CustomerDetailData {
  id: string
  name: string
  status: 'Ativo' | 'Inativo'
  email: string
  phone: string
  document: string
  city: string
  customerSince: string
  initials?: string
  avatarColor?: string
  avatarImage?: string
  totalSpent: string
  lastPurchase: string
  averageTicket: string
  topProducts: PurchasedProductItem[]
  aiInsights: string[]
}

export const customersKpiMetrics = [
  {
    label: 'Total de Clientes',
    value: '128',
    change: '6,7%',
    trendDirection: 'up' as const,
    caption: 'em relação ao mês anterior',
    tone: 'blue' as const,
  },
  {
    label: 'Clientes Ativos',
    value: '112',
    change: '5,7%',
    trendDirection: 'up' as const,
    caption: 'em relação ao mês anterior',
    tone: 'green' as const,
  },
  {
    label: 'Novos (mês)',
    value: '18',
    change: '28,6%',
    trendDirection: 'up' as const,
    caption: 'em relação ao mês anterior',
    tone: 'purple' as const,
  },
  {
    label: 'Ticket Médio',
    value: 'R$ 3.820,50',
    change: '12,4%',
    trendDirection: 'up' as const,
    caption: 'em relação ao mês anterior',
    tone: 'orange' as const,
  },
]

export const customersData: CustomerItem[] = [
  {
    id: 'cli-001',
    name: 'Maria Oliveira ME',
    email: 'maria@oliveira.com',
    document: '12.345.678/0001-90',
    city: 'Vitória - ES',
    lastPurchase: '16/07/2025',
    totalSpent: 'R$ 22.450,00',
    status: 'Ativo',
    phone: '(27) 99999-9999',
    customerSince: '15/03/2023',
    initials: 'MO',
    avatarColor: '#c084fc',
  },
  {
    id: 'cli-002',
    name: 'Tech Solutions Ltda',
    email: 'contato@tech.com',
    document: '98.765.432/0001-10',
    city: 'Vila Velha - ES',
    lastPurchase: '15/07/2025',
    totalSpent: 'R$ 18.230,50',
    status: 'Ativo',
    phone: '(27) 98888-1122',
    customerSince: '10/01/2023',
    initials: 'TS',
    avatarColor: '#2563eb',
  },
  {
    id: 'cli-003',
    name: 'Construtora Alfa',
    email: 'comercial@alfa.com',
    document: '11.222.333/0001-44',
    city: 'Serra - ES',
    lastPurchase: '12/07/2025',
    totalSpent: 'R$ 9.780,00',
    status: 'Ativo',
    phone: '(27) 97777-3344',
    customerSince: '20/05/2023',
    initials: 'CA',
    avatarColor: '#0284c7',
  },
  {
    id: 'cli-004',
    name: 'Supermercado Bom Preço',
    email: 'compras@bompreco.com',
    document: '22.333.444/0001-55',
    city: 'Cariacica - ES',
    lastPurchase: '10/07/2025',
    totalSpent: 'R$ 8.640,25',
    status: 'Ativo',
    phone: '(27) 96666-5566',
    customerSince: '04/08/2023',
    initials: 'BP',
    avatarColor: '#0d9488',
  },
  {
    id: 'cli-005',
    name: 'Almeida & Cia',
    email: 'vendas@almeida.com',
    document: '33.444.555/0001-66',
    city: 'Viana - ES',
    lastPurchase: '08/07/2025',
    totalSpent: 'R$ 4.320,00',
    status: 'Ativo',
    phone: '(27) 95555-7788',
    customerSince: '12/11/2023',
    initials: 'AC',
    avatarColor: '#4f46e5',
  },
  {
    id: 'cli-006',
    name: 'João Ferreira',
    email: 'joao@email.com',
    document: '123.456.789-00',
    city: 'Vila Velha - ES',
    lastPurchase: '05/07/2025',
    totalSpent: 'R$ 3.210,90',
    status: 'Ativo',
    phone: '(27) 94444-9900',
    customerSince: '18/02/2024',
    avatarImage: '/images/joao.jpg',
  },
  {
    id: 'cli-007',
    name: 'Fernanda Costa',
    email: 'fernanda@email.com',
    document: '987.654.321-00',
    city: 'Guarapari - ES',
    lastPurchase: '03/07/2025',
    totalSpent: 'R$ 2.980,00',
    status: 'Ativo',
    phone: '(27) 93333-2211',
    customerSince: '02/04/2024',
    avatarImage: '/images/fernanda.jpg',
  },
  {
    id: 'cli-008',
    name: 'Papelaria Criativa',
    email: 'contato@criativa.com',
    document: '55.666.777/0001-88',
    city: 'Vitória - ES',
    lastPurchase: '28/06/2025',
    totalSpent: 'R$ 1.560,40',
    status: 'Inativo',
    phone: '(27) 92222-4433',
    customerSince: '14/06/2023',
    initials: 'PC',
    avatarColor: '#9333ea',
  },
  {
    id: 'cli-009',
    name: 'Distribuidora Santos',
    email: 'santos@distribuidora.com',
    document: '66.777.888/0001-99',
    city: 'Cariacica - ES',
    lastPurchase: '25/06/2025',
    totalSpent: 'R$ 980,00',
    status: 'Inativo',
    phone: '(27) 91111-6655',
    customerSince: '09/09/2023',
    avatarImage: '/images/santos.jpg',
  },
  {
    id: 'cli-010',
    name: 'Ana Paula Lima',
    email: 'ana@lima.com',
    document: '444.555.666-00',
    city: 'Serra - ES',
    lastPurchase: '20/06/2025',
    totalSpent: 'R$ 760,50',
    status: 'Ativo',
    phone: '(27) 90000-8877',
    customerSince: '15/01/2024',
    avatarImage: '/images/ana.jpg',
  },
]

export const defaultCustomerDetail: CustomerDetailData = {
  id: 'cli-001',
  name: 'Maria Oliveira ME',
  status: 'Ativo',
  email: 'maria@oliveira.com',
  phone: '(27) 99999-9999',
  document: '12.345.678/0001-90',
  city: 'Vitória - ES',
  customerSince: '15/03/2023',
  initials: 'MO',
  avatarColor: '#c084fc',
  totalSpent: 'R$ 22.450,00',
  lastPurchase: '16/07/2025',
  averageTicket: 'R$ 3.742,00',
  topProducts: [
    {
      id: 'p1',
      name: 'Notebook Dell Inspiron',
      units: '28 unidades',
      value: 'R$ 12.600,00',
      image: '/images/notebook.jpg',
    },
    {
      id: 'p2',
      name: 'Mouse Sem Fio',
      units: '15 unidades',
      value: 'R$ 1.800,00',
      image: '/images/mouse.jpg',
    },
    {
      id: 'p3',
      name: 'Cabo HDMI',
      units: '12 unidades',
      value: 'R$ 720,00',
      image: '/images/cable.jpg',
    },
    {
      id: 'p4',
      name: 'Teclado Mecânico',
      units: '8 unidades',
      value: 'R$ 1.120,00',
      image: '/images/keyboard.jpg',
    },
  ],
  aiInsights: [
    'Este cliente aumentou o volume de compras em 35% nos últimos 90 dias.',
    'Os produtos da categoria de informática representam 78% do seu total de compras.',
    'Última compra foi há 5 dias, e o comportamento indica alta probabilidade de nova compra em até 30 dias.',
  ],
}
