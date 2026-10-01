import React from 'react'
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Avatar,
  Tooltip,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

import { useLocation } from 'react-router-dom'

export interface TopbarProps {
  onMobileMenuToggle?: () => void
  unreadNotifications?: number
  onSearch?: (query: string) => void
}

export const Topbar: React.FC<TopbarProps> = ({
  onMobileMenuToggle,
  unreadNotifications = 3,
  onSearch,
}) => {
  const location = useLocation()
  const isSales = location.pathname.startsWith('/sales')
  const isProducts = location.pathname.startsWith('/products')
  const isFinance = location.pathname.startsWith('/finance')
  const isCustomers = location.pathname.startsWith('/customers')

  const placeholder = isCustomers
    ? 'Buscar por nome, documento, email ou telefone...'
    : isFinance
    ? 'Buscar por descrição, fornecedor, categoria ou qualquer termo...'
    : isProducts
    ? 'Buscar por nome, código, categoria ou código de barras...'
    : isSales
    ? 'Buscar por número do pedido, cliente, produto...'
    : 'Buscar por produtos, clientes, vendas...'

  const badgeCount = isSales ? 1 : unreadNotifications
  return (
    <Box
      component="header"
      sx={{
        height: 64,
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        px: { xs: 2, md: 3.5 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left side: Hamburger (Mobile) + Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, maxWidth: 540 }}>
        {onMobileMenuToggle && (
          <IconButton
            onClick={onMobileMenuToggle}
            sx={{
              display: { md: 'none' },
              color: '#64748b',
              p: 1,
            }}
          >
            <MenuRoundedIcon />
          </IconButton>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            px: 1.5,
            py: 0.75,
            width: '100%',
            maxWidth: 400,
            gap: 1,
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:focus-within': {
              borderColor: '#2563eb',
              boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.1)',
            },
          }}
        >
          <SearchRoundedIcon sx={{ color: '#94a3b8', fontSize: 19 }} />
          <InputBase
            placeholder={placeholder}
            fullWidth
            onChange={(e) => onSearch?.(e.target.value)}
            sx={{
              fontSize: '0.8125rem',
              color: '#0f172a',
              '& input::placeholder': {
                color: '#94a3b8',
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>

      {/* Right side: Notifications + User Profile */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
        {/* Notification Bell */}
        <Tooltip title="Notificações">
          <IconButton
            sx={{
              color: '#64748b',
              p: 1,
              '&:hover': {
                bgcolor: '#f8fafc',
                color: '#0f172a',
              },
            }}
          >
            <Badge
              badgeContent={badgeCount}
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.625rem',
                  height: 16,
                  minWidth: 16,
                  px: 0.5,
                  fontWeight: 600,
                },
              }}
            >
              <NotificationsNoneRoundedIcon sx={{ fontSize: 22 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* User Profile */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            p: 0.5,
            borderRadius: '8px',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              bgcolor: '#f8fafc',
            },
          }}
        >
          <Avatar
            src="/images/lucas_avatar.jpg"
            alt="Lucas Santos"
            sx={{
              width: 36,
              height: 36,
              border: '1.5px solid #e2e8f0',
            }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '0.8125rem',
                color: '#0f172a',
                lineHeight: 1.2,
              }}
            >
              Lucas Santos
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6875rem',
                color: '#64748b',
                lineHeight: 1.2,
                mt: 0.25,
              }}
            >
              Administrador
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Topbar
