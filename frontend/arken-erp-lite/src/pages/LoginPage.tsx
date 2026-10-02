import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Alert,
  Link,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  MailOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  ArrowForward,
  LanguageOutlined,
  KeyboardArrowDown,
  AutoAwesomeOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services'
import heroImage from '../assets/login-hero.png'

export default function LoginPage() {
  const navigate = useNavigate()

  // Form states
  const [email, setEmail] = useState('lucas@arken.io')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Feedback states
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Language dropdown menu state
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedLang, setSelectedLang] = useState('Português (BR)')

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget)
  }

  const handleCloseLangMenu = (lang?: string) => {
    if (lang) setSelectedLang(lang)
    setLangAnchorEl(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    if (!email || !password) {
      setErrorMessage('Por favor, informe seu e-mail e senha.')
      return
    }

    setIsLoading(true)

    try {
      const response = await authService.login({
        email,
        password,
      })

      setSuccessMessage(`Bem-vindo, ${response.user?.name || 'ao ArkenERP'}! Redirecionando...`)
      setTimeout(() => {
        navigate('/dashboard')
      }, 700)
    } catch (err: any) {
      console.error('Falha na autenticação:', err)
      setErrorMessage(
        err?.message || 'Falha ao autenticar. Verifique suas credenciais e tente novamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        bgcolor: '#ffffff',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* ================= COLUNA ESQUERDA (HERO VISUAL FIEL) ================= */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: { md: '1.25 1 0', lg: '1.3 1 0' },
          height: '100%',
          bgcolor: '#040d1a',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Glow atmosférico suave no topo para profundidade */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.12) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* ================= COLUNA DIREITA (FORMULÁRIO DE LOGIN) ================= */}
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '0.85 1 0', lg: '0.9 1 0' },
          maxWidth: { md: '560px', lg: '620px' },
          height: '100%',
          bgcolor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowY: 'auto',
          px: { xs: 3, sm: 6, md: 5, lg: 7 },
          py: { xs: 3, md: 4 },
        }}
      >
        {/* Seletor de Idioma no Canto Superior Direito */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mb: { xs: 2, md: 3 },
          }}
        >
          <Button
            onClick={handleOpenLangMenu}
            size="small"
            sx={{
              color: '#334155',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              gap: 0.8,
              px: 1.2,
              py: 0.6,
              borderRadius: '8px',
              '&:hover': {
                bgcolor: '#f1f5f9',
              },
            }}
          >
            <LanguageOutlined sx={{ fontSize: 18, color: '#475569' }} />
            {selectedLang}
            <KeyboardArrowDown sx={{ fontSize: 18, color: '#64748b' }} />
          </Button>

          <Menu
            anchorEl={langAnchorEl}
            open={Boolean(langAnchorEl)}
            onClose={() => handleCloseLangMenu()}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  minWidth: 160,
                  mt: 0.5,
                },
              },
            }}
          >
            <MenuItem
              selected={selectedLang === 'Português (BR)'}
              onClick={() => handleCloseLangMenu('Português (BR)')}
              sx={{ fontSize: '0.875rem' }}
            >
              Português (BR)
            </MenuItem>
            <MenuItem
              selected={selectedLang === 'English (US)'}
              onClick={() => handleCloseLangMenu('English (US)')}
              sx={{ fontSize: '0.875rem' }}
            >
              English (US)
            </MenuItem>
            <MenuItem
              selected={selectedLang === 'Español'}
              onClick={() => handleCloseLangMenu('Español')}
              sx={{ fontSize: '0.875rem' }}
            >
              Español
            </MenuItem>
          </Menu>
        </Box>

        {/* Container Central do Formulário */}
        <Box
          sx={{
            my: 'auto',
            width: '100%',
            maxWidth: '430px',
            mx: 'auto',
          }}
        >
          {/* Cabeçalho */}
          <Typography
            variant="h4"
            sx={{
              color: '#0f172a',
              fontWeight: 800,
              fontSize: { xs: '1.75rem', sm: '2rem' },
              letterSpacing: '-0.025em',
              mb: 0.8,
            }}
          >
            Bem-vindo de volta!
          </Typography>
          <Typography
            sx={{
              color: '#64748b',
              fontSize: '0.95rem',
              fontWeight: 400,
              mb: 3.5,
            }}
          >
            Faça login na sua conta para continuar.
          </Typography>

          {/* Feedback de erro ou sucesso */}
          {errorMessage && (
            <Alert
              severity="error"
              onClose={() => setErrorMessage(null)}
              sx={{
                mb: 2.5,
                borderRadius: '10px',
                fontSize: '0.875rem',
              }}
            >
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert
              severity="success"
              sx={{
                mb: 2.5,
                borderRadius: '10px',
                fontSize: '0.875rem',
              }}
            >
              {successMessage}
            </Alert>
          )}

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Campo E-mail ou Usuário */}
            <Box sx={{ mb: 2.4 }}>
              <Typography
                component="label"
                htmlFor="login-email"
                sx={{
                  display: 'block',
                  color: '#1e293b',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  mb: 0.8,
                }}
              >
                E-mail ou usuário
              </Typography>
              <OutlinedInput
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                fullWidth
                disabled={isLoading}
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlined sx={{ color: '#94a3b8', fontSize: 20 }} />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: '10px',
                  bgcolor: '#ffffff',
                  fontSize: '0.925rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cbd5e1',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563eb',
                    borderWidth: '1.5px',
                  },
                  '& input': {
                    py: 1.4,
                  },
                }}
              />
            </Box>

            {/* Campo Senha */}
            <Box sx={{ mb: 1.5 }}>
              <Typography
                component="label"
                htmlFor="login-password"
                sx={{
                  display: 'block',
                  color: '#1e293b',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  mb: 0.8,
                }}
              >
                Senha
              </Typography>
              <OutlinedInput
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                fullWidth
                disabled={isLoading}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: '#94a3b8', fontSize: 20 }} />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: '#94a3b8' }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                      ) : (
                        <VisibilityOutlined sx={{ fontSize: 20 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  borderRadius: '10px',
                  bgcolor: '#ffffff',
                  fontSize: '0.925rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cbd5e1',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563eb',
                    borderWidth: '1.5px',
                  },
                  '& input': {
                    py: 1.4,
                  },
                }}
              />
            </Box>

            {/* Lembrar de mim & Esqueceu sua senha? */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                    sx={{
                      color: '#cbd5e1',
                      p: 0.7,
                      '&.Mui-checked': {
                        color: '#2563eb',
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#475569',
                      fontWeight: 400,
                      userSelect: 'none',
                    }}
                  >
                    Lembrar de mim
                  </Typography>
                }
                sx={{ ml: -0.5 }}
              />

              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Para redefinir sua senha, entre em contato com o suporte ou administrador.')
                }}
                underline="hover"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#2563eb',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Esqueceu sua senha?
              </Link>
            </Box>

            {/* Botão Entrar (CTA Principal) */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                bgcolor: '#1d4ed8',
                '&:hover': {
                  bgcolor: '#1e40af',
                },
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.975rem',
                py: 1.4,
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.2,
              }}
            >
              {isLoading ? (
                <CircularProgress size={22} sx={{ color: '#ffffff' }} />
              ) : (
                <>
                  <ArrowForward sx={{ fontSize: 19 }} />
                  Entrar
                </>
              )}
            </Button>
          </Box>

          {/* Divisor "ou" */}
          <Divider
            sx={{
              my: 3,
              '&::before, &::after': {
                borderColor: '#f1f5f9',
              },
            }}
          >
            <Typography
              sx={{
                color: '#94a3b8',
                fontSize: '0.825rem',
                fontWeight: 400,
                px: 1,
              }}
            >
              ou
            </Typography>
          </Divider>

          {/* Botões Sociais */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3.5 }}>
            {/* Google */}
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setErrorMessage('O login social com Google estará disponível na versão empresarial.')
              }}
              sx={{
                textTransform: 'none',
                color: '#334155',
                borderColor: '#e2e8f0',
                bgcolor: '#ffffff',
                borderRadius: '10px',
                py: 1.2,
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                '&:hover': {
                  bgcolor: '#f8fafc',
                  borderColor: '#cbd5e1',
                },
              }}
            >
              <GoogleIcon />
              Entrar com Google
            </Button>

            {/* Microsoft */}
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setErrorMessage('O login social com Microsoft estará disponível na versão empresarial.')
              }}
              sx={{
                textTransform: 'none',
                color: '#334155',
                borderColor: '#e2e8f0',
                bgcolor: '#ffffff',
                borderRadius: '10px',
                py: 1.2,
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                '&:hover': {
                  bgcolor: '#f8fafc',
                  borderColor: '#cbd5e1',
                },
              }}
            >
              <MicrosoftIcon />
              Entrar com Microsoft
            </Button>
          </Box>

          {/* Card "Primeiro acesso?" */}
          <Box
            sx={{
              bgcolor: '#eff6ff',
              border: '1px solid #dbeafe',
              borderRadius: '12px',
              p: 2,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
            }}
          >
            <AutoAwesomeOutlined sx={{ color: '#2563eb', fontSize: 20, mt: 0.2 }} />
            <Box>
              <Typography
                sx={{
                  color: '#1e40af',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  mb: 0.3,
                }}
              >
                Primeiro acesso?
              </Typography>
              <Typography
                sx={{
                  color: '#475569',
                  fontSize: '0.8rem',
                  lineHeight: 1.45,
                }}
              >
                Entre em contato com o administrador do seu plano para receber suas credenciais.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// Ícone oficial SVG do Google
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.13z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
      />
    </svg>
  )
}

// Ícone oficial SVG da Microsoft (4 quadradinhos coloridos)
function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  )
}
