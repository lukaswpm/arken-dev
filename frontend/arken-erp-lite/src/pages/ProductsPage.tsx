import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  InputBase,
  Checkbox,
  IconButton,
  Tooltip,
  Card,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Avatar,
  Chip,
  Menu,
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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

import {
  KpiCard,
  DataTable,
  StatusChip,
  ProductDetailCard,
  catalogProducts,
  type CatalogProduct,
} from '../framework'

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas as categorias')
  const [selectedStatus, setSelectedStatus] = useState('Todos os status')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<CatalogProduct>(
    catalogProducts[0]
  )
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null)

  // Filter products based on category, status, and search query
  const filteredProducts = catalogProducts.filter((prod) => {
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

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProductIds(filteredProducts.map((p) => p.id))
    } else {
      setSelectedProductIds([])
    }
  }

  const handleSelectOne = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Table columns definition
  const columns = [
    {
      id: 'select',
      label: (
        <Checkbox
          size="small"
          indeterminate={
            selectedProductIds.length > 0 &&
            selectedProductIds.length < filteredProducts.length
          }
          checked={
            filteredProducts.length > 0 &&
            selectedProductIds.length === filteredProducts.length
          }
          onChange={handleSelectAll}
          sx={{
            p: 0.5,
            color: '#cbd5e1',
            '&.Mui-checked': { color: '#2563eb' },
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
      minWidth: 190,
      render: (item: CatalogProduct) => (
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
            src={item.image}
            alt={item.name}
            variant="rounded"
            sx={{
              width: 28,
              height: 28,
              borderRadius: '6px',
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
      ),
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
      label: 'Preço de Venda',
      minWidth: 95,
      render: (item: CatalogProduct) => (
        <Typography sx={{ color: '#334155', fontWeight: 500, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
          {item.price}
        </Typography>
      ),
    },
    {
      id: 'stock',
      label: 'Estoque',
      minWidth: 60,
      render: (item: CatalogProduct) => (
        <Typography sx={{ color: '#475569', fontSize: '0.75rem', fontWeight: 500 }}>
          {item.stock}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 90,
      render: (item: CatalogProduct) => <StatusChip status={item.status} />,
    },
    {
      id: 'actions',
      label: 'Ações',
      align: 'right' as const,
      minWidth: 85,
      render: (item: CatalogProduct) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
          <Tooltip title="Ver detalhes">
            <IconButton
              size="small"
              onClick={() => setSelectedProductForDetail(item)}
              sx={{ color: '#64748b', p: 0.5, '&:hover': { color: '#2563eb' } }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar produto">
            <IconButton size="small" sx={{ color: '#64748b', p: 0.5, '&:hover': { color: '#2563eb' } }}>
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <IconButton
            size="small"
            onClick={(e) => setActionMenuAnchor(e.currentTarget)}
            sx={{ color: '#64748b', p: 0.5 }}
          >
            <MoreHorizRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Header Eyebrow + Title + Category & Status Filters + View Mode + CTA */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'flex-start', lg: 'center' },
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b', mb: 0.25 }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
              Produtos &gt; Lista
            </Typography>
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.35rem', sm: '1.6rem' },
              color: '#0f172a',
              letterSpacing: '-0.03em',
              my: 0.25,
            }}
          >
            Produtos
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
            Gerencie seu catálogo de produtos, categorias, preços e estoque.
          </Typography>
        </Box>

        {/* Filters and CTA Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
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
            <MenuItem value="Eletrônicos">Eletrônicos</MenuItem>
            <MenuItem value="Celulares">Celulares</MenuItem>
            <MenuItem value="Roupas">Roupas</MenuItem>
            <MenuItem value="Áudio">Áudio</MenuItem>
            <MenuItem value="Eletrodomésticos">Eletrodomésticos</MenuItem>
            <MenuItem value="Periféricos">Periféricos</MenuItem>
            <MenuItem value="Monitores">Monitores</MenuItem>
            <MenuItem value="Armazenamento">Armazenamento</MenuItem>
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
              label="Total de Produtos"
              value="128"
              change="8,3%"
              caption="em relação ao mês anterior"
              tone="blue"
              icon={<Inventory2OutlinedIcon />}
            />
            <KpiCard
              label="Produtos em Estoque"
              value="102"
              change="12,5%"
              caption="em relação ao mês anterior"
              tone="blue"
              icon={<ShoppingCartOutlinedIcon />}
            />
            <KpiCard
              label="Estoque Crítico"
              value="8"
              change="28,6%"
              caption="em relação ao mês anterior"
              tone="orange"
              isNegative={true}
              icon={<NotificationsActiveOutlinedIcon sx={{ color: '#ef4444' }} />}
            />
            <KpiCard
              label="Produtos Parados"
              value="15"
              change="6,7%"
              caption="em relação ao mês anterior"
              tone="blue"
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
            }}
          >
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

            {/* Table */}
            <DataTable
              columns={columns}
              data={filteredProducts}
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
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.6875rem' }}>
                Mostrando 1-{filteredProducts.length} de 128 produtos
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton size="small" sx={{ p: 0.5, color: '#94a3b8' }}>
                  <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>

                {[1, 2, 3, 4, 5].map((page) => (
                  <Box
                    key={page}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '4px',
                      bgcolor: page === 1 ? '#2563eb' : 'transparent',
                      color: page === 1 ? '#ffffff' : '#64748b',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: page === 1 ? '#1d4ed8' : '#f1f5f9',
                      },
                    }}
                  >
                    {page}
                  </Box>
                ))}

                <Typography sx={{ color: '#94a3b8', fontSize: '0.75rem', px: 0.5 }}>...</Typography>

                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '4px',
                    color: '#64748b',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#f1f5f9' },
                  }}
                >
                  13
                </Box>

                <IconButton size="small" sx={{ p: 0.5, color: '#64748b' }}>
                  <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Column: Product Detail & AI Insights Panel */}
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
                selectedProductForDetail.code === 'NT001'
                  ? '/images/dell_hero.jpg'
                  : selectedProductForDetail.image,
              description: `${selectedProductForDetail.name}, ideal para trabalho e estudos. Especificações técnicas de alta performance e acabamento premium.`,
              brand: 'Dell',
              model: selectedProductForDetail.name,
              weight: '2,1 kg',
              dimensions: '36 x 24 x 2 cm',
            }}
          />
        </Box>
      </Box>

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
        <MenuItem onClick={() => setActionMenuAnchor(null)} sx={{ fontSize: '0.75rem', color: '#ef4444' }}>
          Desativar produto
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ProductsPage
