import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import type { CategoryShare } from '../../data/mockData'

export interface DonutChartProps {
  categories: CategoryShare[]
  totalValue?: string
  totalLabel?: string
  size?: number
}

export const DonutChart: React.FC<DonutChartProps> = ({
  categories,
  totalValue = 'R$ 48.532,80',
  totalLabel = 'Total',
  size = 126,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  let currentDegree = 0
  const gradientStops = categories.map((cat) => {
    const start = currentDegree
    const extent = (cat.numPercentage / 100) * 360
    currentDegree += extent
    return `${cat.color} ${start}deg ${currentDegree}deg`
  })

  const conicGradient = `conic-gradient(${gradientStops.join(', ')})`

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2.5,
        width: '100%',
        py: 0.5,
      }}
    >
      {/* Donut graphic */}
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          background: conicGradient,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        {/* Inner white circle for donut hole */}
        <Box
          sx={{
            width: size * 0.70,
            height: size * 0.70,
            borderRadius: '50%',
            bgcolor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
            p: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              color: '#0f172a',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
            }}
          >
            {totalValue}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#94a3b8',
              fontSize: '0.625rem',
              fontWeight: 500,
              mt: 0.25,
            }}
          >
            {totalLabel}
          </Typography>
        </Box>
      </Box>

      {/* Legend list on right */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minWidth: 130,
        }}
      >
        {categories.map((cat) => {
          const isSelected = hoveredCategory === cat.name
          return (
            <Box
              key={cat.name}
              onMouseEnter={() => setHoveredCategory(cat.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                opacity: hoveredCategory && !isSelected ? 0.55 : 1,
                transition: 'opacity 0.15s ease',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: cat.color,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.75rem',
                    color: isSelected ? '#0f172a' : '#475569',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  {cat.name}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: isSelected ? '#0f172a' : '#64748b',
                }}
              >
                {cat.percentage}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default DonutChart
