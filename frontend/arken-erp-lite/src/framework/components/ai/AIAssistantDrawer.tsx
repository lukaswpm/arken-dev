import React, { useState } from 'react'
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Button,
  InputBase,
  IconButton,
  Tooltip,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import HorizontalBarChart from '../charts/HorizontalBarChart'
import { topCustomers } from '../../data/mockData'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  items?: string[]
  showChart?: boolean
  showActions?: boolean
  sqlQuery?: string
}

export interface AIAssistantDrawerProps {
  onClose?: () => void
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = () => {
  const [inputMessage, setInputMessage] = useState('')
  const [showSql, setShowSql] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'user',
      content: 'Quais os 5 clientes que mais compraram este mês?',
    },
    {
      id: 'msg-2',
      role: 'assistant',
      content:
        'Os 5 clientes que mais compraram este mês, com base no valor total das vendas, são:',
      items: [
        'Tech Solutions Ltda — R$ 12.450,00',
        'Maria Oliveira ME — R$ 8.320,50',
        'Construtora Alfa — R$ 6.980,00',
        'Supermercado Bom Preço — R$ 5.760,30',
        'Almeida & Cia — R$ 4.320,00',
      ],
      showChart: true,
      showActions: true,
      sqlQuery: `SELECT c.nome AS cliente, SUM(v.total) AS total_compras
FROM vendas v
JOIN clientes c ON v.cliente_id = c.id
WHERE v.data_venda >= '2025-07-01'
GROUP BY c.id, c.nome
ORDER BY total_compras DESC
LIMIT 5;`,
    },
  ])

  const handleSend = (text?: string) => {
    const query = text || inputMessage.trim()
    if (!query) return

    const newUserId = `user-${Date.now()}`
    const newAssistantId = `ai-${Date.now()}`

    const userMsg: ChatMessage = {
      id: newUserId,
      role: 'user',
      content: query,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')

    setTimeout(() => {
      let aiResponse: ChatMessage
      const lower = query.toLowerCase()

      if (lower.includes('estoque') || lower.includes('baixa')) {
        aiResponse = {
          id: newAssistantId,
          role: 'assistant',
          content: 'Existem atualmente 5 itens com estoque crítico ou abaixo do mínimo de segurança:',
          items: [
            'Cafeteira Elétrica — Restam 2 unidades',
            'Fone Bluetooth — Restam 4 unidades',
            'Teclado Mecânico RGB — Estoque zerado',
            'Mouse Sem Fio — Restam 3 unidades',
            'Cabo HDMI 2.1 — Restam 5 unidades',
          ],
          showActions: true,
        }
      } else if (lower.includes('sql') || lower.includes('consulta')) {
        aiResponse = {
          id: newAssistantId,
          role: 'assistant',
          content: 'Aqui está a query SQL gerada para consultar o resumo das vendas:',
          sqlQuery: `SELECT DATE(data_venda) as dia, COUNT(*) as qtd, SUM(total) as faturamento
FROM vendas
WHERE data_venda >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY DATE(data_venda)
ORDER BY dia ASC;`,
          showActions: true,
        }
      } else {
        aiResponse = {
          id: newAssistantId,
          role: 'assistant',
          content: `Analisei seus dados sobre "${query}". O faturamento total registrado é de R$ 48.532,80 com margem de crescimento de +12,5% em comparação ao período anterior.`,
          showActions: true,
        }
      }

      setMessages((prev) => [...prev, aiResponse])
    }, 500)
  }

  const handleCopySql = (sql: string) => {
    navigator.clipboard?.writeText(sql)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2000)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: 'calc(100vh - 100px)',
        bgcolor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: '14px 16px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '9px',
            bgcolor: '#f5f3ff',
            color: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 20 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                fontSize: '0.84rem',
                color: '#0f172a',
              }}
            >
              Assistente IA do ArkenERP
            </Typography>
            <Chip
              label="Beta"
              size="small"
              sx={{
                height: 17,
                fontSize: '0.625rem',
                bgcolor: '#eff6ff',
                color: '#2563eb',
                fontWeight: 600,
                borderRadius: '4px',
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
            }}
          >
            Pergunte sobre seus dados, gere relatórios ou obtenha insights.
          </Typography>
        </Box>
      </Box>

      {/* Messages Thread */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.75,
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#e2e8f0',
            borderRadius: '10px',
          },
        }}
      >
        {messages.map((msg) => (
          <Box key={msg.id}>
            {msg.role === 'user' ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.25,
                  mb: 1.25,
                }}
              >
                <Avatar
                  src="/images/lucas_avatar.jpg"
                  alt="Lucas Santos"
                  sx={{
                    width: 26,
                    height: 26,
                    flexShrink: 0,
                    border: '1px solid #e2e8f0',
                  }}
                />
                <Box
                  sx={{
                    bgcolor: '#eff6ff',
                    border: '1px solid #dbeafe',
                    borderRadius: '8px',
                    p: 1.25,
                    maxWidth: '88%',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.75rem',
                      color: '#1e3a8a',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {msg.content}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
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
                  <AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.75rem',
                      color: '#1e293b',
                      lineHeight: 1.45,
                      mb: msg.items ? 0.75 : 0,
                    }}
                  >
                    {msg.content}
                  </Typography>

                  {/* Numbered List */}
                  {msg.items && (
                    <Box
                      component="ol"
                      sx={{
                        m: 0,
                        pl: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.4,
                        fontSize: '0.75rem',
                        color: '#334155',
                      }}
                    >
                      {msg.items.map((item, idx) => (
                        <Typography
                          component="li"
                          key={idx}
                          sx={{
                            fontSize: '0.75rem',
                            color: '#334155',
                            fontWeight: 400,
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {/* Horizontal Bar Chart Widget */}
                  {msg.showChart && (
                    <HorizontalBarChart data={topCustomers} />
                  )}

                  {/* Action buttons (Ver relatório completo / Gerar SQL) */}
                  {msg.showActions && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mt: 1.25,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: '6px',
                          borderColor: '#bfdbfe',
                          color: '#2563eb',
                          bgcolor: '#ffffff',
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          py: 0.35,
                          px: 1,
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
                        onClick={() => setShowSql((prev) => !prev)}
                        sx={{
                          borderRadius: '6px',
                          borderColor: '#e2e8f0',
                          color: '#64748b',
                          bgcolor: '#ffffff',
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          py: 0.35,
                          px: 1,
                          '&:hover': {
                            bgcolor: '#f8fafc',
                            borderColor: '#cbd5e1',
                          },
                        }}
                      >
                        {showSql ? 'Ocultar SQL' : 'Gerar SQL'}
                      </Button>
                    </Box>
                  )}

                  {/* SQL Preview Box */}
                  {showSql && msg.sqlQuery && (
                    <Box
                      sx={{
                        mt: 1.25,
                        p: 1.25,
                        bgcolor: '#0f172a',
                        borderRadius: '6px',
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 0.75,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: '#94a3b8', fontSize: '0.625rem', fontWeight: 600 }}
                        >
                          SQL GERADO
                        </Typography>
                        <Tooltip title={copiedSql ? 'Copiado!' : 'Copiar SQL'}>
                          <IconButton
                            size="small"
                            onClick={() => handleCopySql(msg.sqlQuery!)}
                            sx={{ color: '#94a3b8', p: 0.25 }}
                          >
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
                          m: 0,
                          fontFamily: 'Consolas, monospace',
                          fontSize: '0.625rem',
                          color: '#38bdf8',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}
                      >
                        {msg.sqlQuery}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Suggested prompts & Input Composer */}
      <Box sx={{ p: '12px 14px', borderTop: '1px solid #f1f5f9', bgcolor: '#ffffff', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', gap: 0.75, mb: 1.25, overflowX: 'auto', pb: 0.25 }}>
          <Button
            size="small"
            onClick={() => handleSend('Ver relatório completo de faturamento')}
            sx={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              fontSize: '0.6875rem',
              fontWeight: 500,
              py: 0.3,
              px: 1,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              '&:hover': {
                bgcolor: '#f8fafc',
                borderColor: '#cbd5e1',
              },
            }}
          >
            Ver relatório completo....
          </Button>

          <Button
            size="small"
            onClick={() => handleSend('Gerar SQL de produtos mais vendidos')}
            sx={{
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              fontSize: '0.6875rem',
              fontWeight: 500,
              py: 0.3,
              px: 1,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              '&:hover': {
                bgcolor: '#f8fafc',
                borderColor: '#cbd5e1',
              },
            }}
          >
            Gerar SQL
          </Button>
        </Box>

        {/* Input Field */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            p: '3px 6px',
            gap: 0.75,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            '&:focus-within': {
              borderColor: '#2563eb',
              boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.1)',
            },
          }}
        >
          <InputBase
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Digite sua pergunta..."
            fullWidth
            sx={{
              fontSize: '0.75rem',
              color: '#0f172a',
              px: 0.5,
              '& input::placeholder': {
                color: '#94a3b8',
                opacity: 1,
              },
            }}
          />

          <Tooltip title="Anexar documento ou planilha">
            <IconButton size="small" sx={{ color: '#94a3b8', p: 0.5 }}>
              <AttachFileRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>

          <IconButton
            type="submit"
            disabled={!inputMessage.trim()}
            sx={{
              width: 28,
              height: 28,
              bgcolor: inputMessage.trim() ? '#2563eb' : '#e2e8f0',
              color: '#ffffff',
              borderRadius: '6px',
              '&:hover': {
                bgcolor: inputMessage.trim() ? '#1d4ed8' : '#e2e8f0',
              },
              '&.Mui-disabled': {
                bgcolor: '#f1f5f9',
                color: '#cbd5e1',
              },
            }}
          >
            <SendRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>

        {/* AI Disclaimer */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            mt: 1.25,
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 11, color: '#94a3b8' }} />
          <Typography
            variant="caption"
            sx={{
              color: '#94a3b8',
              fontSize: '0.625rem',
              textAlign: 'center',
            }}
          >
            IA pode cometer erros. Sempre confira as informações.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default AIAssistantDrawer
