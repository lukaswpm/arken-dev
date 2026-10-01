import React, { useState } from 'react'
import {
  Box,
  Card,
  Typography,
  Chip,
  Avatar,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

export interface TopProductMetric {
  name: string
  units: number
  value: string
  percentage: number
}

const topProductsData: TopProductMetric[] = [
  { name: 'Notebook Dell Inspiron', units: 45, value: 'R$ 22.500,00', percentage: 100 },
  { name: 'Smartphone Galaxy A54', units: 38, value: 'R$ 15.200,00', percentage: 84 },
  { name: 'Camiseta Premium', units: 62, value: 'R$ 8.680,00', percentage: 72 },
  { name: 'Fone Bluetooth', units: 34, value: 'R$ 6.120,00', percentage: 55 },
  { name: 'Cafeteira Elétrica', units: 28, value: 'R$ 4.760,00', percentage: 42 },
]

export const SalesAICard: React.FC = () => {
  const [showSql, setShowSql] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)

  const sqlQuery = `SELECT p.nome, COUNT(ip.id) as total_unidades, SUM(ip.preco_total) as faturamento
FROM itens_pedido ip
JOIN produtos p ON ip.produto_id = p.id
JOIN pedidos ped ON ip.pedido_id = ped.id
WHERE ped.data_pedido >= '2025-07-01'
GROUP BY p.id, p.nome
ORDER BY faturamento DESC
LIMIT 5;`

  const handleCopySql = () => {
    navigator.clipboard?.writeText(sqlQuery)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2000)
  }

  return (
    <Card
      sx={{
        p: '16px 18px',
        borderRadius: '12px',
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '9px',
            bgcolor: '#f5f3ff',
            color: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}
            >
              Assistente IA
            </Typography>
            <Chip
              label="Beta"
              size="small"
              sx={{
                height: 16,
                fontSize: '0.5625rem',
                bgcolor: '#eff6ff',
                color: '#2563eb',
                fontWeight: 600,
                borderRadius: '4px',
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{ color: '#64748b', fontSize: '0.6875rem', display: 'block', mt: 0.25 }}
          >
            Converse com seus dados e obtenha insights.
          </Typography>
        </Box>
      </Box>

      {/* User Bubble */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Avatar
          src="/images/lucas_avatar.jpg"
          alt="Lucas Santos"
          sx={{ width: 24, height: 24, flexShrink: 0, border: '1px solid #e2e8f0' }}
        />
        <Box
          sx={{
            bgcolor: '#eff6ff',
            border: '1px solid #dbeafe',
            borderRadius: '8px',
            p: 1.15,
            flex: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: '0.75rem', color: '#1e3a8a', fontWeight: 500, lineHeight: 1.3 }}
          >
            Quais os 5 produtos mais vendidos neste mês?
          </Typography>
        </Box>
      </Box>

      {/* AI Answer */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            bgcolor: '#0c162c',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 6px rgba(12, 22, 44, 0.2)',
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 13 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{ fontSize: '0.75rem', color: '#1e293b', lineHeight: 1.4, mb: 0.75 }}
          >
            Os 5 produtos mais vendidos neste mês foram:
          </Typography>

          <Box
            component="ol"
            sx={{
              m: 0,
              pl: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.35,
              fontSize: '0.75rem',
              color: '#334155',
            }}
          >
            <Typography component="li" sx={{ fontSize: '0.71875rem' }}>
              Notebook Dell Inspiron — 45 unidades (R$ 22.500,00)
            </Typography>
            <Typography component="li" sx={{ fontSize: '0.71875rem' }}>
              Smartphone Galaxy A54 — 38 unidades (R$ 15.200,00)
            </Typography>
            <Typography component="li" sx={{ fontSize: '0.71875rem' }}>
              Camiseta Premium — 62 unidades (R$ 8.680,00)
            </Typography>
            <Typography component="li" sx={{ fontSize: '0.71875rem' }}>
              Fone Bluetooth — 34 unidades (R$ 6.120,00)
            </Typography>
            <Typography component="li" sx={{ fontSize: '0.71875rem' }}>
              Cafeteira Elétrica — 28 unidades (R$ 4.760,00)
            </Typography>
          </Box>

          {/* Top 5 Chart Widget */}
          <Box
            sx={{
              p: 1.25,
              borderRadius: '8px',
              bgcolor: '#ffffff',
              border: '1px solid #e2e8f0',
              my: 1.25,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, fontSize: '0.6875rem', color: '#0f172a', display: 'block', mb: 1 }}
            >
              Top 5 Produtos Mais Vendidos
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {topProductsData.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '110px 1fr 68px',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#64748b',
                      fontSize: '0.65625rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Box
                    sx={{
                      height: 12,
                      bgcolor: '#eff6ff',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${item.percentage}%`,
                        bgcolor: '#2563eb',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        pr: 0.5,
                      }}
                    >
                      <Typography sx={{ color: '#ffffff', fontSize: '0.5625rem', fontWeight: 700 }}>
                        {item.units}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: '#334155',
                      fontSize: '0.65625rem',
                      fontWeight: 600,
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<BarChartRoundedIcon sx={{ fontSize: 15 }} />}
              sx={{
                borderRadius: '6px',
                borderColor: '#e2e8f0',
                color: '#2563eb',
                bgcolor: '#ffffff',
                fontSize: '0.6875rem',
                fontWeight: 600,
                py: 0.4,
                px: 1,
                textTransform: 'none',
                '&:hover': { bgcolor: '#eff6ff', borderColor: '#bfdbfe' },
              }}
            >
              Gerar relatório
            </Button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<CodeRoundedIcon sx={{ fontSize: 15 }} />}
              onClick={() => setShowSql((prev) => !prev)}
              sx={{
                borderRadius: '6px',
                borderColor: '#e2e8f0',
                color: '#64748b',
                bgcolor: '#ffffff',
                fontSize: '0.6875rem',
                fontWeight: 600,
                py: 0.4,
                px: 1,
                textTransform: 'none',
                '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1' },
              }}
            >
              {showSql ? 'Ocultar SQL' : 'Ver SQL'}
            </Button>
          </Box>

          {/* SQL Preview */}
          {showSql && (
            <Box
              sx={{
                mt: 1,
                p: 1.25,
                bgcolor: '#0f172a',
                borderRadius: '6px',
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.625rem', fontWeight: 600 }}>
                  SQL
                </Typography>
                <Tooltip title={copiedSql ? 'Copiado!' : 'Copiar'}>
                  <IconButton size="small" onClick={handleCopySql} sx={{ color: '#94a3b8', p: 0.25 }}>
                    {copiedSql ? (
                      <CheckRoundedIcon sx={{ fontSize: 12, color: '#10b981' }} />
                    ) : (
                      <ContentCopyRoundedIcon sx={{ fontSize: 12 }} />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography
                component="pre"
                sx={{
                  m: 0,
                  fontFamily: 'Consolas, monospace',
                  fontSize: '0.59375rem',
                  color: '#38bdf8',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {sqlQuery}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default SalesAICard
