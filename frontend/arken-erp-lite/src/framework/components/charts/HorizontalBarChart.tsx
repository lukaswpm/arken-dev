import React from 'react'
import { Box, Typography } from '@mui/material'
import type { BestCustomer } from '../../data/mockData'

export interface HorizontalBarChartProps {
  data: BestCustomer[]
  title?: string
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title = 'Top 5 Clientes por Valor de Compra',
}) => {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: '8px',
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        my: 1.5,
      }}
    >
      {title && (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            color: '#0f172a',
            mb: 1.25,
          }}
        >
          {title}
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {data.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: 'grid',
              gridTemplateColumns: '138px 1fr 68px',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontSize: '0.6875rem',
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
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${item.percentageWidth}%`,
                  bgcolor: '#2563eb',
                  borderRadius: '3px',
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: '#334155',
                fontSize: '0.6875rem',
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
  )
}

export default HorizontalBarChart
