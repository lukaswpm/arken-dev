import React from 'react'
import { Box, Card, Typography, Button } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Link } from 'react-router-dom'

export interface SectionCardProps {
  title: React.ReactNode
  subtitle?: string
  actionText?: string
  actionHref?: string
  onAction?: () => void
  headerRight?: React.ReactNode
  children: React.ReactNode
  minHeight?: number | string
  sx?: any
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  actionText,
  actionHref,
  onAction,
  headerRight,
  children,
  minHeight,
  sx,
}) => {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: '12px',
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: minHeight || 'auto',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box>
          {typeof title === 'string' ? (
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: '#0f172a',
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </Typography>
          ) : (
            title
          )}
          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                color: '#94a3b8',
                fontSize: '0.75rem',
                display: 'block',
                mt: 0.25,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {headerRight}

          {actionText && (
            actionHref ? (
              <Button
                component={Link}
                to={actionHref}
                endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '14px !important' }} />}
                sx={{
                  color: '#2563eb',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  p: 0,
                  minWidth: 0,
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                {actionText}
              </Button>
            ) : (
              <Button
                onClick={onAction}
                endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: '14px !important' }} />}
                sx={{
                  color: '#2563eb',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  p: 0,
                  minWidth: 0,
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                {actionText}
              </Button>
            )
          )}
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </Card>
  )
}

export default SectionCard
