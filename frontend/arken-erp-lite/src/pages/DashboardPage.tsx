import React, { useState } from 'react'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
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

export const DashboardPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Últimos 30 dias')

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
            src={item.image}
            alt={item.name}
            variant="rounded"
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              label={initialMetrics[0].label}
              value={initialMetrics[0].value}
              change={initialMetrics[0].change}
              caption={initialMetrics[0].caption}
              tone={initialMetrics[0].tone}
              icon={<ShoppingCartOutlinedIcon />}
            />
            <KpiCard
              label={initialMetrics[1].label}
              value={initialMetrics[1].value}
              change={initialMetrics[1].change}
              caption={initialMetrics[1].caption}
              tone={initialMetrics[1].tone}
              icon={<Inventory2OutlinedIcon />}
            />
            <KpiCard
              label={initialMetrics[2].label}
              value={initialMetrics[2].value}
              change={initialMetrics[2].change}
              caption={initialMetrics[2].caption}
              tone={initialMetrics[2].tone}
              icon={<PeopleAltOutlinedIcon />}
            />
            <KpiCard
              label={initialMetrics[3].label}
              value={initialMetrics[3].value}
              change={initialMetrics[3].change}
              caption={initialMetrics[3].caption}
              tone={initialMetrics[3].tone}
              isNegative={initialMetrics[3].isNegative}
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
              <AreaLineChart data={revenueData} height={175} />
            </SectionCard>

            {/* Vendas por Categoria Chart Card */}
            <SectionCard title="Vendas por Categoria">
              <DonutChart
                categories={categoryShares}
                totalValue="R$ 48.532,80"
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
                data={recentSales}
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
                data={featuredProducts}
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