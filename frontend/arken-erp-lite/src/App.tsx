import { Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { arkenTheme, ArkenLayout } from './framework'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SalesPage from './pages/SalesPage'
import ProductsPage from './pages/ProductsPage'
import FinancialPage from './pages/FinancialPage'
import CustomersPage from './pages/CustomersPage'
import ModulePage from './pages/ModulePage'
import { navigationItems } from './navigation'
import { authService } from './services'
import './App.css'

function App() {
  const isAuth = authService.isAuthenticated()

  return (
    <ThemeProvider theme={arkenTheme}>
      <CssBaseline />
      <Routes>
        {/* Rota pública de autenticação fiel */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas do sistema dentro do Layout do ERP */}
        <Route
          path="/*"
          element={
            <ArkenLayout>
              <Routes>
                <Route path="/" element={<Navigate to={isAuth ? '/dashboard' : '/login'} replace />} />
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
                <Route path="*" element={<Navigate to={isAuth ? '/dashboard' : '/login'} replace />} />
              </Routes>
            </ArkenLayout>
          }
        />
      </Routes>
    </ThemeProvider>
  )
}

export default App
