import React, { useState } from 'react'
import {
  Box,
  Card,
  Typography,
  Tabs,
  Tab,
  Button,
  Avatar,
  InputBase,
  IconButton,
} from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import StatusChip from '../tables/StatusChip'
import { defaultCustomerDetail, type CustomerDetailData } from '../../data/customersMockData'

export interface CustomerDetailCardProps {
  customer?: CustomerDetailData
  onBackToList?: () => void
  onEdit?: () => void
  onViewAllProducts?: () => void
  onAskERP?: (query?: string) => void
  onViewReport?: () => void
}

export const CustomerDetailCard: React.FC<CustomerDetailCardProps> = ({
  customer = defaultCustomerDetail,
  onBackToList,
  onEdit,
  onViewAllProducts,
  onAskERP,
  onViewReport,
}) => {
  const [activeTab, setActiveTab] = useState('Visão Geral')
  const [promptText, setPromptText] = useState('')

  const handleSendPrompt = () => {
    if (!promptText.trim()) return
    onAskERP?.(promptText)
    setPromptText('')
  }

  return (
    <Card
      sx={{
        p: '14px 15px',
        borderRadius: '12px',
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
      }}
    >
      {/* Top action row: Back link + Edit button */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
          onClick={onBackToList}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            color: '#2563eb',
            fontSize: '0.71875rem',
            fontWeight: 500,
            transition: 'color 0.15s ease',
            '&:hover': {
              color: '#1d4ed8',
              textDecoration: 'underline',
            },
          }}
        >
          <ArrowBackRoundedIcon sx={{ fontSize: 13 }} />
          <span>Voltar para a lista</span>
        </Box>

        <Button
          size="small"
          variant="outlined"
          onClick={onEdit}
          startIcon={<EditOutlinedIcon sx={{ fontSize: 13 }} />}
          sx={{
            borderColor: '#e2e8f0',
            color: '#334155',
            borderRadius: '6px',
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'none',
            py: 0.25,
            px: 1.25,
            minWidth: 0,
            height: 26,
            '&:hover': {
              borderColor: '#cbd5e1',
              bgcolor: '#f8fafc',
            },
          }}
        >
          Editar
        </Button>
      </Box>

      {/* Customer Header Info */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        {/* Avatar */}
        {customer.avatarImage ? (
          <Avatar
            src={customer.avatarImage}
            alt={customer.name}
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              border: '2px solid #f1f5f9',
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              bgcolor: customer.avatarColor || '#c084fc',
              color: '#ffffff',
              fontSize: '1.05rem',
              fontWeight: 700,
            }}
          >
            {customer.initials || customer.name.slice(0, 2).toUpperCase()}
          </Avatar>
        )}

        {/* Customer details */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap', mb: 0.35 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#0f172a',
                lineHeight: 1.2,
              }}
            >
              {customer.name}
            </Typography>
            <StatusChip status={customer.status} sx={{ height: 20, fontSize: '0.625rem', px: 0.25 }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b' }}>
              <MailOutlineRoundedIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
              <Typography sx={{ fontSize: '0.65625rem', color: '#64748b', lineHeight: 1.2 }}>
                {customer.email}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b' }}>
              <PhoneOutlinedIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
              <Typography sx={{ fontSize: '0.65625rem', color: '#64748b', lineHeight: 1.2 }}>
                {customer.phone}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b' }}>
              <BadgeOutlinedIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
              <Typography sx={{ fontSize: '0.65625rem', color: '#64748b', lineHeight: 1.2 }}>
                {customer.document}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b' }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
              <Typography sx={{ fontSize: '0.65625rem', color: '#64748b', lineHeight: 1.2 }}>
                {customer.city}
              </Typography>
            </Box>

            <Box sx={{ mt: 0.25 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  bgcolor: '#f1f5f9',
                  borderRadius: '12px',
                  px: 0.85,
                  py: 0.2,
                }}
              >
                <CalendarMonthOutlinedIcon sx={{ fontSize: 11, color: '#64748b' }} />
                <Typography sx={{ fontSize: '0.59375rem', color: '#64748b', fontWeight: 500 }}>
                  Cliente desde {customer.customerSince}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid #e2e8f0', mt: 0.25 }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            minHeight: 28,
            '& .MuiTab-root': {
              minHeight: 28,
              fontSize: '0.6875rem',
              fontWeight: 500,
              textTransform: 'none',
              px: 1,
              py: 0.25,
              color: '#64748b',
              minWidth: 0,
              '&.Mui-selected': {
                color: '#2563eb',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#2563eb',
              height: 2,
            },
          }}
        >
          <Tab value="Visão Geral" label="Visão Geral" />
          <Tab value="Compras" label="Compras" />
          <Tab value="Financeiro" label="Financeiro" />
          <Tab value="Observações" label="Observações" />
        </Tabs>
      </Box>

      {/* 3 Metric Boxes */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0.75,
        }}
      >
        <Box
          sx={{
            p: 1,
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            bgcolor: '#ffffff',
          }}
        >
          <Typography sx={{ fontSize: '0.59375rem', color: '#64748b', mb: 0.2, whiteSpace: 'nowrap' }}>
            Total Comprado
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>
            {customer.totalSpent}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1,
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            bgcolor: '#ffffff',
          }}
        >
          <Typography sx={{ fontSize: '0.59375rem', color: '#64748b', mb: 0.2, whiteSpace: 'nowrap' }}>
            Última Compra
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>
            {customer.lastPurchase}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1,
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            bgcolor: '#ffffff',
          }}
        >
          <Typography sx={{ fontSize: '0.59375rem', color: '#64748b', mb: 0.2, whiteSpace: 'nowrap' }}>
            Ticket Médio
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>
            {customer.averageTicket}
          </Typography>
        </Box>
      </Box>

      {/* Produtos mais comprados */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '0.71875rem', fontWeight: 700, color: '#0f172a' }}>
            Produtos mais comprados
          </Typography>
          <Box
            onClick={onViewAllProducts}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.25,
              cursor: 'pointer',
              color: '#2563eb',
              fontSize: '0.65625rem',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <span>Ver todos</span>
            <ArrowForwardRoundedIcon sx={{ fontSize: 11 }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {customer.topProducts.map((prod) => (
            <Box
              key={prod.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 0.25,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                <Avatar
                  src={prod.image}
                  alt={prod.name}
                  variant="rounded"
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '6px',
                    bgcolor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    img: { objectFit: 'contain', p: 0.2 },
                  }}
                />
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: '#0f172a',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {prod.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.59375rem',
                      color: '#64748b',
                      lineHeight: 1.2,
                      mt: 0.15,
                    }}
                  >
                    {prod.units}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  whiteSpace: 'nowrap',
                  pl: 1,
                }}
              >
                {prod.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Insights da IA */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #f5f3ff 0%, #ede9fe 100%)',
          border: '1px solid #ddd6fe',
          borderRadius: '10px',
          p: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.85,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: '#7c3aed' }} />
            <Typography sx={{ fontSize: '0.71875rem', fontWeight: 700, color: '#581c87' }}>
              Insights da IA
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.35,
              cursor: 'pointer',
              color: '#7c3aed',
              fontSize: '0.625rem',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <RefreshRoundedIcon sx={{ fontSize: 12 }} />
            <span>Gerar novo insight</span>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
          {customer.aiInsights.map((insight, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.6 }}>
              <DiamondOutlinedIcon
                sx={{ fontSize: 11, color: '#8b5cf6', mt: 0.25, flexShrink: 0 }}
              />
              <Typography
                sx={{
                  fontSize: '0.65625rem',
                  color: '#334155',
                  lineHeight: 1.3,
                  '& strong': {
                    color: '#0f172a',
                    fontWeight: 600,
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: insight
                    .replace('35%', '<strong>35%</strong>')
                    .replace('78%', '<strong>78%</strong>')
                    .replace('foi há 5 dias', '<strong>foi há 5 dias</strong>')
                    .replace('alta probabilidade de nova compra em até 30 dias', '<strong>alta probabilidade de nova compra em até 30 dias</strong>'),
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Action buttons inside IA Card */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 0.25 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => onAskERP?.()}
            sx={{
              bgcolor: '#2563eb',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: '0.65625rem',
              fontWeight: 600,
              textTransform: 'none',
              py: 0.35,
              px: 1.25,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1d4ed8',
                boxShadow: 'none',
              },
            }}
          >
            Perguntar ao ERP
          </Button>

          <Box
            onClick={onViewReport}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.25,
              cursor: 'pointer',
              color: '#2563eb',
              fontSize: '0.65625rem',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <span>Ver relatório completo</span>
            <ArrowForwardRoundedIcon sx={{ fontSize: 11 }} />
          </Box>
        </Box>
      </Box>

      {/* Prompt Bar at Bottom */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          bgcolor: '#ffffff',
          px: 1,
          py: 0.35,
          transition: 'border-color 0.2s',
          '&:focus-within': {
            borderColor: '#2563eb',
          },
        }}
      >
        <AutoAwesomeRoundedIcon sx={{ fontSize: 15, color: '#8b5cf6' }} />
        <InputBase
          placeholder="Pergunte algo sobre este cliente..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendPrompt()
            }
          }}
          fullWidth
          sx={{
            fontSize: '0.6875rem',
            color: '#0f172a',
            '& input::placeholder': {
              color: '#94a3b8',
              opacity: 1,
            },
          }}
        />
        <IconButton
          size="small"
          onClick={handleSendPrompt}
          sx={{
            bgcolor: '#2563eb',
            color: '#ffffff',
            borderRadius: '6px',
            p: 0.4,
            width: 24,
            height: 24,
            '&:hover': {
              bgcolor: '#1d4ed8',
            },
          }}
        >
          <SendRoundedIcon sx={{ fontSize: 12 }} />
        </IconButton>
      </Box>
    </Card>
  )
}

export default CustomerDetailCard
