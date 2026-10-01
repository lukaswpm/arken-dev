import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Link } from 'react-router-dom'

export interface ActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  to?: string
  onClick?: () => void
  variant?: 'default' | 'ai'
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  to,
  onClick,
  variant = 'default',
}) => {
  const isAi = variant === 'ai'

  const content = (
    <Card
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: '12px',
        border: '1px solid',
        borderColor: isAi ? '#e9d5ff' : '#e2e8f0',
        background: isAi
          ? 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)'
          : '#ffffff',
        boxShadow: isAi
          ? '0 2px 8px -2px rgba(139, 92, 246, 0.12)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.03)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.75,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        textDecoration: 'none',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isAi
            ? '0 8px 24px -4px rgba(139, 92, 246, 0.2)'
            : '0 8px 20px -4px rgba(15, 23, 42, 0.08)',
          borderColor: isAi ? '#c084fc' : '#cbd5e1',
          '& .action-arrow': {
            transform: 'translateX(3px)',
            color: isAi ? '#7c3aed' : '#1d4ed8',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '9px',
          bgcolor: isAi ? '#f3e8ff' : '#eff6ff',
          color: isAi ? '#8b5cf6' : '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          '& svg': {
            fontSize: 20,
          },
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, pr: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            fontSize: '0.8125rem',
            color: '#0f172a',
            mb: 0.25,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#64748b',
            fontSize: '0.75rem',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        className="action-arrow"
        sx={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          color: isAi ? '#8b5cf6' : '#2563eb',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
      </Box>
    </Card>
  )

  if (to) {
    return (
      <Box component={Link} to={to} sx={{ textDecoration: 'none', display: 'block' }}>
        {content}
      </Box>
    )
  }

  return content
}

export default ActionCard
