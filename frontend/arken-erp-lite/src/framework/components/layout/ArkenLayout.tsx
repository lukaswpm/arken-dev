import React, { useState } from 'react'
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import Sidebar, { type NavItem } from './Sidebar'
import Topbar from './Topbar'

export interface ArkenLayoutProps {
  children: React.ReactNode
  navItems?: NavItem[]
  unreadNotifications?: number
}

const SIDEBAR_WIDTH = 236

export const ArkenLayout: React.FC<ArkenLayoutProps> = ({
  children,
  navItems,
  unreadNotifications = 3,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Desktop Permanent Sidebar */}
      {!isMobile && (
        <Box
          component="nav"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            height: '100vh',
            zIndex: 1200,
          }}
        >
          <Sidebar navItems={navItems} />
        </Box>
      )}

      {/* Mobile Drawer Sidebar */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: SIDEBAR_WIDTH,
              bgcolor: '#0c162c',
              border: 'none',
            },
          }}
        >
          <Sidebar navItems={navItems} onItemClick={() => setMobileOpen(false)} />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: '100vh',
        }}
      >
        <Topbar
          onMobileMenuToggle={handleDrawerToggle}
          unreadNotifications={unreadNotifications}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 2.5, md: 3 },
            maxWidth: '1800px',
            width: '100%',
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default ArkenLayout
