
import { createTheme } from '@mui/material'


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1769e0' },
    secondary: { main: '#8b5cf6' },
    background: { default: '#f4f7fc', paper: '#ffffff' },
    text: { primary: '#17243b', secondary: '#71809a' },
    success: { main: '#16a884' },
    warning: { main: '#f3a63b' },
    error: { main: '#e75d65' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCard: { styleOverrides: { root: { border: '1px solid #e6edf6', boxShadow: '0 2px 8px rgba(28, 55, 96, 0.035)' } } },
    MuiButton: { defaultProps: { disableElevation: true } },
  },
})

export default theme;
