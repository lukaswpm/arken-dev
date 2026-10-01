export interface CatalogProduct {
  id: string
  name: string
  subtitle: string
  category: string
  code: string
  price: string
  stock: number
  status: 'Em estoque' | 'Estoque baixo' | 'Sem estoque'
  image: string
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'prod-1',
    name: 'Notebook Dell Inspiron 15',
    subtitle: 'Intel i5, 8GB, 256GB SSD',
    category: 'Eletrônicos',
    code: 'NT001',
    price: 'R$ 2.500,00',
    stock: 45,
    status: 'Em estoque',
    image: '/images/notebook.jpg',
  },
  {
    id: 'prod-2',
    name: 'Smartphone Galaxy A54',
    subtitle: '128GB, 6GB RAM',
    category: 'Celulares',
    code: 'CEL002',
    price: 'R$ 1.520,00',
    stock: 38,
    status: 'Em estoque',
    image: '/images/smartphone.jpg',
  },
  {
    id: 'prod-3',
    name: 'Camiseta Premium',
    subtitle: 'Algodão, várias cores',
    category: 'Roupas',
    code: 'RPS003',
    price: 'R$ 89,90',
    stock: 62,
    status: 'Em estoque',
    image: '/images/tshirt.jpg',
  },
  {
    id: 'prod-4',
    name: 'Fone Bluetooth',
    subtitle: 'Alta qualidade de som',
    category: 'Áudio',
    code: 'FON004',
    price: 'R$ 120,00',
    stock: 12,
    status: 'Estoque baixo',
    image: '/images/headphones.jpg',
  },
  {
    id: 'prod-5',
    name: 'Cafeteira Elétrica',
    subtitle: '12 xícaras, 110V/220V',
    category: 'Eletrodomésticos',
    code: 'CAF005',
    price: 'R$ 279,90',
    stock: 5,
    status: 'Estoque baixo',
    image: '/images/coffeemaker.jpg',
  },
  {
    id: 'prod-6',
    name: 'Mouse Sem Fio',
    subtitle: 'Ergonômico, 2.4GHz',
    category: 'Periféricos',
    code: 'MOU006',
    price: 'R$ 79,90',
    stock: 0,
    status: 'Sem estoque',
    image: '/images/mouse.jpg',
  },
  {
    id: 'prod-7',
    name: 'Teclado Mecânico',
    subtitle: 'Switch Blue, RGB',
    category: 'Periféricos',
    code: 'TEC007',
    price: 'R$ 349,90',
    stock: 18,
    status: 'Em estoque',
    image: '/images/keyboard.jpg',
  },
  {
    id: 'prod-8',
    name: 'Monitor 24" Full HD',
    subtitle: 'IPS, 75Hz',
    category: 'Monitores',
    code: 'MON008',
    price: 'R$ 899,90',
    stock: 22,
    status: 'Em estoque',
    image: '/images/monitor.jpg',
  },
  {
    id: 'prod-9',
    name: 'SSD 1TB',
    subtitle: 'Leitura 550MB/s',
    category: 'Armazenamento',
    code: 'SSD009',
    price: 'R$ 449,90',
    stock: 9,
    status: 'Estoque baixo',
    image: '/images/ssd.jpg',
  },
  {
    id: 'prod-10',
    name: 'Webcam Full HD',
    subtitle: '1080p, USB',
    category: 'Periféricos',
    code: 'WEB010',
    price: 'R$ 199,90',
    stock: 14,
    status: 'Em estoque',
    image: '/images/webcam.jpg',
  },
]
