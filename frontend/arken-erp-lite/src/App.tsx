import { Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { arkenTheme, ArkenLayout } from './framework'
import DashboardPage from './pages/DashboardPage'
import SalesPage from './pages/SalesPage'
import ProductsPage from './pages/ProductsPage'
import FinancialPage from './pages/FinancialPage'
import CustomersPage from './pages/CustomersPage'
import ModulePage from './pages/ModulePage'
import { navigationItems } from './navigation'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={arkenTheme}>
      <CssBaseline />
      <ArkenLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/finance" element={<FinancialPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          {navigationItems
            .filter((item) => !['/dashboard', '/sales', '/products', '/finance', '/customers'].includes(item.path))
            .map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<ModulePage title={item.label} />}
              />
            ))}
          <Route path="*" element={<Navigate to="/customers" replace />} />
        </Routes>
      </ArkenLayout>
    </ThemeProvider>
  )
}

export default App
