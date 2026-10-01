import React from 'react'
import { Chip } from '@mui/material'

export type StatusType =
  | 'Concluída'
  | 'Concluído'
  | 'Pendente'
  | 'Cancelada'
  | 'Cancelado'
  | 'Processando'
  | 'Em andamento'
  | 'Em estoque'
  | 'Estoque baixo'
  | 'Sem estoque'
  | string

export interface StatusChipProps {
  status: StatusType
  size?: 'small' | 'medium'
  sx?: any
}

const statusConfig: Record<string, { bg: string; color: string }> = {
  Concluída: {
    bg: '#dcfce7',
    color: '#15803d',
  },
  Concluído: {
    bg: '#dcfce7',
    color: '#15803d',
  },
  Pago: {
    bg: '#dcfce7',
    color: '#15803d',
  },
  'Em estoque': {
    bg: '#dcfce7',
    color: '#15803d',
  },
  Ativo: {
    bg: '#dcfce7',
    color: '#15803d',
  },
  Pendente: {
    bg: '#fef3c7',
    color: '#b45309',
  },
  'Estoque baixo': {
    bg: '#fef3c7',
    color: '#b45309',
  },
  Inativo: {
    bg: '#fef3c7',
    color: '#b45309',
  },
  Cancelada: {
    bg: '#fee2e2',
    color: '#b91c1c',
  },
  Cancelado: {
    bg: '#fee2e2',
    color: '#b91c1c',
  },
  'Sem estoque': {
    bg: '#fee2e2',
    color: '#b91c1c',
  },
  Processando: {
    bg: '#dbeafe',
    color: '#1d4ed8',
  },
  'Em andamento': {
    bg: '#dbeafe',
    color: '#1d4ed8',
  },
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small', sx }) => {
  const config = statusConfig[status] || {
    bg: '#f1f5f9',
    color: '#475569',
  }

  return (
    <Chip
      label={status}
      size={size}
      sx={{
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 600,
        fontSize: '0.6875rem',
        height: 22,
        borderRadius: '12px',
        px: 0.5,
        '& .MuiChip-label': {
          px: 1,
        },
        ...sx,
      }}
    />
  )
}

export default StatusChip
