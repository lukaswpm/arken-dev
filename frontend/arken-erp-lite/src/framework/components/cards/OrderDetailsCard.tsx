import React from 'react'
import {
  Box,
  Card,
  Typography,
  Button,
  Avatar,
  Divider,
} from '@mui/material'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import StatusChip from '../tables/StatusChip'

export interface OrderItemDetail {
  id: string
  name: string
  image: string
  quantity: string
  price: string
}

export interface OrderDetailsCardProps {
  orderNumber?: string
  status?: string
  date?: string
  customer?: string
  items?: OrderItemDetail[]
  total?: string
  onViewDetails?: () => void
  onPrint?: () => void
  onViewAll?: () => void
}

const defaultItems: OrderItemDetail[] = [
  {
    id: 'item-1',
    name: 'Notebook Dell Inspiron',
    image: '/images/notebook.jpg',
    quantity: '1 un.',
    price: 'R$ 2.500,00',
  },
  {
    id: 'item-2',
    name: 'Mouse Sem Fio',
    image: '/images/mouse.jpg',
    quantity: '1 un.',
    price: 'R$ 120,00',
  },
  {
    id: 'item-3',
    name: 'Cabo HDMI',
    image: '/images/cable.jpg',
    quantity: '1 un.',
    price: 'R$ 60,00',
  },
]

export const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({
  orderNumber = '#000128',
  status = 'Concluído',
  date = '16/07/2025 14:32',
  customer = 'Maria Oliveira ME',
  items = defaultItems,
  total = 'R$ 2.680,00',
  onViewDetails,
  onPrint,
  onViewAll,
}) => {
  return (
    <Card
      sx={{
        p: '16px 18px',
        borderRadius: '12px',
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}
        >
          Detalhes do Pedido
        </Typography>

        <Button
          onClick={onViewAll}
          sx={{
            p: 0,
            minWidth: 0,
            color: '#2563eb',
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
          }}
        >
          Ver todos ↗
        </Button>
      </Box>

      {/* Order Status & ID */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <StatusChip status={status} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '0.875rem',
            color: '#0f172a',
          }}
        >
          {orderNumber}
        </Typography>
      </Box>

      {/* Meta Information: Date & Customer */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b' }}>
          <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#64748b' }}>
            {date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b' }}>
          <PersonOutlineRoundedIcon sx={{ fontSize: 15 }} />
          <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
            {customer}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#f1f5f9' }} />

      {/* Item rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.25,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
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
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#1e293b',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                {item.quantity}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#334155',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  minWidth: 70,
                  textAlign: 'right',
                }}
              >
                {item.price}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ borderColor: '#f1f5f9', mt: 0.5 }} />

      {/* Total row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 0.25,
        }}
      >
        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}>
          Total do pedido
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '1rem',
            color: '#0f172a',
            letterSpacing: '-0.02em',
          }}
        >
          {total}
        </Typography>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 0.5 }}>
        <Button
          variant="contained"
          size="small"
          onClick={onViewDetails}
          startIcon={<VisibilityOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: '#2563eb',
            color: '#ffffff',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            py: 0.75,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#1d4ed8',
              boxShadow: 'none',
            },
          }}
        >
          Ver detalhes
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={onPrint}
          startIcon={<PrintOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: '#ffffff',
            borderColor: '#e2e8f0',
            color: '#334155',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            py: 0.75,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#f8fafc',
              borderColor: '#cbd5e1',
            },
          }}
        >
          Imprimir
        </Button>
      </Box>
    </Card>
  )
}

export default OrderDetailsCard
