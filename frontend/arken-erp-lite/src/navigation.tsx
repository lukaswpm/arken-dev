import type { ReactElement } from 'react'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined'

export interface NavigationItem {
  label: string
  path: string
  icon: ReactElement
}

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon /> },
  { label: 'Vendas', path: '/sales', icon: <PointOfSaleOutlinedIcon /> },
  { label: 'Produtos', path: '/products', icon: <Inventory2OutlinedIcon /> },
  { label: 'Clientes', path: '/customers', icon: <PeopleAltOutlinedIcon /> },
  { label: 'Estoque', path: '/inventory', icon: <WarehouseOutlinedIcon /> },
  { label: 'Financeiro', path: '/finance', icon: <AccountBalanceWalletOutlinedIcon /> },
  { label: 'Relatórios', path: '/reports', icon: <AssessmentOutlinedIcon /> },
  { label: 'Configurações', path: '/settings', icon: <SettingsOutlinedIcon /> },
]