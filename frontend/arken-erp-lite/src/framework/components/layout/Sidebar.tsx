import React, { useState } from 'react'
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Collapse,
} from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

export interface NavSubItem {
  label: string
  path: string
}

export interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  children?: NavSubItem[]
}

export const defaultNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardRoundedIcon /> },
  {
    label: 'Vendas',
    path: '/sales',
    icon: <ShoppingCartOutlinedIcon />,
    children: [
      { label: 'Pedidos', path: '/sales' },
      { label: 'Orçamentos', path: '/sales/quotes' },
      { label: 'Notas Fiscais', path: '/sales/invoices' },
      { label: 'Devoluções', path: '/sales/returns' },
    ],
  },
  { label: 'Produtos', path: '/products', icon: <Inventory2OutlinedIcon /> },
  { label: 'Clientes', path: '/customers', icon: <PeopleAltOutlinedIcon /> },
  { label: 'Estoque', path: '/inventory', icon: <WarehouseOutlinedIcon /> },
  {
    label: 'Financeiro',
    path: '/finance',
    icon: <AccountBalanceWalletOutlinedIcon />,
    children: [
      { label: 'Visão Geral', path: '/finance' },
      { label: 'Contas a Receber', path: '/finance/receivables' },
      { label: 'Contas a Pagar', path: '/finance/payables' },
      { label: 'Fluxo de Caixa', path: '/finance/cash-flow' },
      { label: 'Fornecedores', path: '/finance/suppliers' },
      { label: 'Relatórios', path: '/finance/reports' },
    ],
  },
  { label: 'Relatórios', path: '/reports', icon: <BarChartRoundedIcon /> },
  { label: 'Configurações', path: '/settings', icon: <SettingsOutlinedIcon /> },
]

export interface SidebarProps {
  navItems?: NavItem[]
  onItemClick?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  navItems = defaultNavItems,
  onItemClick,
}) => {
  const location = useLocation()
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    '/sales': true,
    '/finance': true,
  })

  const toggleSubmenu = (path: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenSubmenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#0c162c',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        py: 2.5,
        userSelect: 'none',
        overflowY: 'auto',
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '4px' },
      }}
    >
      {/* Brand Header */}
      <Box
        component={NavLink}
        to="/dashboard"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          textDecoration: 'none',
          color: 'inherit',
          mb: 3.5,
          px: 1,
        }}
      >
        {/* Geometric Diamond / Cube Logo */}
        <Box
          sx={{
            width: 38,
            height: 38,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <polygon points="20,4 34,14 20,24 6,14" fill="#38bdf8" />
            <polygon points="6,14 20,24 20,38 6,28" fill="#2563eb" />
            <polygon points="34,14 20,24 20,38 34,28" fill="#1d4ed8" />
          </svg>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.1875rem',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Arken<span style={{ color: '#60a5fa' }}>ERP</span>
          </Typography>
          <Typography
            sx={{
              color: '#94a3b8',
              fontSize: '0.6875rem',
              letterSpacing: '0.01em',
              mt: 0.25,
            }}
          >
            Seu negócio mais inteligente
          </Typography>
        </Box>
      </Box>

      {/* Nav List */}
      <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0
          const isItemActive = hasChildren
            ? location.pathname.startsWith(item.path)
            : location.pathname === item.path
          const isSubmenuOpen = openSubmenus[item.path] ?? isItemActive

          return (
            <React.Fragment key={item.path}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={onItemClick}
                className={isItemActive ? 'active' : ''}
                sx={{
                  borderRadius: '8px',
                  px: 1.75,
                  py: 0.9,
                  color: '#cbd5e1',
                  transition: 'all 0.15s ease',
                  '& .MuiListItemIcon-root': {
                    color: '#94a3b8',
                    minWidth: 34,
                    '& svg': {
                      fontSize: 20,
                    },
                  },
                  '& .MuiListItemText-primary': {
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: '#cbd5e1',
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    '& .MuiListItemIcon-root': {
                      color: '#ffffff',
                    },
                    '& .MuiListItemText-primary': {
                      color: '#ffffff',
                    },
                  },
                  '&.active': {
                    bgcolor: '#2563eb !important',
                    color: '#ffffff !important',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
                    '& .MuiListItemIcon-root': {
                      color: '#ffffff !important',
                    },
                    '& .MuiListItemText-primary': {
                      fontWeight: 600,
                      color: '#ffffff !important',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {hasChildren && (
                  <Box
                    component="span"
                    onClick={(e) => toggleSubmenu(item.path, e)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isItemActive ? '#ffffff' : '#94a3b8',
                      ml: 1,
                    }}
                  >
                    {isSubmenuOpen ? (
                      <KeyboardArrowUpRoundedIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
                    )}
                  </Box>
                )}
              </ListItemButton>

              {/* Submenu List */}
              {hasChildren && (
                <Collapse in={isSubmenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 3.5, pt: 0.5, pb: 0.75, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                    {item.children!.map((sub) => {
                      const isSubActive = location.pathname === sub.path

                      return (
                        <ListItemButton
                          key={sub.path}
                          component={NavLink}
                          to={sub.path}
                          onClick={onItemClick}
                          sx={{
                            borderRadius: '6px',
                            py: 0.6,
                            px: 1.5,
                            color: isSubActive ? '#38bdf8' : '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.25,
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.05)',
                              color: '#ffffff',
                              '& .sub-bullet': {
                                borderColor: '#ffffff',
                              },
                            },
                          }}
                        >
                          <Box
                            className="sub-bullet"
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: isSubActive ? '#38bdf8' : 'transparent',
                              border: isSubActive ? 'none' : '1px solid #64748b',
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: isSubActive ? 600 : 400,
                              color: isSubActive ? '#ffffff' : '#94a3b8',
                            }}
                          >
                            {sub.label}
                          </Typography>
                        </ListItemButton>
                      )
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          )
        })}
      </List>

      {/* Footer Area: Assistente IA & Usuário */}
      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1.25, pt: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Assistente IA Card */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
            py: 1,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: '#2563eb',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Assistente IA
              </Typography>
              <Typography
                sx={{
                  color: '#94a3b8',
                  fontSize: '0.625rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  mt: 0.25,
                }}
              >
                Tire dúvidas, gere relatórios e muito mais.
              </Typography>
            </Box>
          </Box>
          <ChevronRightRoundedIcon sx={{ fontSize: 18, color: '#64748b' }} />
        </Box>

        {/* User Card */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
            py: 1,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
            <Avatar
              src="/images/lucas_avatar.jpg"
              alt="Lucas Santos"
              sx={{
                width: 30,
                height: 30,
                flexShrink: 0,
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Lucas Santos
              </Typography>
              <Typography
                sx={{
                  color: '#94a3b8',
                  fontSize: '0.625rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Administrador
              </Typography>
            </Box>
          </Box>
          <ChevronRightRoundedIcon sx={{ fontSize: 18, color: '#64748b' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
