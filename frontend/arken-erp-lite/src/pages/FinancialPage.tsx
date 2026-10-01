import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import SouthEastRoundedIcon from '@mui/icons-material/SouthEastRounded'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'

import {
  KpiCard,
  SectionCard,
  DonutChart,
  CashFlowChart,
  StatusChip,
  FinanceAICard,
  financialKpiMetrics,
  cashFlowChartData,
  expensesCategories,
  paymentMethods,
  contasReceberData,
  contasPagarData,
  topSuppliersData,
  overdueAccountsData,
} from '../framework'

export const FinancialPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7 dias' | '30 dias' | '90 dias' | '1 ano'>('30 dias')
  const [dateRangeMenuAnchor, setDateRangeMenuAnchor] = useState<null | HTMLElement>(null)
  const [dateRangeLabel, setDateRangeLabel] = useState('01/07/2025 - 31/07/2025')

  // Checkbox selections for tables
  const [selectedReceber, setSelectedReceber] = useState<string[]>([])
  const [selectedPagar, setSelectedPagar] = useState<string[]>([])
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])

  const [rowMenuAnchor, setRowMenuAnchor] = useState<null | HTMLElement>(null)

  const handleSelectAllReceber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedReceber(contasReceberData.map((c) => c.id))
    } else {
      setSelectedReceber([])
    }
  }

  const handleToggleReceber = (id: string) => {
    setSelectedReceber((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSelectAllPagar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPagar(contasPagarData.map((c) => c.id))
    } else {
      setSelectedPagar([])
    }
  }

  const handleTogglePagar = (id: string) => {
    setSelectedPagar((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSelectAllSuppliers = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSuppliers(topSuppliersData.map((s) => s.id))
    } else {
      setSelectedSuppliers([])
    }
  }

  const handleToggleSupplier = (id: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Page Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          {/* Breadcrumb */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
            <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 15, color: '#64748b' }} />
            <Typography sx={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
              Financeiro &gt; <span style={{ color: '#0f172a', fontWeight: 600 }}>Visão Geral</span>
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: '1.625rem',
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}
          >
            Financeiro
          </Typography>
          <Typography
            sx={{
              color: '#64748b',
              fontSize: '0.8125rem',
              mt: 0.25,
            }}
          >
            Acompanhe suas receitas, despesas e o fluxo de caixa do seu negócio.
          </Typography>
        </Box>

        {/* Right side controls: Date dropdown and period pills */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexWrap: 'wrap',
          }}
        >
          {/* Date Range Selector Dropdown */}
          <Button
            variant="outlined"
            onClick={(e) => setDateRangeMenuAnchor(e.currentTarget)}
            startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 15, color: '#64748b' }} />}
            endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: 16, color: '#64748b' }} />}
            sx={{
              bgcolor: '#ffffff',
              borderColor: '#e2e8f0',
              color: '#1e293b',
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              px: 1.75,
              py: 0.75,
              '&:hover': {
                bgcolor: '#f8fafc',
                borderColor: '#cbd5e1',
              },
            }}
          >
            {dateRangeLabel}
          </Button>

          <Menu
            anchorEl={dateRangeMenuAnchor}
            open={Boolean(dateRangeMenuAnchor)}
            onClose={() => setDateRangeMenuAnchor(null)}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                  border: '1px solid #e2e8f0',
                  minWidth: 200,
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setDateRangeLabel('01/07/2025 - 31/07/2025')
                setDateRangeMenuAnchor(null)
              }}
              sx={{ fontSize: '0.75rem', fontWeight: 500 }}
            >
              01/07/2025 - 31/07/2025 (Julho)
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDateRangeLabel('01/06/2025 - 30/06/2025')
                setDateRangeMenuAnchor(null)
              }}
              sx={{ fontSize: '0.75rem', fontWeight: 500 }}
            >
              01/06/2025 - 30/06/2025 (Junho)
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDateRangeLabel('01/01/2025 - 31/12/2025')
                setDateRangeMenuAnchor(null)
              }}
              sx={{ fontSize: '0.75rem', fontWeight: 500 }}
            >
              Ano Completo (2025)
            </MenuItem>
          </Menu>

          {/* Quick Period Toggle Pills */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              p: 0.35,
              gap: 0.25,
            }}
          >
            {(['7 dias', '30 dias', '90 dias', '1 ano'] as const).map((period) => {
              const isActive = selectedPeriod === period
              return (
                <Button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    minWidth: 0,
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 600 : 500,
                    borderRadius: '6px',
                    textTransform: 'none',
                    bgcolor: isActive ? '#2563eb' : 'transparent',
                    color: isActive ? '#ffffff' : '#64748b',
                    boxShadow: isActive ? '0 1px 3px rgba(37, 99, 235, 0.3)' : 'none',
                    '&:hover': {
                      bgcolor: isActive ? '#1d4ed8' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#0f172a',
                    },
                  }}
                >
                  {period}
                </Button>
              )
            })}
          </Box>
        </Box>
      </Box>

      {/* Row 1: 4 KPI Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 1.5,
        }}
      >
        <KpiCard
          label={financialKpiMetrics[0].label}
          value={financialKpiMetrics[0].value}
          change={financialKpiMetrics[0].change}
          trendDirection={financialKpiMetrics[0].trendDirection}
          tone={financialKpiMetrics[0].tone}
          icon={<NorthEastRoundedIcon sx={{ fontSize: 20 }} />}
        />
        <KpiCard
          label={financialKpiMetrics[1].label}
          value={financialKpiMetrics[1].value}
          change={financialKpiMetrics[1].change}
          trendDirection={financialKpiMetrics[1].trendDirection}
          isNegative={true}
          tone={financialKpiMetrics[1].tone}
          icon={<SouthEastRoundedIcon sx={{ fontSize: 20 }} />}
        />
        <KpiCard
          label={financialKpiMetrics[2].label}
          value={financialKpiMetrics[2].value}
          change={financialKpiMetrics[2].change}
          trendDirection={financialKpiMetrics[2].trendDirection}
          tone={financialKpiMetrics[2].tone}
          icon={<AccountBalanceRoundedIcon sx={{ fontSize: 20 }} />}
        />
        <KpiCard
          label={financialKpiMetrics[3].label}
          value={financialKpiMetrics[3].value}
          change={financialKpiMetrics[3].change}
          trendDirection={financialKpiMetrics[3].trendDirection}
          trendColor={financialKpiMetrics[3].trendColor}
          tone={financialKpiMetrics[3].tone}
          icon={<CreditCardOutlinedIcon sx={{ fontSize: 20 }} />}
        />
      </Box>

      {/* Row 2: Main Layout (Left Content Column + Right AI Assistant) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 315px' },
          gap: 2,
          alignItems: 'start',
        }}
      >
        {/* Left Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          {/* Subrow 1: Fluxo de Caixa + Despesas por Categoria */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.45fr 1fr' },
              gap: 2,
            }}
          >
            {/* Fluxo de Caixa Chart */}
            <SectionCard title="Fluxo de Caixa">
              <CashFlowChart data={cashFlowChartData} height={200} yMax={60000} />
            </SectionCard>

            {/* Despesas por Categoria Donut */}
            <SectionCard title="Despesas por Categoria">
              <DonutChart
                categories={expensesCategories}
                totalValue="R$ 22.840,30"
                totalLabel="Total"
                size={118}
              />
            </SectionCard>
          </Box>

          {/* Subrow 2: Contas a Receber + Contas a Pagar */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2,
            }}
          >
            {/* Contas a Receber */}
            <SectionCard
              title="Contas a Receber"
              actionText="Ver todas"
              onAction={() => {}}
              sx={{ p: '16px 14px' }}
            >
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  bgcolor: 'transparent',
                  maxHeight: 250,
                  overflowX: 'hidden',
                  '& .MuiTableCell-root': {
                    py: 0.7,
                    px: 0.5,
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '0.6875rem',
                  },
                }}
              >
                <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
                  <TableHead>
                    <TableRow sx={{ '& th': { color: '#64748b', fontWeight: 600, fontSize: '0.65625rem' } }}>
                      <TableCell sx={{ width: 34, p: 0, pl: 0.75 }}>
                        <Checkbox
                          size="small"
                          checked={
                            contasReceberData.length > 0 &&
                            selectedReceber.length === contasReceberData.length
                          }
                          indeterminate={
                            selectedReceber.length > 0 &&
                            selectedReceber.length < contasReceberData.length
                          }
                          onChange={handleSelectAllReceber}
                          sx={{ p: 0.25, color: '#cbd5e1', '&.Mui-checked': { color: '#2563eb' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: 114, pl: 1.25, pr: 0.5 }}>Cliente</TableCell>
                      <TableCell sx={{ width: 86, px: 0.5 }}>Descrição</TableCell>
                      <TableCell sx={{ width: 75, px: 0.5 }}>Vencimento</TableCell>
                      <TableCell sx={{ width: 75, px: 0.5 }}>Valor</TableCell>
                      <TableCell sx={{ width: 70, px: 0.5 }}>Status</TableCell>
                      <TableCell align="right" sx={{ width: 18, p: 0 }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contasReceberData.map((item) => {
                      const isChecked = selectedReceber.includes(item.id)
                      return (
                        <TableRow
                          key={item.id}
                          hover
                          selected={isChecked}
                          sx={{
                            '&:hover': { bgcolor: '#f8fafc' },
                            '&.Mui-selected': { bgcolor: '#eff6ff !important' },
                          }}
                        >
                          <TableCell sx={{ p: 0, pl: 0.75 }}>
                            <Checkbox
                              size="small"
                              checked={isChecked}
                              onChange={() => handleToggleReceber(item.id)}
                              sx={{ p: 0.25, color: '#cbd5e1', '&.Mui-checked': { color: '#2563eb' } }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: '#0f172a',
                              pl: 1.25,
                              pr: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.cliente}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: '#64748b',
                              px: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.descricao}
                          </TableCell>
                          <TableCell sx={{ color: '#64748b', px: 0.5, whiteSpace: 'nowrap' }}>
                            {item.vencimento}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#0f172a', px: 0.5, whiteSpace: 'nowrap' }}>
                            {item.valor}
                          </TableCell>
                          <TableCell sx={{ px: 0.5 }}>
                            <StatusChip
                              status={item.status}
                              size="small"
                              sx={{ height: 20, fontSize: '0.625rem', '& .MuiChip-label': { px: 0.75 } }}
                            />
                          </TableCell>
                          <TableCell align="right" sx={{ p: 0 }}>
                            <IconButton
                              size="small"
                              onClick={(e) => setRowMenuAnchor(e.currentTarget)}
                              sx={{ color: '#94a3b8', p: 0.25 }}
                            >
                              <MoreVertRoundedIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </SectionCard>

            {/* Contas a Pagar */}
            <SectionCard
              title="Contas a Pagar"
              actionText="Ver todas"
              onAction={() => {}}
              sx={{ p: '16px 14px' }}
            >
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  bgcolor: 'transparent',
                  maxHeight: 250,
                  overflowX: 'hidden',
                  '& .MuiTableCell-root': {
                    py: 0.7,
                    px: 0.5,
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '0.6875rem',
                  },
                }}
              >
                <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}>
                  <TableHead>
                    <TableRow sx={{ '& th': { color: '#64748b', fontWeight: 600, fontSize: '0.65625rem' } }}>
                      <TableCell sx={{ width: 34, p: 0, pl: 0.75 }}>
                        <Checkbox
                          size="small"
                          checked={
                            contasPagarData.length > 0 &&
                            selectedPagar.length === contasPagarData.length
                          }
                          indeterminate={
                            selectedPagar.length > 0 &&
                            selectedPagar.length < contasPagarData.length
                          }
                          onChange={handleSelectAllPagar}
                          sx={{ p: 0.25, color: '#cbd5e1', '&.Mui-checked': { color: '#2563eb' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: 122, pl: 1.25, pr: 0.5 }}>Fornecedor</TableCell>
                      <TableCell sx={{ width: 104, px: 0.5 }}>Descrição</TableCell>
                      <TableCell sx={{ width: 72, px: 0.5 }}>Vencimento</TableCell>
                      <TableCell sx={{ width: 72, px: 0.5 }}>Valor</TableCell>
                      <TableCell sx={{ width: 70, px: 0.5 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contasPagarData.map((item) => {
                      const isChecked = selectedPagar.includes(item.id)
                      return (
                        <TableRow
                          key={item.id}
                          hover
                          selected={isChecked}
                          sx={{
                            '&:hover': { bgcolor: '#f8fafc' },
                            '&.Mui-selected': { bgcolor: '#eff6ff !important' },
                          }}
                        >
                          <TableCell sx={{ p: 0, pl: 0.75 }}>
                            <Checkbox
                              size="small"
                              checked={isChecked}
                              onChange={() => handleTogglePagar(item.id)}
                              sx={{ p: 0.25, color: '#cbd5e1', '&.Mui-checked': { color: '#2563eb' } }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: '#0f172a',
                              pl: 1.25,
                              pr: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.fornecedor}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: '#64748b',
                              px: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.descricao}
                          </TableCell>
                          <TableCell sx={{ color: '#64748b', px: 0.5, whiteSpace: 'nowrap' }}>
                            {item.vencimento}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#0f172a', px: 0.5, whiteSpace: 'nowrap' }}>
                            {item.valor}
                          </TableCell>
                          <TableCell sx={{ px: 0.5 }}>
                            <StatusChip
                              status={item.status}
                              size="small"
                              sx={{ height: 20, fontSize: '0.625rem', '& .MuiChip-label': { px: 0.75 } }}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </SectionCard>
          </Box>

          {/* Subrow 3: Resumo Forma de Pagamento + Principais Fornecedores + Contas em Atraso */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.35fr 1.05fr' },
              gap: 2,
            }}
          >
            {/* Resumo por Forma de Pagamento */}
            <SectionCard title="Resumo por Forma de Pagamento">
              <DonutChart
                categories={paymentMethods}
                totalValue="R$ 48.532,80"
                totalLabel="Total"
                size={104}
              />
            </SectionCard>

            {/* Principais Fornecedores */}
            <SectionCard
              title="Principais Fornecedores"
              actionText="Ver todas"
              onAction={() => {}}
              sx={{ p: '16px 14px' }}
            >
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  bgcolor: 'transparent',
                  maxHeight: 230,
                  overflowX: 'hidden',
                  '& .MuiTableCell-root': {
                    py: 0.7,
                    px: 0.6,
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '0.7rem',
                  },
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { color: '#64748b', fontWeight: 600, fontSize: '0.65625rem' } }}>
                      <TableCell sx={{ width: 34, p: 0, pl: 0.75 }}>
                        <Checkbox
                          size="small"
                          checked={
                            topSuppliersData.length > 0 &&
                            selectedSuppliers.length === topSuppliersData.length
                          }
                          indeterminate={
                            selectedSuppliers.length > 0 &&
                            selectedSuppliers.length < topSuppliersData.length
                          }
                          onChange={handleSelectAllSuppliers}
                          sx={{ p: 0.25, color: '#cbd5e1', '&.Mui-checked': { color: '#2563eb' } }}
                        />
                      </TableCell>
                      <TableCell sx={{ pl: 1.25, pr: 0.5 }}>Fornecedor</TableCell>
                      <TableCell sx={{ px: 0.5 }}>Total Comprado</TableCell>
                      <TableCell sx={{ px: 0.5 }}>Última Compra</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topSuppliersData.map((s) => {
                      const isChecked = selectedSuppliers.includes(s.id)
                      return (
                        <TableRow
                          key={s.id}
                          hover
                          selected={isChecked}
                          sx={{
                            '&:hover': { bgcolor: '#f8fafc' },
                            '&.Mui-selected': { bgcolor: '#eff6ff !important' },
                          }}
                        >
                          <TableCell sx={{ p: 0, pl: 0.75 }}>
                            <Checkbox
                              size="small"
                              checked={isChecked}
                              onChange={() => handleToggleSupplier(s.id)}
                              sx={{ p: 0.25, color: '#cbd5e1', '&.Mui-checked': { color: '#2563eb' } }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#0f172a', pl: 1.25, pr: 0.5, whiteSpace: 'nowrap' }}>
                            {s.fornecedor}
                          </TableCell>
                          <TableCell sx={{ color: '#0f172a', fontWeight: 600, px: 0.5, whiteSpace: 'nowrap' }}>
                            {s.totalComprado}
                          </TableCell>
                          <TableCell sx={{ color: '#64748b', px: 0.5, whiteSpace: 'nowrap' }}>
                            {s.ultimaCompra}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </SectionCard>

            {/* Contas em Atraso */}
            <SectionCard
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>
                    Contas em Atraso
                  </Typography>
                  <Box
                    sx={{
                      width: 17,
                      height: 17,
                      borderRadius: '50%',
                      bgcolor: '#ef4444',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    3
                  </Box>
                </Box>
              }
              actionText="Ver todas"
              onAction={() => {}}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 0.5 }}>
                {overdueAccountsData.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 0.75,
                      px: 0.25,
                      borderBottom: '1px solid #f1f5f9',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: '#ef4444',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          lineHeight: 1,
                        }}
                      >
                        !
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: '0.71875rem',
                            fontWeight: 600,
                            color: '#0f172a',
                            lineHeight: 1.2,
                          }}
                        >
                          {item.titulo}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.625rem',
                            color: '#94a3b8',
                            lineHeight: 1.2,
                            mt: 0.25,
                          }}
                        >
                          {item.subtitulo}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        sx={{
                          fontSize: '0.71875rem',
                          fontWeight: 600,
                          color: '#0f172a',
                          lineHeight: 1.2,
                        }}
                      >
                        {item.valor}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.625rem',
                          fontWeight: 600,
                          color: '#ef4444',
                          lineHeight: 1.2,
                          mt: 0.25,
                        }}
                      >
                        {item.diasAtraso}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </SectionCard>
          </Box>
        </Box>

        {/* Right Column: Assistente IA */}
        <Box sx={{ width: '100%' }}>
          <FinanceAICard />
        </Box>
      </Box>

      {/* Row Action Context Menu */}
      <Menu
        anchorEl={rowMenuAnchor}
        open={Boolean(rowMenuAnchor)}
        onClose={() => setRowMenuAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
              border: '1px solid #e2e8f0',
              minWidth: 140,
            },
          },
        }}
      >
        <MenuItem onClick={() => setRowMenuAnchor(null)} sx={{ fontSize: '0.75rem' }}>
          Visualizar Detalhes
        </MenuItem>
        <MenuItem onClick={() => setRowMenuAnchor(null)} sx={{ fontSize: '0.75rem' }}>
          Baixar Boleto/Recibo
        </MenuItem>
        <MenuItem onClick={() => setRowMenuAnchor(null)} sx={{ fontSize: '0.75rem', color: '#16a34a' }}>
          Marcar como Pago
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default FinancialPage
