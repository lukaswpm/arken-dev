import { Box, Button, Paper, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined'
import { useNavigate } from 'react-router-dom'

interface ModulePageProps {
  title: string
}

export default function ModulePage({ title }: ModulePageProps) {
  const navigate = useNavigate()

  return (
    <Box className="module-page">
      <Paper className="module-placeholder" variant="outlined">
        <Box className="module-placeholder-icon"><ConstructionOutlinedIcon /></Box>
        <Typography variant="h5" component="h1">{title}</Typography>
        <Typography color="text.secondary">
          Este módulo está pronto para receber sua próxima tela.
        </Typography>
        <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/dashboard')}>
          Voltar ao dashboard
        </Button>
      </Paper>
    </Box>
  )
}