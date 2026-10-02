import React, { useState, useEffect } from 'react'
import { Box, Typography, IconButton, Avatar, LinearProgress } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

import {
  KpiCard,
  SectionCard,
  ActionCard,
  DataTable,
  StatusChip,
  AreaLineChart,
  DonutChart,
  AIAssistantDrawer,
  DateRangeSelect,
  initialMetrics,
  recentSales,
  featuredProducts,
  categoryShares,
  revenueData,
  type SaleItem,
  type ProductItem,
} from '../framework'
import { dashboardService, type DashboardSummaryResponse } from '../services'

export const DashboardPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Últimos 30 dias')
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function loadDashboard() {
      setIsLoading(true)
      try {
        const data = await dashboardService.getSummary()
        if (isMounted && data) {
          setSummary(data)
        }
      } catch (err) {
        console.warn('Erro ao carregar resumo do dashboard. Usando dados locais.', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    loadDashboard()
    return () => {
      isMounted = false
    }
  }, [])

  // Table columns definition for Vendas Recentes
  const salesColumns = [
    {
      id: 'date',
      label: 'Data',
      minWidth: 75,
      render: (item: SaleItem) => (
        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
          {item.date}
        </Typography>
      ),
    },
    {
      id: 'customer',
      label: 'Cliente',
      minWidth: 135,
      render: (item: SaleItem) => (
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
          {item.customer}
        </Typography>
      ),
    },
    {
      id: 'total',
      label: 'Total',
      minWidth: 95,
      render: (item: SaleItem) => (
        <Typography variant="body2" sx={{ color: '#334155', fontSize: '0.75rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
          {item.total}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 80,
      render: (item: SaleItem) => <StatusChip status={item.status} />,
    },
    {
      id: 'actions',
      label: '',
      align: 'right' as const,
      minWidth: 30,
      render: () => (
        <IconButton size="small" sx={{ color: '#94a3b8', p: 0.25 }}>
          <MoreHorizRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      ),
    },
  ]

  // Table columns definition for Produtos em Destaque
  const productColumns = [
    {
      id: 'product',
      label: 'Produto',
      minWidth: 155,
      render: (item: ProductItem) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Avatar
            src={item.image || (item as any).imageUrl || '/images/notebook.jpg'}
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
              width: 28,
              height: 28,
              borderRadius: '6px',
              bgcolor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              img: {
                objectFit: 'contain',
                p: 0.25,
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: '#1e293b',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.name}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'sales',
      label: 'Vendas',
      align: 'left' as const,
      minWidth: 50,
      render: (item: ProductItem) => (
        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.75rem' }}>
          {item.sales}
        </Typography>
      ),
    },
    {
      id: 'value',
      label: 'Valor',
      align: 'left' as const,
      minWidth: 90,
      render: (item: ProductItem) => (
        <Typography variant="body2" sx={{ color: '#334155', fontWeight: 500, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
          {item.value}
        </Typography>
      ),
    },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
      {isLoading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: -12,
            left: 0,
            right: 0,
            height: 3,
            borderRadius: '2px',
            bgcolor: '#eff6ff',
            zIndex: 10,
            '& .MuiLinearProgress-bar': { bgcolor: '#2563eb' },
          }}
        />
      )}
      {/* Welcome Banner + Date Filter */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Bem-vindo de volta,
          </Typography>
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
            Lucas Santos!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontSize: '0.75rem',
            }}
          >
            Aqui está um resumo do seu negócio hoje.
          </Typography>
        </Box>

        <DateRangeSelect value={selectedPeriod} onChange={setSelectedPeriod} />
      </Box>

      {/* Main Grid: Left Center Content + Right AI Assistant */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 360px' },
          gap: 2,
          alignItems: 'start',
        }}
      >
        {/* Left / Center Column */}
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
              label={summary?.metrics[0]?.label || initialMetrics[0].label}
              value={summary?.metrics[0]?.value || initialMetrics[0].value}
              change={summary?.metrics[0]?.change || initialMetrics[0].change}
              trendDirection={summary?.metrics[0]?.trendDirection || 'up'}
              caption={summary?.metrics[0]?.caption || initialMetrics[0].caption}
              tone={summary?.metrics[0]?.tone || initialMetrics[0].tone}
              icon={<ShoppingCartOutlinedIcon />}
            />
            <KpiCard
              label={summary?.metrics[1]?.label || initialMetrics[1].label}
              value={summary?.metrics[1]?.value || initialMetrics[1].value}
              change={summary?.metrics[1]?.change || initialMetrics[1].change}
              trendDirection={summary?.metrics[1]?.trendDirection || 'up'}
              caption={summary?.metrics[1]?.caption || initialMetrics[1].caption}
              tone={summary?.metrics[1]?.tone || initialMetrics[1].tone}
              icon={<Inventory2OutlinedIcon />}
            />
            <KpiCard
              label={summary?.metrics[2]?.label || initialMetrics[2].label}
              value={summary?.metrics[2]?.value || initialMetrics[2].value}
              change={summary?.metrics[2]?.change || initialMetrics[2].change}
              trendDirection={summary?.metrics[2]?.trendDirection || 'up'}
              caption={summary?.metrics[2]?.caption || initialMetrics[2].caption}
              tone={summary?.metrics[2]?.tone || initialMetrics[2].tone}
              icon={<PeopleAltOutlinedIcon />}
            />
            <KpiCard
              label={summary?.metrics[3]?.label || initialMetrics[3].label}
              value={summary?.metrics[3]?.value || initialMetrics[3].value}
              change={summary?.metrics[3]?.change || initialMetrics[3].change}
              trendDirection={summary?.metrics[3]?.trendDirection || 'up'}
              caption={summary?.metrics[3]?.caption || initialMetrics[3].caption}
              tone={summary?.metrics[3]?.tone || initialMetrics[3].tone}
              icon={<Inventory2OutlinedIcon />}
            />
          </Box>

          {/* Middle Charts Grid (Faturamento + Vendas por Categoria) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 1.5,
            }}
          >
            {/* Faturamento Chart Card */}
            <SectionCard
              title="Faturamento"
              subtitle="Últimos 7 dias"
              headerRight={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      bgcolor: '#2563eb',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: '#64748b', fontSize: '0.6875rem', fontWeight: 500 }}
                  >
                    Vendas
                  </Typography>
                </Box>
              }
            >
              <AreaLineChart
                data={summary?.revenueData?.length ? summary.revenueData : revenueData}
                height={175}
              />
            </SectionCard>

            {/* Vendas por Categoria Chart Card */}
            <SectionCard title="Vendas por Categoria">
              <DonutChart
                categories={summary?.categoryShares?.length ? summary.categoryShares : categoryShares}
                totalValue={summary?.metrics[0]?.value || "R$ 48.532,80"}
                totalLabel="Total"
              />
            </SectionCard>
          </Box>

          {/* Tables Grid (Vendas Recentes + Produtos em Destaque) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 1.5,
            }}
          >
            {/* Vendas Recentes */}
            <SectionCard
              title="Vendas Recentes"
              actionText="Ver todas"
              actionHref="/sales"
            >
              <DataTable
                columns={salesColumns}
                data={summary?.recentSales?.length ? (summary.recentSales as any) : recentSales}
                loading={isLoading}
                keyExtractor={(item) => item.id}
              />
            </SectionCard>

            {/* Produtos em Destaque */}
            <SectionCard
              title="Produtos em Destaque"
              actionText="Ver todos"
              actionHref="/products"
            >
              <DataTable
                columns={productColumns}
                data={summary?.featuredProducts?.length ? (summary.featuredProducts as any) : featuredProducts}
                loading={isLoading}
                keyExtractor={(item) => item.id}
              />
            </SectionCard>
          </Box>

          {/* Quick Actions (Bottom 4 Cards) */}
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
            <ActionCard
              title="Estoque"
              description="Confira o status do seu estoque e evite rupturas."
              icon={<Inventory2OutlinedIcon />}
              to="/inventory"
            />
            <ActionCard
              title="Nova Venda"
              description="Registre uma nova venda em poucos cliques."
              icon={<AddShoppingCartOutlinedIcon />}
              to="/sales"
            />
            <ActionCard
              title="Novo Cliente"
              description="Cadastre um novo cliente no sistema."
              icon={<PersonAddAlt1OutlinedIcon />}
              to="/customers"
            />
            <ActionCard
              title="Pergunte ao ERP"
              description="Use a IA para consultar dados, gerar relatórios e muito mais."
              icon={<AutoAwesomeRoundedIcon />}
              variant="ai"
              onClick={() => {
                const el = document.getElementById('ai-assistant-card')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            />
          </Box>
        </Box>

        {/* Right Side: AI Assistant Panel */}
        <Box
          id="ai-assistant-card"
          sx={{
            position: { lg: 'sticky' },
            top: { lg: 76 },
            height: { xs: 'auto', lg: 'calc(100vh - 90px)' },
            minHeight: 620,
          }}
        >
          <AIAssistantDrawer />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardPage