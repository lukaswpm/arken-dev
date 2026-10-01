import { createTheme } from '@mui/material/styles'
import { colors } from './tokens'

export const arkenTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[500],
      light: colors.primary[400],
      dark: colors.primary[600],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.purple.main,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
      color: colors.text.primary,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: colors.text.primary,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: colors.text.primary,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.5,
      color: colors.text.secondary,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: colors.text.muted,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.8125rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${colors.border.default}`,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
  },
})

export default arkenTheme
