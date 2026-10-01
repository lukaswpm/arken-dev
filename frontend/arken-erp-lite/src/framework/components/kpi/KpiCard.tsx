import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'

export interface KpiCardProps {
  label: string
  value: string
  change: string
  caption?: string
  isNegative?: boolean
  trendDirection?: 'up' | 'down'
  trendColor?: string
  icon: React.ReactNode
  tone: 'green' | 'blue' | 'purple' | 'orange' | 'red'
  onClick?: () => void
}

const toneStyles = {
  green: {
    bg: '#10b981',
    color: '#ffffff',
    shadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
  },
  blue: {
    bg: '#2563eb',
    color: '#ffffff',
    shadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
  },
  purple: {
    bg: '#8b5cf6',
    color: '#ffffff',
    shadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
  },
  orange: {
    bg: '#f59e0b',
    color: '#ffffff',
    shadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
  },
  red: {
    bg: '#ef4444',
    color: '#ffffff',
    shadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
  },
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  change,
  caption = 'em relação ao período anterior',
  isNegative = false,
  trendDirection,
  trendColor,
  icon,
  tone,
  onClick,
}) => {
  const currentTone = toneStyles[tone]
  const isDown = trendDirection ? trendDirection === 'down' : isNegative
  const activeColor = trendColor || (isNegative ? '#ef4444' : '#10b981')

  return (
    <Card
      onClick={onClick}
      sx={{
        p: '16px 18px',
        borderRadius: '12px',
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 110,
        '&:hover': onClick
          ? {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px -4px rgba(15, 23, 42, 0.08)',
              borderColor: '#cbd5e1',
            }
          : undefined,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.75 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            bgcolor: currentTone.bg,
            color: currentTone.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: currentTone.shadow,
            '& svg': {
              fontSize: 22,
            },
          }}
        >
          {icon}
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontWeight: 500,
              fontSize: '0.75rem',
              mb: 0.35,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          mt: 1.5,
          flexWrap: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: activeColor,
            fontWeight: 600,
            fontSize: '0.6875rem',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {isDown ? (
            <ArrowDownwardRoundedIcon sx={{ fontSize: 13, mr: 0.25 }} />
          ) : (
            <ArrowUpwardRoundedIcon sx={{ fontSize: 13, mr: 0.25 }} />
          )}
          {change}
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: '#94a3b8',
            fontSize: '0.625rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {caption}
        </Typography>
      </Box>
    </Card>
  )
}

export default KpiCard
