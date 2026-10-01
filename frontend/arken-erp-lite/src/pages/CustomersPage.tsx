import React, { useState } from 'react'
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

import {
  KpiCard,
  StatusChip,
  CustomerDetailCard,
  customersKpiMetrics,
  customersData,
  defaultCustomerDetail,
  type CustomerItem,
  type CustomerDetailData,
} from '../framework'

export const CustomersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('Todos os status')
  const [selectedCity, setSelectedCity] = useState('Todas as cidades')
  const [selectedSort, setSelectedSort] = useState('Ordenar por: Mais recentes')
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomerForDetail, setSelectedCustomerForDetail] = useState<CustomerDetailData>(
    defaultCustomerDetail
  )

  // Map CustomerItem to CustomerDetailData when clicking on a customer in the list
  const handleSelectCustomer = (customer: CustomerItem) => {
    setSelectedCustomerForDetail({
      id: customer.id,
      name: customer.name,
      status: customer.status,
      email: customer.email,
      phone: customer.phone || '(27) 99999-9999',
      document: customer.document,
      city: customer.city,
      customerSince: customer.customerSince || '15/03/2023',
      initials: customer.initials,
      avatarColor: customer.avatarColor,
      avatarImage: customer.avatarImage,
      totalSpent: customer.totalSpent,
      lastPurchase: customer.lastPurchase,
      averageTicket: 'R$ 3.742,00',
      topProducts: defaultCustomerDetail.topProducts,
      aiInsights: [
        `Este cliente aumentou o volume de compras em 35% nos últimos 90 dias.`,
        `Os produtos da categoria de informática representam 78% do seu total de compras.`,
        `Última compra foi há 5 dias, e o comportamento indica alta probabilidade de nova compra em até 30 dias.`,
      ],
    })
  }

  // Handle row checkboxes
  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCustomerIds(customersData.map((c) => c.id))
    } else {
      setSelectedCustomerIds([])
    }
  }

  const handleToggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedCustomerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Filter customers
  const filteredCustomers = customersData.filter((c) => {
    if (selectedStatus !== 'Todos os status' && c.status !== selectedStatus) {
      return false
    }
    if (selectedCity !== 'Todas as cidades' && !c.city.startsWith(selectedCity)) {
      return false
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.document.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      )
    }
    return true
  })

  const isAllSelected =
    filteredCustomers.length > 0 &&
    filteredCustomers.every((c) => selectedCustomerIds.includes(c.id))
  const isIndeterminate =
    selectedCustomerIds.length > 0 && !isAllSelected

  // KPI icons
  const kpiIcons = [
    <PeopleAltOutlinedIcon key="1" />,
    <CheckCircleOutlinedIcon key="2" />,
    <PersonAddOutlinedIcon key="3" />,
    <ConfirmationNumberOutlinedIcon key="4" />,
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Main Split Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 340px', xl: '1fr 360px' },
          gap: 2.5,
          alignItems: 'start',
        }}
      >
        {/* Left Column: Header, KPIs, Filter Bar, Customer Table, Pagination */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25, minWidth: 0 }}>
          {/* Header Row */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box>
              {/* Breadcrumb */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  color: '#64748b',
                  fontSize: '0.75rem',
                  mb: 0.5,
                }}
              >
                <StorefrontOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
                <span>Clientes</span>
                <span>&gt;</span>
                <Typography component="span" sx={{ color: '#0f172a', fontSize: '0.75rem', fontWeight: 500 }}>
                  Lista
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                Clientes
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  fontSize: '0.8125rem',
                  mt: 0.25,
                }}
              >
                Gerencie seus clientes, acompanhe o histórico de compras e analise o comportamento de cada um.
              </Typography>
            </Box>

            {/* Top Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
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
                Novo Cliente
              </Button>

              <Button
                variant="outlined"
                startIcon={<FilterListRoundedIcon sx={{ fontSize: 18 }} />}
                endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#334155',
                  bgcolor: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  height: 38,
                  px: 1.75,
                  textTransform: 'none',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
                  '&:hover': {
                    borderColor: '#cbd5e1',
                    bgcolor: '#f8fafc',
                  },
                }}
              >
                Filtros
              </Button>
            </Box>
          </Box>

          {/* 4 KPI Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 1.5,
            }}
          >
            {customersKpiMetrics.map((kpi, index) => (
              <KpiCard
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                change={kpi.change}
                trendDirection={kpi.trendDirection}
                caption={kpi.caption}
                tone={kpi.tone}
                icon={kpiIcons[index]}
              />
            ))}
          </Box>

          {/* Filter Bar */}
          <Card
            sx={{
              p: 1.25,
              borderRadius: '10px',
              bgcolor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.25,
              alignItems: 'center',
            }}
          >
            {/* Search Input */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                px: 1.25,
                py: 0.6,
                flex: { xs: '1 1 100%', sm: 1 },
                minWidth: 180,
                gap: 1,
                transition: 'border-color 0.2s',
                '&:focus-within': {
                  borderColor: '#2563eb',
                },
              }}
            >
              <SearchRoundedIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
              <InputBase
                placeholder="Buscar cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{
                  fontSize: '0.75rem',
                  color: '#0f172a',
                  '& input::placeholder': {
                    color: '#94a3b8',
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* Status Select */}
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
                height: 36,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSelect-select': {
                  py: 0.6,
                  pr: '28px !important',
                  pl: 1.25,
                },
              }}
            >
              <MenuItem value="Todos os status">Todos os status</MenuItem>
              <MenuItem value="Ativo">Ativo</MenuItem>
              <MenuItem value="Inativo">Inativo</MenuItem>
            </Select>

            {/* City Select */}
            <Select
              value={selectedCity}
              onChange={(e: SelectChangeEvent) => setSelectedCity(e.target.value)}
              size="small"
              IconComponent={KeyboardArrowDownRoundedIcon}
              sx={{
                bgcolor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#334155',
                height: 36,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSelect-select': {
                  py: 0.6,
                  pr: '28px !important',
                  pl: 1.25,
                },
              }}
            >
              <MenuItem value="Todas as cidades">Todas as cidades</MenuItem>
              <MenuItem value="Vitória">Vitória - ES</MenuItem>
              <MenuItem value="Vila Velha">Vila Velha - ES</MenuItem>
              <MenuItem value="Serra">Serra - ES</MenuItem>
              <MenuItem value="Cariacica">Cariacica - ES</MenuItem>
              <MenuItem value="Viana">Viana - ES</MenuItem>
              <MenuItem value="Guarapari">Guarapari - ES</MenuItem>
            </Select>

            {/* Sort Select */}
            <Select
              value={selectedSort}
              onChange={(e: SelectChangeEvent) => setSelectedSort(e.target.value)}
              size="small"
              IconComponent={KeyboardArrowDownRoundedIcon}
              sx={{
                bgcolor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#334155',
                height: 36,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSelect-select': {
                  py: 0.6,
                  pr: '28px !important',
                  pl: 1.25,
                },
              }}
            >
              <MenuItem value="Ordenar por: Mais recentes">Ordenar por: Mais recentes</MenuItem>
              <MenuItem value="Ordenar por: Maior valor">Ordenar por: Maior valor</MenuItem>
              <MenuItem value="Ordenar por: Nome A-Z">Ordenar por: Nome A-Z</MenuItem>
            </Select>
          </Card>

          {/* Customer Table Container */}
          <Card
            sx={{
              borderRadius: '12px',
              bgcolor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
            }}
          >
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table
                sx={{
                  minWidth: 700,
                  tableLayout: 'fixed',
                  '& th': {
                    bgcolor: '#f8fafc',
                    color: '#64748b',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    py: 1.25,
                    borderBottom: '1px solid #e2e8f0',
                    whiteSpace: 'nowrap',
                  },
                  '& td': {
                    py: 1.15,
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '0.75rem',
                    color: '#334155',
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    {/* Checkbox column - explicit width and padding to prevent sticking */}
                    <TableCell
                      sx={{
                        width: 38,
                        minWidth: 38,
                        maxWidth: 38,
                        p: 0,
                        pl: 1.25,
                        pr: 0,
                      }}
                    >
                      <Checkbox
                        size="small"
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onChange={handleToggleSelectAll}
                        sx={{
                          p: 0.5,
                          color: '#cbd5e1',
                          '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: '#2563eb' },
                        }}
                      />
                    </TableCell>

                    {/* Cliente column - ample left padding (pl: 2) so text never touches the checkbox */}
                    <TableCell sx={{ width: '25%', minWidth: 160, pl: 2 }}>
                      Cliente
                    </TableCell>
                    <TableCell sx={{ width: '16%', minWidth: 120 }}>Documento</TableCell>
                    <TableCell sx={{ width: '13%', minWidth: 95 }}>Cidade</TableCell>
                    <TableCell sx={{ width: '13%', minWidth: 90 }}>Última Compra</TableCell>
                    <TableCell sx={{ width: '15%', minWidth: 100 }}>Total Comprado</TableCell>
                    <TableCell sx={{ width: '13%', minWidth: 80 }}>Status</TableCell>
                    <TableCell align="center" sx={{ width: 48, minWidth: 48 }}>
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredCustomers.map((cust) => {
                    const isSelected = selectedCustomerIds.includes(cust.id)
                    const isCurrentDetail = selectedCustomerForDetail.id === cust.id

                    return (
                      <TableRow
                        key={cust.id}
                        hover
                        onClick={() => handleSelectCustomer(cust)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: isCurrentDetail
                            ? '#f0f7ff'
                            : isSelected
                            ? '#f8fafc'
                            : 'transparent',
                          transition: 'background-color 0.15s ease',
                          '&:hover': {
                            bgcolor: isCurrentDetail ? '#e5f1ff' : '#f8fafc',
                          },
                        }}
                      >
                        {/* Checkbox Cell - spacious padding */}
                        <TableCell
                          onClick={(e) => handleToggleSelectRow(cust.id, e)}
                          sx={{
                            width: 38,
                            minWidth: 38,
                            maxWidth: 38,
                            p: 0,
                            pl: 1.25,
                            pr: 0,
                          }}
                        >
                          <Checkbox
                            size="small"
                            checked={isSelected}
                            sx={{
                              p: 0.5,
                              color: '#cbd5e1',
                              '&.Mui-checked': { color: '#2563eb' },
                            }}
                          />
                        </TableCell>

                        {/* Cliente Cell - ample left padding to separate from checkbox */}
                        <TableCell sx={{ pl: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                            {cust.avatarImage ? (
                              <Avatar
                                src={cust.avatarImage}
                                alt={cust.name}
                                sx={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  border: '1px solid #e2e8f0',
                                }}
                              />
                            ) : (
                              <Avatar
                                sx={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  bgcolor: cust.avatarColor || '#c084fc',
                                  color: '#ffffff',
                                  fontSize: '0.6875rem',
                                  fontWeight: 700,
                                }}
                              >
                                {cust.initials || cust.name.slice(0, 2).toUpperCase()}
                              </Avatar>
                            )}

                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '0.75rem',
                                  color: isCurrentDetail ? '#2563eb' : '#0f172a',
                                  lineHeight: 1.2,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {cust.name}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '0.65625rem',
                                  color: '#64748b',
                                  lineHeight: 1.2,
                                  mt: 0.2,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {cust.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        {/* Documento Cell */}
                        <TableCell sx={{ fontSize: '0.71875rem', color: '#475569' }}>
                          {cust.document}
                        </TableCell>

                        {/* Cidade Cell */}
                        <TableCell sx={{ fontSize: '0.71875rem', color: '#475569' }}>
                          {cust.city}
                        </TableCell>

                        {/* Última Compra Cell */}
                        <TableCell sx={{ fontSize: '0.71875rem', color: '#475569' }}>
                          {cust.lastPurchase}
                        </TableCell>

                        {/* Total Comprado Cell */}
                        <TableCell
                          sx={{
                            fontSize: '0.71875rem',
                            fontWeight: 600,
                            color: '#0f172a',
                          }}
                        >
                          {cust.totalSpent}
                        </TableCell>

                        {/* Status Cell */}
                        <TableCell>
                          <StatusChip status={cust.status} />
                        </TableCell>

                        {/* Ações Cell */}
                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                          <IconButton
                            size="small"
                            sx={{
                              color: '#94a3b8',
                              p: 0.5,
                              '&:hover': { color: '#0f172a', bgcolor: '#f1f5f9' },
                            }}
                          >
                            <MoreVertRoundedIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Footer */}
            <Box
              sx={{
                p: '12px 18px',
                borderTop: '1px solid #e2e8f0',
                bgcolor: '#ffffff',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
              }}
            >
              <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>
                Mostrando 1-10 de 128 clientes
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton
                  size="small"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    '&:hover': { bgcolor: '#f8fafc' },
                  }}
                >
                  <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>

                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <Button
                    key={pageNum}
                    size="small"
                    onClick={() => setCurrentPage(pageNum)}
                    sx={{
                      minWidth: 28,
                      width: 28,
                      height: 28,
                      p: 0,
                      borderRadius: '6px',
                      fontSize: '0.71875rem',
                      fontWeight: currentPage === pageNum ? 700 : 500,
                      bgcolor: currentPage === pageNum ? '#2563eb' : 'transparent',
                      color: currentPage === pageNum ? '#ffffff' : '#64748b',
                      '&:hover': {
                        bgcolor: currentPage === pageNum ? '#1d4ed8' : '#f8fafc',
                      },
                    }}
                  >
                    {pageNum}
                  </Button>
                ))}

                <Typography sx={{ color: '#94a3b8', fontSize: '0.75rem', px: 0.5 }}>
                  ...
                </Typography>

                <Button
                  size="small"
                  onClick={() => setCurrentPage(13)}
                  sx={{
                    minWidth: 28,
                    width: 28,
                    height: 28,
                    p: 0,
                    borderRadius: '6px',
                    fontSize: '0.71875rem',
                    fontWeight: currentPage === 13 ? 700 : 500,
                    bgcolor: currentPage === 13 ? '#2563eb' : 'transparent',
                    color: currentPage === 13 ? '#ffffff' : '#64748b',
                    '&:hover': {
                      bgcolor: currentPage === 13 ? '#1d4ed8' : '#f8fafc',
                    },
                  }}
                >
                  13
                </Button>

                <IconButton
                  size="small"
                  disabled={currentPage === 13}
                  onClick={() => setCurrentPage((p) => Math.min(13, p + 1))}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    '&:hover': { bgcolor: '#f8fafc' },
                  }}
                >
                  <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Column: Customer Detail Card */}
        <Box
          sx={{
            position: { lg: 'sticky' },
            top: { lg: 80 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CustomerDetailCard
            customer={selectedCustomerForDetail}
            onBackToList={() => {}}
            onEdit={() => {}}
            onViewAllProducts={() => {}}
            onAskERP={() => {}}
            onViewReport={() => {}}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default CustomersPage
