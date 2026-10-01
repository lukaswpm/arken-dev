import React, { useState } from 'react'
import {
  Box,
  Card,
  Typography,
  Chip,
  Avatar,
  Button,
  InputBase,
  IconButton,
  Collapse,
  Tooltip,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { aiBalanceTrendPoints } from '../../data/financialMockData'

export interface FinanceAICardProps {
  onOpenFullReport?: () => void
}

export const FinanceAICard: React.FC<FinanceAICardProps> = ({ onOpenFullReport }) => {
  const [showSql, setShowSql] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([])

  const sqlQuery = `SELECT 
    DATE_FORMAT(data_transacao, '%Y-%m') as mes,
    SUM(CASE WHEN tipo = 'ENTRADA' THEN valor ELSE 0 END) as total_entradas,
    SUM(CASE WHEN tipo = 'SAIDA' THEN valor ELSE 0 END) as total_saidas,
    (SUM(CASE WHEN tipo = 'ENTRADA' THEN valor ELSE 0 END) - SUM(CASE WHEN tipo = 'SAIDA' THEN valor ELSE 0 END)) as saldo_liquido
FROM transacoes_financeiras
WHERE data_transacao BETWEEN '2025-07-01' AND '2025-07-31'
GROUP BY DATE_FORMAT(data_transacao, '%Y-%m');`

  const handleCopySql = () => {
    navigator.clipboard?.writeText(sqlQuery)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    const text = inputValue
    setInputValue('')
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text },
      {
        role: 'assistant',
        text: `Com base nos lançamentos financeiros de julho, o fluxo de caixa segue em trajetória positiva com saldo consolidado de R$ 25.692,50 e liquidez imediata.`,
      },
    ])
  }

  // Mini spline chart parameters
  const chartWidth = 260
  const chartHeight = 100
  const padLeft = 42
  const padRight = 14
  const padTop = 14
  const padBottom = 22
  const pWidth = chartWidth - padLeft - padRight
  const pHeight = chartHeight - padTop - padBottom
  const maxY = 40000

  const miniPoints = aiBalanceTrendPoints.map((pt, i) => {
    const x = padLeft + (i / (aiBalanceTrendPoints.length - 1)) * pWidth
    const y = padTop + pHeight - (pt.value / maxY) * pHeight
    return { x, y, ...pt }
  })

  // Spline line calculation
  let miniPath = ''
  if (miniPoints.length > 1) {
    miniPath = `M ${miniPoints[0].x} ${miniPoints[0].y}`
    for (let i = 0; i < miniPoints.length - 1; i++) {
      const p0 = miniPoints[i === 0 ? 0 : i - 1]
      const p1 = miniPoints[i]
      const p2 = miniPoints[i + 1]
      const p3 = miniPoints[i + 2 < miniPoints.length ? i + 2 : i + 1]

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      miniPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
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
        gap: 1.75,
        height: '100%',
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
              sx={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}
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
                '& .MuiChip-label': { px: 0.6 },
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: '#64748b',
              fontSize: '0.6875rem',
              display: 'block',
              mt: 0.25,
              lineHeight: 1.3,
            }}
          >
            Pergunte sobre suas finanças, gere relatórios ou obtenha insights.
          </Typography>
        </Box>
      </Box>

      {/* Chat Thread Container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          overflowY: 'auto',
          maxHeight: 560,
          pr: 0.5,
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#e2e8f0', borderRadius: '4px' },
        }}
      >
        {/* User Question */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Avatar
            sx={{
              width: 26,
              height: 26,
              bgcolor: '#dbeafe',
              color: '#2563eb',
              flexShrink: 0,
              mt: 0.25,
            }}
          >
            <PersonRoundedIcon sx={{ fontSize: 16 }} />
          </Avatar>
          <Box
            sx={{
              bgcolor: '#eff6ff',
              borderRadius: '10px',
              p: '10px 14px',
              maxWidth: '90%',
              border: '1px solid #dbeafe',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: '#1e3a8a',
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              Como está meu fluxo de caixa este mês?
            </Typography>
          </Box>
        </Box>

        {/* Assistant Response */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Avatar
            sx={{
              width: 26,
              height: 26,
              bgcolor: '#0c162c',
              color: '#60a5fa',
              flexShrink: 0,
              mt: 0.25,
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />
          </Avatar>

          <Box
            sx={{
              flex: 1,
              bgcolor: '#ffffff',
              borderRadius: '10px',
              p: '12px 14px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', color: '#1e293b', fontWeight: 500 }}>
              Seu fluxo de caixa está positivo no mês de julho.
            </Typography>

            {/* Bullets */}
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                '& li': {
                  fontSize: '0.71875rem',
                  color: '#334155',
                  lineHeight: 1.4,
                },
              }}
            >
              <li>
                <strong>Entradas:</strong> R$ 48.532,80
              </li>
              <li>
                <strong>Saídas:</strong> R$ 22.840,30
              </li>
              <li>
                <strong>Saldo atual:</strong>{' '}
                <span style={{ color: '#16a34a', fontWeight: 700 }}>R$ 25.692,50</span>
              </li>
            </Box>

            {/* Insight Callout Box */}
            <Box
              sx={{
                bgcolor: '#faf5ff',
                border: '1px solid #f3e8ff',
                borderRadius: '8px',
                p: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: '#8b5cf6' }} />
                <Typography
                  sx={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: '#7c3aed',
                    letterSpacing: '0.01em',
                  }}
                >
                  Insight
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '0.6875rem',
                  color: '#475569',
                  lineHeight: 1.45,
                }}
              >
                Suas receitas aumentaram <strong>12,5%</strong> em relação ao mês anterior, principalmente pelas vendas de <strong>produtos eletrônicos</strong>.
              </Typography>
            </Box>

            {/* Inline Chart: Evolução do saldo de caixa */}
            <Box sx={{ mt: 0.5 }}>
              <Typography
                sx={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  mb: 0.5,
                }}
              >
                Evolução do saldo de caixa
              </Typography>

              <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                >
                  {/* Grid horizontal ticks */}
                  {[
                    { val: 40000, label: 'R$ 40k' },
                    { val: 20000, label: 'R$ 20k' },
                    { val: 0, label: 'R$ 0' },
                  ].map((tick) => {
                    const y = padTop + pHeight - (tick.val / maxY) * pHeight
                    return (
                      <g key={tick.val}>
                        <line
                          x1={padLeft}
                          y1={y}
                          x2={chartWidth - padRight}
                          y2={y}
                          stroke="#f1f5f9"
                          strokeWidth={1}
                        />
                        <text
                          x={padLeft - 6}
                          y={y + 3}
                          textAnchor="end"
                          fill="#94a3b8"
                          fontSize={8}
                          fontFamily="Inter, sans-serif"
                        >
                          {tick.label}
                        </text>
                      </g>
                    )
                  })}

                  {/* Spline line */}
                  <path
                    d={miniPath}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points and X labels */}
                  {miniPoints.map((pt) => (
                    <g key={pt.date}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={3}
                        fill="#2563eb"
                        stroke="#ffffff"
                        strokeWidth={1.5}
                      />
                      <text
                        x={pt.x}
                        y={padTop + pHeight + 13}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize={8}
                        fontFamily="Inter, sans-serif"
                      >
                        {pt.date}
                      </text>
                    </g>
                  ))}
                </svg>
              </Box>
            </Box>

            {/* Quick Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={onOpenFullReport}
                sx={{
                  flex: 1,
                  borderRadius: '6px',
                  textTransform: 'none',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  py: 0.6,
                  color: '#2563eb',
                  borderColor: '#bfdbfe',
                  bgcolor: '#ffffff',
                  '&:hover': {
                    bgcolor: '#eff6ff',
                    borderColor: '#93c5fd',
                  },
                }}
              >
                Ver relatório completo
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowSql(!showSql)}
                sx={{
                  borderRadius: '6px',
                  textTransform: 'none',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  py: 0.6,
                  px: 1.5,
                  color: '#475569',
                  borderColor: '#e2e8f0',
                  bgcolor: '#ffffff',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    borderColor: '#cbd5e1',
                  },
                }}
              >
                Ver SQL
              </Button>
            </Box>

            {/* SQL Collapse View */}
            <Collapse in={showSql}>
              <Box
                sx={{
                  mt: 1,
                  p: 1.25,
                  bgcolor: '#0f172a',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 0.75,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    pb: 0.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CodeRoundedIcon sx={{ fontSize: 14, color: '#60a5fa' }} />
                    <Typography sx={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 600 }}>
                      SQL Gerado
                    </Typography>
                  </Box>
                  <Tooltip title={copiedSql ? 'Copiado!' : 'Copiar SQL'}>
                    <IconButton size="small" onClick={handleCopySql} sx={{ color: '#94a3b8', p: 0.25 }}>
                      {copiedSql ? (
                        <CheckRoundedIcon sx={{ fontSize: 13, color: '#10b981' }} />
                      ) : (
                        <ContentCopyRoundedIcon sx={{ fontSize: 13 }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.625rem',
                    color: '#93c5fd',
                    m: 0,
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.35,
                  }}
                >
                  {sqlQuery}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </Box>

        {/* Dynamic chat thread if user sends additional queries */}
        {chatMessages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.role === 'assistant' && (
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: '#0c162c',
                  color: '#60a5fa',
                  flexShrink: 0,
                  mt: 0.25,
                }}
              >
                <AutoAwesomeRoundedIcon sx={{ fontSize: 12 }} />
              </Avatar>
            )}
            <Box
              sx={{
                bgcolor: msg.role === 'user' ? '#eff6ff' : '#f8fafc',
                borderRadius: '8px',
                p: '8px 12px',
                maxWidth: '85%',
                border: '1px solid',
                borderColor: msg.role === 'user' ? '#dbeafe' : '#e2e8f0',
              }}
            >
              <Typography sx={{ fontSize: '0.6875rem', color: '#1e293b' }}>
                {msg.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Input Bottom Bar */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage()
        }}
        sx={{
          mt: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          p: '4px 6px',
        }}
      >
        <InputBase
          placeholder="Digite sua pergunta..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{
            flex: 1,
            fontSize: '0.75rem',
            px: 1,
            color: '#1e293b',
            '& input::placeholder': {
              color: '#94a3b8',
              opacity: 1,
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={!inputValue.trim()}
          sx={{
            bgcolor: inputValue.trim() ? '#2563eb' : '#e2e8f0',
            color: inputValue.trim() ? '#ffffff' : '#94a3b8',
            width: 28,
            height: 28,
            borderRadius: '6px',
            '&:hover': {
              bgcolor: inputValue.trim() ? '#1d4ed8' : '#e2e8f0',
            },
            transition: 'all 0.15s ease',
          }}
        >
          <SendRoundedIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
    </Card>
  )
}

export default FinanceAICard
