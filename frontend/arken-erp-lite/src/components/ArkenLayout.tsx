import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { navigationItems } from '../navigation'

interface ArkenLayoutProps {
  children: ReactNode
}

const drawerWidth = 220

export default function ArkenLayout({ children }: ArkenLayoutProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigation = (
    <Box className="sidebar-content">
      <ButtonBase component={NavLink} to="/dashboard" className="brand-lockup" onClick={() => setMobileOpen(false)}>
        <Box className="brand-mark"><AutoAwesomeRoundedIcon /></Box>
        <Box>
          <Typography className="brand-name">ArkenERP</Typography>
          <Typography className="brand-tagline">Seu negócio mais inteligente</Typography>
        </Box>
      </ButtonBase>

      <Typography className="sidebar-label">MENU PRINCIPAL</Typography>
      <List className="sidebar-nav" disablePadding>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className="sidebar-link"
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box className="sidebar-footer">
        <Divider />
        <ButtonBase className="company-switcher">
          <BusinessOutlinedIcon />
          <Box className="company-copy">
            <Typography className="company-caption">EMPRESA</Typography>
            <Typography className="company-name">Arken Soluções Ltda</Typography>
          </Box>
          <KeyboardArrowDownRoundedIcon className="company-chevron" />
        </ButtonBase>
        <ButtonBase className="sidebar-user">
          <Avatar className="profile-avatar">LS</Avatar>
          <Box className="company-copy">
            <Typography className="sidebar-user-name">Lucas Santos</Typography>
            <Typography className="company-caption">Administrador</Typography>
          </Box>
          <KeyboardArrowDownRoundedIcon className="company-chevron" />
        </ButtonBase>
      </Box>
    </Box>
  )

  return (
    <Box className="app-shell">
      {!isMobile && (
        <Drawer
          variant="permanent"
          className="desktop-drawer"
          sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth } }}
        >
          {navigation}
        </Drawer>
      )}
      <Drawer
        variant="temporary"
        open={isMobile && mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: drawerWidth } }}
      >
        {navigation}
      </Drawer>

      <Box className="app-main">
        <Box component="header" className="topbar">
          {isMobile && (
            <Tooltip title="Abrir menu">
              <IconButton onClick={() => setMobileOpen(true)} aria-label="Abrir menu" size="small">
                <MenuRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
          <Box className="global-search">
            <SearchRoundedIcon />
            <InputBase placeholder="Buscar por produtos, clientes, vendas..." inputProps={{ 'aria-label': 'Buscar' }} />
          </Box>
          <Box className="topbar-actions">
            <Tooltip title="Notificações">
              <IconButton aria-label="Notificações, 3 não lidas" className="notification-button">
                <Badge badgeContent={3} color="error" max={9}>
                  <NotificationsNoneRoundedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem className="topbar-divider" />
            <ButtonBase className="topbar-profile">
              <Avatar className="profile-avatar">LS</Avatar>
              <Box className="topbar-profile-copy">
                <Typography className="topbar-profile-name">Lucas Santos</Typography>
                <Typography className="topbar-profile-role">Administrador</Typography>
              </Box>
              <KeyboardArrowDownRoundedIcon />
            </ButtonBase>
          </Box>
        </Box>
        <Box className="route-content">{children}</Box>
      </Box>
    </Box>
  )
}