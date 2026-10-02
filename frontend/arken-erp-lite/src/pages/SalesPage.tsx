import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  InputBase,
  Checkbox,
  IconButton,
  Tooltip,
  Card,
  Menu,
  MenuItem,
  type SelectChangeEvent,
  Select,
  LinearProgress,
} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

import {
  KpiCard,
  SectionCard,
  DataTable,
  StatusChip,
  AreaLineChart,
  DonutChart,
  OrderDetailsCard,
  SalesAICard,
  salesOrders,
  salesEvolutionVendas,
  salesEvolutionTicket,
  salesCategoryShares,
  type OrderItem,
} from '../framework'
import { salesService, type SalesKpiResponse } from '../services'

export const SalesPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>(salesOrders)
  const [kpisData, setKpisData] = useState<SalesKpiResponse | null>(null)
  const [evolutionVendas, setEvolutionVendas] = useState(salesEvolutionVendas)
  const [evolutionTicket, setEvolutionTicket] = useState(salesEvolutionTicket)
  const [categoryShares, setCategoryShares] = useState(salesCategoryShares)
  const [selectedPeriod, setSelectedPeriod] = useState('Últimos 30 dias')
  const [activeTab, setActiveTab] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [selectedOrderForPreview, setSelectedOrderForPreview] = useState<string>('#000128')
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carrega pedidos e KPIs de vendas dinamicamente da API
  useEffect(() => {
    let isMounted = true
    async function loadSales() {
      setIsLoading(true)
      try {
        const [ordersRes, kpisRes] = await Promise.allSettled([
          salesService.getSales(),
          salesService.getSalesKpis(),
        ])
        if (!isMounted) return

        if (ordersRes.status === 'fulfilled' && ordersRes.value?.length) {
          setOrders(ordersRes.value)
          setSelectedOrderForPreview(ordersRes.value[0].orderNumber)
        }
        if (kpisRes.status === 'fulfilled' && kpisRes.value) {
          setKpisData(kpisRes.value)
          if (kpisRes.value.evolutionVendas?.length) {
            setEvolutionVendas(kpisRes.value.evolutionVendas)
          }
          if (kpisRes.value.evolutionTicket?.length) {
            setEvolutionTicket(kpisRes.value.evolutionTicket)
          }
          if (kpisRes.value.categoryShares?.length) {
            setCategoryShares(kpisRes.value.categoryShares)
          }
        }
      } catch (err) {
        console.warn('Erro ao carregar dados de vendas do backend. Usando dados locais.', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadSales()
    return () => {
      isMounted = false
    }
  }, [])

  // Filter orders based on active tab and search
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'Em andamento' && order.status !== 'Em andamento') return false
    if (activeTab === 'Concluídos' && order.status !== 'Concluído') return false
    if (activeTab === 'Cancelados' && order.status !== 'Cancelado') return false

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        order.orderNumber.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedOrders(filteredOrders.map((o) => o.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOne = (id: string) => {
    setSelectedOrders((prev) =>
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
          indeterminate={selectedOrders.length > 0 && selectedOrders.length < filteredOrders.length}
          checked={filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length}
          onChange={handleSelectAll}
          sx={{
            p: 0.5,
            color: '#cbd5e1',
            '&.Mui-checked': { color: '#2563eb' },
          }}
        />
      ),
      minWidth: 40,
      render: (item: OrderItem) => (
        <Checkbox
          size="small"
          checked={selectedOrders.includes(item.id)}
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
      id: 'orderNumber',
      label: 'Nº Pedido',
      minWidth: 90,
      render: (item: OrderItem) => (
        <Typography
          onClick={() => setSelectedOrderForPreview(item.orderNumber)}
          sx={{
            color: '#2563eb',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {item.orderNumber}
        </Typography>
      ),
    },
    {
      id: 'date',
      label: 'Data',
      minWidth: 85,
      render: (item: OrderItem) => (
        <Typography sx={{ color: '#64748b', fontSize: '0.75rem' }}>
          {item.date}
        </Typography>
      ),
    },
    {
      id: 'customer',
      label: 'Cliente',
      minWidth: 150,
      render: (item: OrderItem) => (
        <Typography sx={{ fontWeight: 500, color: '#1e293b', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
          {item.customer}
        </Typography>
      ),
    },
    {
      id: 'itemsCount',
      label: 'Itens',
      minWidth: 50,
      render: (item: OrderItem) => (
        <Typography sx={{ color: '#475569', fontSize: '0.75rem' }}>
          {item.itemsCount}
        </Typography>
      ),
    },
    {
      id: 'total',
      label: 'Total',
      minWidth: 95,
      render: (item: OrderItem) => (
        <Typography sx={{ color: '#334155', fontWeight: 500, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
          {item.total}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 90,
      render: (item: OrderItem) => <StatusChip status={item.status} />,
    },
    {
      id: 'actions',
      label: 'Ações',
      align: 'right' as const,
      minWidth: 90,
      render: (item: OrderItem) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
          <Tooltip title="Ver detalhes">
            <IconButton
              size="small"
              onClick={() => setSelectedOrderForPreview(item.orderNumber)}
              sx={{ color: '#64748b', p: 0.5, '&:hover': { color: '#2563eb' } }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar pedido">
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
      {/* Header Eyebrow + Title + Actions */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b', mb: 0.25 }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
              Vendas
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
            Pedidos de Venda
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
            Gerencie seus pedidos, acompanhe o status e visualize o desempenho das vendas.
          </Typography>
        </Box>

        {/* Date Filter & New Order CTA */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
          <Select
            value={selectedPeriod}
            onChange={(e: SelectChangeEvent) => setSelectedPeriod(e.target.value)}
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
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                py: 0.75,
                pr: '32px !important',
                pl: 1.25,
              },
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
            }}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <CalendarTodayOutlinedIcon sx={{ fontSize: 15, color: '#64748b' }} />
                <span>{selected}</span>
              </Box>
            )}
          >
            <MenuItem value="01/07/2025 - 31/07/2025">01/07/2025 - 31/07/2025</MenuItem>
            <MenuItem value="Últimos 30 dias">Últimos 30 dias</MenuItem>
            <MenuItem value="Últimos 90 dias">Últimos 90 dias</MenuItem>
            <MenuItem value="Ano atual (2025)">Ano atual (2025)</MenuItem>
          </Select>

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
            Novo Pedido
          </Button>
        </Box>
      </Box>

      {/* Main Grid: Left Center Content + Right Dual Sidebar Cards */}
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
              label="Total de Vendas"
              value={kpisData?.totalSales || "R$ 48.532,80"}
              change={kpisData ? `${kpisData.salesDeltaPct >= 0 ? '+' : ''}${kpisData.salesDeltaPct}%` : "12,5%"}
              trendDirection={kpisData?.salesDeltaDirection || "up"}
              caption="em relação ao período anterior"
              tone="green"
              icon={<ShoppingCartOutlinedIcon />}
            />
            <KpiCard
              label="Total de Pedidos"
              value={kpisData?.ordersCount ? kpisData.ordersCount.toString() : "128"}
              change="8,3%"
              trendDirection="up"
              caption="em relação ao período anterior"
              tone="blue"
              icon={<DescriptionOutlinedIcon />}
            />
            <KpiCard
              label="Ticket Médio"
              value={kpisData?.averageTicket || "R$ 379,94"}
              change="6,7%"
              trendDirection="up"
              caption="em relação ao período anterior"
              tone="purple"
              icon={<ReceiptLongOutlinedIcon />}
            />
            <KpiCard
              label="Taxa de Conversão"
              value={kpisData ? `${kpisData.conversionRate}%` : "88.9%"}
              change="5,4%"
              trendDirection="up"
              caption="em relação ao período anterior"
              tone="blue"
              icon={<LocalOfferOutlinedIcon />}
            />
          </Box>

          {/* Middle Charts Grid (Evolução das Vendas + Vendas por Categoria) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 1.5,
            }}
          >
            {/* Evolução das Vendas Card */}
            <SectionCard
              title="Evolução das Vendas"
              headerRight={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#2563eb' }} />
                    <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.6875rem' }}>
                      Vendas
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#8b5cf6' }} />
                    <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.6875rem' }}>
                      Ticket Médio
                    </Typography>
                  </Box>
                </Box>
              }
            >
              <AreaLineChart
                data={evolutionVendas.length ? evolutionVendas : salesEvolutionVendas}
                secondaryData={evolutionTicket.length ? evolutionTicket : salesEvolutionTicket}
                height={175}
              />
            </SectionCard>

            {/* Vendas por Categoria Card */}
            <SectionCard title="Vendas por Categoria">
              <DonutChart
                categories={categoryShares.length ? categoryShares : salesCategoryShares}
                totalValue={kpisData?.totalSales || "R$ 48.532,80"}
                totalLabel="Total"
              />
            </SectionCard>
          </Box>

          {/* Lower Section: Orders Table with Tabs, Search, and Pagination */}
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
            {/* Toolbar: Tabs + Search & Filters */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                gap: 1.5,
                borderBottom: '1px solid #f1f5f9',
                pb: 1,
              }}
            >
              {/* Tabs */}
              <Tabs
                value={activeTab}
                onChange={(_, val) => setActiveTab(val)}
                sx={{
                  minHeight: 34,
                  '& .MuiTab-root': {
                    minHeight: 34,
                    py: 0.5,
                    px: 1.5,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    color: '#64748b',
                    '&.Mui-selected': {
                      color: '#2563eb',
                      fontWeight: 600,
                    },
                  },
                  '& .MuiTabs-indicator': {
                    bgcolor: '#2563eb',
                    height: 2,
                    borderRadius: '2px',
                  },
                }}
              >
                <Tab label="Todos" value="Todos" />
                <Tab label="Em andamento" value="Em andamento" />
                <Tab label="Concluídos" value="Concluídos" />
                <Tab label="Cancelados" value="Cancelados" />
              </Tabs>

              {/* Search + Filter Button */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    px: 1,
                    py: 0.4,
                    gap: 0.75,
                    width: { xs: '100%', sm: 180 },
                  }}
                >
                  <SearchRoundedIcon sx={{ color: '#94a3b8', fontSize: 16 }} />
                  <InputBase
                    placeholder="Buscar pedido..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      fontSize: '0.75rem',
                      color: '#0f172a',
                      '& input::placeholder': { color: '#94a3b8', opacity: 1 },
                    }}
                  />
                </Box>

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
              </Box>
            </Box>

            {/* Table */}
            <DataTable
              columns={columns}
              data={filteredOrders}
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
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.6875rem' }}>
                Mostrando 1-{filteredOrders.length} de 128 pedidos
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

                <IconButton size="small" sx={{ p: 0.5, color: '#64748b' }}>
                  <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Column: Dual Cards (SalesAICard + OrderDetailsCard) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SalesAICard />
          <OrderDetailsCard orderNumber={selectedOrderForPreview} />
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
          Imprimir comprovante
        </MenuItem>
        <MenuItem onClick={() => setActionMenuAnchor(null)} sx={{ fontSize: '0.75rem' }}>
          Enviar por WhatsApp
        </MenuItem>
        <MenuItem onClick={() => setActionMenuAnchor(null)} sx={{ fontSize: '0.75rem', color: '#ef4444' }}>
          Cancelar pedido
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default SalesPage
