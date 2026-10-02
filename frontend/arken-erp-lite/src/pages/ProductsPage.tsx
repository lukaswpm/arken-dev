import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  InputBase,
  Checkbox,
  IconButton,
  Card,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Avatar,
  Chip,
  Menu,
  LinearProgress,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

import {
  KpiCard,
  DataTable,
  StatusChip,
  ProductDetailCard,
  catalogProducts,
  type CatalogProduct,
} from '../framework'
import { productService, type ProductKpi, type ProductCategoryItem } from '../services'

// Galeria de imagens disponíveis na pasta public/images/
const AVAILABLE_IMAGES = [
  { label: 'Notebook Dell', src: '/images/notebook.jpg' },
  { label: 'Smartphone Galaxy', src: '/images/smartphone.jpg' },
  { label: 'Camiseta Premium', src: '/images/tshirt.jpg' },
  { label: 'Fone Bluetooth', src: '/images/headphones.jpg' },
  { label: 'Cafeteira Elétrica', src: '/images/coffeemaker.jpg' },
  { label: 'Mouse Sem Fio', src: '/images/mouse.jpg' },
  { label: 'Teclado Mecânico', src: '/images/keyboard.jpg' },
  { label: 'Monitor Full HD', src: '/images/monitor.jpg' },
  { label: 'SSD 1TB', src: '/images/ssd.jpg' },
  { label: 'Webcam Full HD', src: '/images/webcam.jpg' },
  { label: 'Dell Inspiron Hero', src: '/images/dell_hero.jpg' },
  { label: 'Cabo USB-C', src: '/images/cable.jpg' },
]

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<CatalogProduct[]>(catalogProducts)
  const [kpis, setKpis] = useState<ProductKpi[]>([])
  const [categories, setCategories] = useState<ProductCategoryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todas as categorias')
  const [selectedStatus, setSelectedStatus] = useState('Todos os status')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<CatalogProduct>(
    catalogProducts[0]
  )
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null)

  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // Modal de Criação / Edição de Produto
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    code: '',
    sku: '',
    price: '',
    stockQuantity: '10',
    brand: '',
    model: '',
    imageUrl: '/images/notebook.jpg',
  })

  // Carrega produtos, KPIs e categorias dinamicamente da API
  const fetchProductsData = async () => {
    setIsLoading(true)
    try {
      const [prodsData, kpisData, catsData] = await Promise.allSettled([
        productService.getProducts(),
        productService.getProductKpis(),
        productService.getCategories(),
      ])

      if (prodsData.status === 'fulfilled' && prodsData.value?.length) {
        setProducts(prodsData.value)
        setSelectedProductForDetail(prodsData.value[0])
      }
      if (kpisData.status === 'fulfilled' && kpisData.value?.length) {
        setKpis(kpisData.value)
      }
      if (catsData.status === 'fulfilled' && catsData.value?.length) {
        setCategories(catsData.value)
      }
    } catch (err) {
      console.warn('Backend offline ou erro ao carregar produtos. Usando dados locais.', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProductsData()
  }, [])

  // Filter products based on category, status, and search query
  const filteredProducts = products.filter((prod) => {
    if (
      selectedCategory !== 'Todas as categorias' &&
      prod.category !== selectedCategory
    ) {
      return false
    }
    if (selectedStatus !== 'Todos os status' && prod.status !== selectedStatus) {
      return false
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.code.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProductIds(filteredProducts.map((p) => p.id))
    } else {
      setSelectedProductIds([])
    }
  }

  const handleSelectOne = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((item) => item !== id))
    } else {
      setSelectedProductIds([...selectedProductIds, id])
    }
  }

  // Abertura do Modal de Novo Produto
  const handleOpenCreateModal = () => {
    setFormError(null)
    setIsEditing(false)
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      category: categories[0]?.name || 'Eletrônicos',
      code: `PRD-${Math.floor(100 + Math.random() * 900)}`,
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      price: '199.90',
      stockQuantity: '20',
      brand: 'Arken',
      model: 'Padrão',
      imageUrl: '/images/notebook.jpg',
    })
    setIsModalOpen(true)
  }

  // Abertura do Modal de Edição
  const handleOpenEditModal = (product: CatalogProduct) => {
    setFormError(null)
    setIsEditing(true)
    setEditingId(product.id)

    // Extrai número do preço (ex: "R$ 2.500,00" -> "2500")
    const cleanPrice = product.price.replace(/[^\d,]/g, '').replace(',', '.')

    setFormData({
      name: product.name,
      description: product.subtitle || '',
      category: product.category,
      code: product.code,
      sku: product.code ? `SKU-${product.code}` : '',
      price: cleanPrice || '100.00',
      stockQuantity: String(product.stock),
      brand: 'Arken',
      model: product.name,
      imageUrl: product.image || (product as any).imageUrl || '/images/notebook.jpg',
    })
    setIsModalOpen(true)
  }

  // Salvar produto (Create ou Update)
  const handleSaveProduct = async () => {
    setFormError(null)

    if (!formData.name.trim()) {
      setFormError('Informe o nome do produto.')
      return
    }

    const priceNum = parseFloat(formData.price.replace(',', '.'))
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError('Informe um preço válido maior que zero.')
      return
    }

    const stockNum = parseInt(formData.stockQuantity, 10)
    if (isNaN(stockNum) || stockNum < 0) {
      setFormError('Informe uma quantidade de estoque válida.')
      return
    }

    setIsSaving(true)

    try {
      const selectedCatObj = categories.find((c) => c.name === formData.category)

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        categoryId: selectedCatObj?.id,
        code: formData.code.trim(),
        sku: formData.sku.trim(),
        price: priceNum,
        stockQuantity: stockNum,
        brand: formData.brand.trim() || 'Arken',
        model: formData.model.trim() || formData.name.trim(),
        imageUrl: formData.imageUrl,
        image: formData.imageUrl,
      }

      if (isEditing && editingId) {
        await productService.updateProduct(editingId, payload)
      } else {
        await productService.createProduct(payload)
      }

      await fetchProductsData()
      setIsModalOpen(false)
    } catch (err: any) {
      console.error('Erro ao salvar produto:', err)
      setFormError(err?.message || 'Falha ao salvar produto no backend.')
    } finally {
      setIsSaving(false)
    }
  }

  // Columns definition
  const columns = [
    {
      id: 'selection',
      label: (
        <Checkbox
          size="small"
          checked={
            filteredProducts.length > 0 &&
            selectedProductIds.length === filteredProducts.length
          }
          indeterminate={
            selectedProductIds.length > 0 &&
            selectedProductIds.length < filteredProducts.length
          }
          onChange={(e) => handleSelectAll(e.target.checked)}
          sx={{
            p: 0.5,
            color: '#cbd5e1',
            '&.Mui-checked': { color: '#2563eb' },
            '&.MuiCheckbox-indeterminate': { color: '#2563eb' },
          }}
        />
      ),
      minWidth: 40,
      render: (item: CatalogProduct) => (
        <Checkbox
          size="small"
          checked={selectedProductIds.includes(item.id)}
          onChange={() => handleSelectOne(item.id)}
          sx={{
            p: 0.5,
            color: '#cbd5e1',
            '&.Mui-checked': { color: '#2563eb' },
          }}
        />
      ),
    },
    {
      id: 'name',
      label: 'Produto',
      minWidth: 200,
      render: (item: CatalogProduct) => {
        const itemImg = item.image || (item as any).imageUrl || '/images/notebook.jpg'
        return (
          <Box
            onClick={() => setSelectedProductForDetail(item)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              cursor: 'pointer',
            }}
          >
            <Avatar
              src={itemImg}
              alt={item.name}
              variant="rounded"
              slotProps={{
                img: {
                  onError: (e: any) => {
                    e.currentTarget.src = '/images/notebook.jpg'
                  },
                },
              }}
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                bgcolor: '#f8fafc',
                border: '1px solid #e2e8f0',
                img: { objectFit: 'contain', p: 0.25 },
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: selectedProductForDetail.id === item.id ? '#2563eb' : '#0f172a',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748b',
                  fontSize: '0.65625rem',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  mt: 0.25,
                }}
              >
                {item.subtitle}
              </Typography>
            </Box>
          </Box>
        )
      },
    },
    {
      id: 'category',
      label: 'Categoria',
      minWidth: 105,
      render: (item: CatalogProduct) => (
        <Chip
          label={item.category}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.625rem',
            fontWeight: 500,
            bgcolor: '#eff6ff',
            color: '#2563eb',
            borderRadius: '4px',
          }}
        />
      ),
    },
    {
      id: 'code',
      label: 'Código',
      minWidth: 75,
      render: (item: CatalogProduct) => (
        <Typography sx={{ color: '#475569', fontSize: '0.75rem', fontWeight: 500 }}>
          {item.code}
        </Typography>
      ),
    },
    {
      id: 'price',
      label: 'Preço',
      minWidth: 95,
      render: (item: CatalogProduct) => (
        <Typography sx={{ color: '#0f172a', fontSize: '0.75rem', fontWeight: 600 }}>
          {item.price}
        </Typography>
      ),
    },
    {
      id: 'stock',
      label: 'Estoque',
      minWidth: 65,
      render: (item: CatalogProduct) => (
        <Typography
          sx={{
            color: item.stock === 0 ? '#ef4444' : item.stock <= 10 ? '#f59e0b' : '#10b981',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          {item.stock}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      render: (item: CatalogProduct) => <StatusChip status={item.status} />,
    },
    {
      id: 'actions',
      label: '',
      minWidth: 65,
      align: 'right' as const,
      render: (item: CatalogProduct) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => handleOpenEditModal(item)}
            sx={{
              p: 0.5,
              color: '#64748b',
              '&:hover': { color: '#2563eb', bgcolor: '#eff6ff' },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => setActionMenuAnchor(e.currentTarget)}
            sx={{
              p: 0.5,
              color: '#64748b',
              '&:hover': { color: '#0f172a', bgcolor: '#f1f5f9' },
            }}
          >
            <MoreHorizRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Top Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.25rem', sm: '1.375rem' },
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}
          >
            Produtos
          </Typography>
          <Typography sx={{ color: '#64748b', fontSize: '0.8125rem', mt: 0.25 }}>
            Gerencie o catálogo, controle de estoque e precificação dos seus produtos
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
          {/* Category Dropdown */}
          <Select
            value={selectedCategory}
            onChange={(e: SelectChangeEvent) => setSelectedCategory(e.target.value)}
            size="small"
            IconComponent={KeyboardArrowDownRoundedIcon}
            sx={{
              bgcolor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#334155',
              height: 38,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-select': {
                py: 0.75,
                pr: '32px !important',
                pl: 1.25,
              },
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
            }}
          >
            <MenuItem value="Todas as categorias">Todas as categorias</MenuItem>
            {categories.length > 0
              ? categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))
              : [
                  'Eletrônicos',
                  'Celulares',
                  'Roupas',
                  'Áudio',
                  'Eletrodomésticos',
                  'Periféricos',
                  'Monitores',
                  'Armazenamento',
                ].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
          </Select>

          {/* Status Dropdown */}
          <Select
            value={selectedStatus}
            onChange={(e: SelectChangeEvent) => setSelectedStatus(e.target.value)}
            size="small"
            IconComponent={KeyboardArrowDownRoundedIcon}
            sx={{
              bgcolor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#334155',
              height: 38,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-select': {
                py: 0.75,
                pr: '32px !important',
                pl: 1.25,
              },
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
            }}
          >
            <MenuItem value="Todos os status">Todos os status</MenuItem>
            <MenuItem value="Em estoque">Em estoque</MenuItem>
            <MenuItem value="Estoque baixo">Estoque baixo</MenuItem>
            <MenuItem value="Sem estoque">Sem estoque</MenuItem>
          </Select>

          {/* View mode buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              bgcolor: '#ffffff',
              p: '2px',
              height: 38,
            }}
          >
            <IconButton
              size="small"
              onClick={() => setViewMode('grid')}
              sx={{
                borderRadius: '6px',
                p: 0.75,
                color: viewMode === 'grid' ? '#2563eb' : '#64748b',
                bgcolor: viewMode === 'grid' ? '#eff6ff' : 'transparent',
              }}
            >
              <GridViewRoundedIcon sx={{ fontSize: 17 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setViewMode('list')}
              sx={{
                borderRadius: '6px',
                p: 0.75,
                color: viewMode === 'list' ? '#2563eb' : '#64748b',
                bgcolor: viewMode === 'list' ? '#eff6ff' : 'transparent',
              }}
            >
              <FormatListBulletedRoundedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>

          {/* Novo Produto CTA */}
          <Button
            variant="contained"
            onClick={handleOpenCreateModal}
            startIcon={<AddRoundedIcon />}
            sx={{
              bgcolor: '#2563eb',
              color: '#ffffff',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              height: 38,
              px: 2,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': { bgcolor: '#1d4ed8', boxShadow: 'none' },
            }}
          >
            Novo Produto
          </Button>
        </Box>
      </Box>

      {/* Main Grid: Left Column (KPIs + Table) + Right Column (ProductDetailCard) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 360px' },
          gap: 2,
          alignItems: 'start',
        }}
      >
        {/* Left Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          {/* 4 Stat Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 1.5,
            }}
          >
            <KpiCard
              label={kpis[0]?.label || 'Total de Produtos'}
              value={kpis[0]?.value || (products.length ? products.length.toString() : '0')}
              change={kpis[0]?.change || '8,3%'}
              trendDirection={kpis[0]?.trendDirection || 'up'}
              caption={kpis[0]?.caption || 'em relação ao mês anterior'}
              tone={kpis[0]?.tone || 'blue'}
              icon={<Inventory2OutlinedIcon />}
            />
            <KpiCard
              label={kpis[1]?.label || 'Produtos em Estoque'}
              value={kpis[1]?.value || products.filter((p) => p.stock > 10).length.toString()}
              change={kpis[1]?.change || '12,5%'}
              trendDirection={kpis[1]?.trendDirection || 'up'}
              caption={kpis[1]?.caption || 'em relação ao mês anterior'}
              tone={kpis[1]?.tone || 'blue'}
              icon={<ShoppingCartOutlinedIcon />}
            />
            <KpiCard
              label={kpis[2]?.label || 'Estoque Crítico'}
              value={
                kpis[2]?.value ||
                products.filter((p) => p.stock > 0 && p.stock <= 10).length.toString()
              }
              change={kpis[2]?.change || '28,6%'}
              trendDirection={kpis[2]?.trendDirection || 'down'}
              caption={kpis[2]?.caption || 'em relação ao mês anterior'}
              tone={kpis[2]?.tone || 'orange'}
              isNegative={true}
              icon={<NotificationsActiveOutlinedIcon sx={{ color: '#ef4444' }} />}
            />
            <KpiCard
              label={kpis[3]?.label || 'Produtos Parados'}
              value={kpis[3]?.value || products.filter((p) => p.stock === 0).length.toString()}
              change={kpis[3]?.change || '0%'}
              trendDirection={kpis[3]?.trendDirection || 'up'}
              caption={kpis[3]?.caption || 'em relação ao mês anterior'}
              tone={kpis[3]?.tone || 'blue'}
              icon={<PauseCircleOutlineRoundedIcon />}
            />
          </Box>

          {/* Products Table Card */}
          <Card
            sx={{
              p: '14px 18px',
              borderRadius: '12px',
              bgcolor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Barra de Progresso Superior quando carregando */}
            {isLoading && (
              <LinearProgress
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  bgcolor: '#eff6ff',
                  '& .MuiLinearProgress-bar': { bgcolor: '#2563eb' },
                }}
              />
            )}

            {/* Table Toolbar */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                gap: 1.5,
                borderBottom: '1px solid #f1f5f9',
                pb: 1.25,
              }}
            >
              {/* Search Input */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  px: 1.25,
                  py: 0.5,
                  gap: 0.75,
                  width: { xs: '100%', sm: 240 },
                }}
              >
                <SearchRoundedIcon sx={{ color: '#94a3b8', fontSize: 17 }} />
                <InputBase
                  placeholder="Buscar produto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    fontSize: '0.75rem',
                    color: '#0f172a',
                    '& input::placeholder': { color: '#94a3b8', opacity: 1 },
                  }}
                />
              </Box>

              {/* Action Buttons: Filtros + Exportar */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<TuneRoundedIcon sx={{ fontSize: 15 }} />}
                  sx={{
                    borderColor: '#e2e8f0',
                    color: '#475569',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    borderRadius: '6px',
                    textTransform: 'none',
                    py: 0.5,
                    px: 1.25,
                    '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1' },
                  }}
                >
                  Filtros
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderColor: '#e2e8f0',
                    color: '#2563eb',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: '6px',
                    textTransform: 'none',
                    py: 0.5,
                    px: 1.25,
                    '&:hover': { bgcolor: '#eff6ff', borderColor: '#bfdbfe' },
                  }}
                >
                  Exportar
                </Button>
              </Box>
            </Box>

            {/* Table com indicador de loading */}
            <DataTable
              columns={columns}
              data={filteredProducts}
              loading={isLoading}
              keyExtractor={(item) => item.id}
            />

            {/* Table Footer: Counter & Pagination */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pt: 1,
                borderTop: '1px solid #f1f5f9',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Typography sx={{ color: '#64748b', fontSize: '0.75rem' }}>
                Mostrando{' '}
                <Box component="span" sx={{ fontWeight: 600, color: '#0f172a' }}>
                  {filteredProducts.length}
                </Box>{' '}
                de{' '}
                <Box component="span" sx={{ fontWeight: 600, color: '#0f172a' }}>
                  {products.length}
                </Box>{' '}
                produtos
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton size="small" disabled sx={{ p: 0.5, color: '#94a3b8' }}>
                  <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>

                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '4px',
                    bgcolor: '#2563eb',
                    color: '#ffffff',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  1
                </Box>

                <IconButton size="small" disabled sx={{ p: 0.5, color: '#94a3b8' }}>
                  <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Column: Product Detail Panel */}
        <Box sx={{ position: { lg: 'sticky' }, top: { lg: 76 } }}>
          <ProductDetailCard
            product={{
              id: selectedProductForDetail.code,
              name: selectedProductForDetail.name,
              specs: selectedProductForDetail.subtitle,
              category: selectedProductForDetail.category,
              code: selectedProductForDetail.code,
              ean: '7891234567890',
              price: selectedProductForDetail.price,
              status: selectedProductForDetail.status,
              image:
                selectedProductForDetail.image ||
                (selectedProductForDetail as any).imageUrl ||
                '/images/notebook.jpg',
              description: `${selectedProductForDetail.name}, ideal para trabalho e estudos. Especificações técnicas de alta performance e acabamento premium.`,
              brand: 'Dell',
              model: selectedProductForDetail.name,
              weight: '2,1 kg',
              dimensions: '36 x 24 x 2 cm',
            }}
            onEdit={() => handleOpenEditModal(selectedProductForDetail)}
          />
        </Box>
      </Box>

      {/* ================= MODAL DE CRIAÇÃO / EDIÇÃO DE PRODUTO ================= */}
      <Dialog
        open={isModalOpen}
        onClose={() => !isSaving && setIsModalOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: '1.125rem',
            color: '#0f172a',
            borderBottom: '1px solid #f1f5f9',
            pb: 1.5,
          }}
        >
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </DialogTitle>

        <DialogContent sx={{ pt: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {formError && (
            <Alert severity="error" sx={{ borderRadius: '8px', fontSize: '0.85rem' }}>
              {formError}
            </Alert>
          )}

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2 }}>
            <TextField
              label="Nome do Produto"
              size="small"
              required
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Notebook Dell Inspiron 15"
            />

            <Select
              size="small"
              fullWidth
              value={formData.category}
              onChange={(e: SelectChangeEvent) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <TextField
            label="Descrição / Especificações"
            size="small"
            fullWidth
            multiline
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Ex: Intel i5, 8GB RAM, 256GB SSD"
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' },
              gap: 1.5,
            }}
          >
            <TextField
              label="Preço (R$)"
              size="small"
              required
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
            />

            <TextField
              label="Qtd. Estoque"
              size="small"
              required
              type="number"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
            />

            <TextField
              label="Código"
              size="small"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="PRD-001"
            />

            <TextField
              label="SKU"
              size="small"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="SKU-001"
            />
          </Box>

          {/* Seletor Visual de Imagem */}
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', mb: 1 }}>
              Selecione a Imagem do Produto:
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))',
                gap: 1,
                maxHeight: 140,
                overflowY: 'auto',
                p: 1,
                bgcolor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
            >
              {AVAILABLE_IMAGES.map((img) => {
                const isSelected = formData.imageUrl === img.src
                return (
                  <Box
                    key={img.src}
                    onClick={() => setFormData({ ...formData, imageUrl: img.src })}
                    sx={{
                      position: 'relative',
                      border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      bgcolor: '#ffffff',
                      borderRadius: '8px',
                      p: 0.5,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'all 0.15s ease',
                      '&:hover': { borderColor: '#93c5fd', transform: 'scale(1.02)' },
                    }}
                  >
                    <Box
                      component="img"
                      src={img.src}
                      alt={img.label}
                      onError={(e: any) => {
                        e.currentTarget.src = '/images/notebook.jpg'
                      }}
                      sx={{ width: 44, height: 44, objectFit: 'contain' }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.625rem',
                        color: isSelected ? '#2563eb' : '#64748b',
                        fontWeight: isSelected ? 600 : 400,
                        textAlign: 'center',
                        mt: 0.25,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                      }}
                    >
                      {img.label}
                    </Typography>
                    {isSelected && (
                      <CheckCircleRoundedIcon
                        sx={{
                          position: 'absolute',
                          top: 2,
                          right: 2,
                          fontSize: 14,
                          color: '#2563eb',
                        }}
                      />
                    )}
                  </Box>
                )
              })}
            </Box>

            {/* Input para URL customizada se desejar */}
            <TextField
              label="Ou informe uma URL personalizada para a imagem"
              size="small"
              fullWidth
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              sx={{ mt: 1.5 }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid #f1f5f9' }}>
          <Button
            onClick={() => setIsModalOpen(false)}
            disabled={isSaving}
            sx={{ textTransform: 'none', color: '#64748b' }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveProduct}
            disabled={isSaving}
            sx={{
              bgcolor: '#2563eb',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              '&:hover': { bgcolor: '#1d4ed8' },
            }}
          >
            {isSaving ? (
              <CircularProgress size={20} sx={{ color: '#ffffff' }} />
            ) : isEditing ? (
              'Salvar Alterações'
            ) : (
              'Cadastrar Produto'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Row Action Dropdown Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={() => setActionMenuAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
            },
          },
        }}
      >
        <MenuItem onClick={() => setActionMenuAnchor(null)} sx={{ fontSize: '0.75rem' }}>
          Duplicar produto
        </MenuItem>
        <MenuItem onClick={() => setActionMenuAnchor(null)} sx={{ fontSize: '0.75rem' }}>
          Gerar etiqueta de código de barras
        </MenuItem>
        <MenuItem
          onClick={() => setActionMenuAnchor(null)}
          sx={{ fontSize: '0.75rem', color: '#ef4444' }}
        >
          Desativar produto
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ProductsPage
