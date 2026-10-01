import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'

export interface DataPoint {
  date: string
  value: number
  label?: string
}

export interface AreaLineChartProps {
  data: DataPoint[]
  secondaryData?: DataPoint[]
  height?: number
  yMax?: number
  lineColor?: string
  secondaryLineColor?: string
}

export const AreaLineChart: React.FC<AreaLineChartProps> = ({
  data,
  secondaryData,
  height = 180,
  yMax = 10000,
  lineColor = '#2563eb',
  secondaryLineColor = '#8b5cf6',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const paddingLeft = 56
  const paddingRight = 16
  const paddingTop = 16
  const paddingBottom = 26

  const width = 480
  const plotWidth = width - paddingLeft - paddingRight
  const plotHeight = height - paddingTop - paddingBottom

  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * plotWidth
    const y = paddingTop + plotHeight - (d.value / yMax) * plotHeight
    return { x, y, data: d }
  })

  const secondaryPoints = secondaryData
    ? secondaryData.map((d, i) => {
        const x = paddingLeft + (i / (secondaryData.length - 1)) * plotWidth
        const y = paddingTop + plotHeight - (d.value / yMax) * plotHeight
        return { x, y, data: d }
      })
    : []

  // Smooth spline curve generator
  const getSplinePath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return ''
    let path = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1]

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return path
  }

  const linePath = getSplinePath(points)
  const secondaryLinePath = secondaryPoints.length > 0 ? getSplinePath(secondaryPoints) : ''

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + plotHeight} L ${points[0].x} ${paddingTop + plotHeight} Z`
    : ''

  const yTicks = [
    { value: 10000, label: 'R$ 10.000' },
    { value: 7500, label: 'R$ 7.500' },
    { value: 5000, label: 'R$ 5.000' },
    { value: 2500, label: 'R$ 2.500' },
    { value: 0, label: 'R$ 0' },
  ]

  return (
    <Box sx={{ width: '100%', position: 'relative', userSelect: 'none' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="areaGradientLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity={0.16} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Horizontal Grid lines and Y-axis labels */}
        {yTicks.map((tick) => {
          const y = paddingTop + plotHeight - (tick.value / yMax) * plotHeight
          return (
            <g key={tick.value}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 8}
                y={y + 3.5}
                textAnchor="end"
                fontSize="9"
                fill="#94a3b8"
                fontFamily="Inter, Roboto, sans-serif"
              >
                {tick.label}
              </text>
            </g>
          )
        })}

        {/* Gradient fill for main line */}
        <path d={areaPath} fill="url(#areaGradientLine)" />

        {/* Secondary Line (e.g. Ticket Médio) */}
        {secondaryLinePath && (
          <path
            d={secondaryLinePath}
            fill="none"
            stroke={secondaryLineColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Primary Line (e.g. Vendas) */}
        <path
          d={linePath}
          fill="none"
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secondary Points */}
        {secondaryPoints.map((pt, i) => (
          <circle
            key={`sec-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={3}
            fill={secondaryLineColor}
            stroke="#ffffff"
            strokeWidth={1.5}
          />
        ))}

        {/* Primary Points & X labels */}
        {points.map((pt, i) => {
          const isHovered = hoveredIndex === i
          return (
            <g
              key={pt.data.date}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* X-axis Label */}
              <text
                x={pt.x}
                y={height - 6}
                textAnchor="middle"
                fontSize="9"
                fill={isHovered ? '#0f172a' : '#94a3b8'}
                fontWeight={isHovered ? 600 : 400}
                fontFamily="Inter, Roboto, sans-serif"
              >
                {pt.data.date}
              </text>

              {/* Point circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 5.5 : 3.5}
                fill={lineColor}
                stroke="#ffffff"
                strokeWidth={isHovered ? 2.5 : 2}
                style={{ transition: 'all 0.15s ease' }}
              />

              {/* Hit area */}
              <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />
            </g>
          )
        })}
      </svg>

      {/* Tooltip on hover */}
      {hoveredIndex !== null && (
        <Box
          sx={{
            position: 'absolute',
            left: `${(points[hoveredIndex].x / width) * 100}%`,
            top: `${(points[hoveredIndex].y / height) * 100}%`,
            transform: 'translate(-50%, -125%)',
            bgcolor: '#0f172a',
            color: '#ffffff',
            px: 1.25,
            py: 0.6,
            borderRadius: '6px',
            fontSize: '0.6875rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            zIndex: 10,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '4px',
              borderStyle: 'solid',
              borderColor: '#0f172a transparent transparent transparent',
            },
          }}
        >
          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', fontSize: '0.625rem' }}>
            {data[hoveredIndex].date}
          </Typography>
          <div>Vendas: {data[hoveredIndex].label || `R$ ${data[hoveredIndex].value.toLocaleString('pt-BR')}`}</div>
          {secondaryData && secondaryData[hoveredIndex] && (
            <div style={{ color: '#c084fc' }}>
              Ticket Médio: {secondaryData[hoveredIndex].label || `R$ ${secondaryData[hoveredIndex].value.toLocaleString('pt-BR')}`}
            </div>
          )}
        </Box>
      )}
    </Box>
  )
}

export default AreaLineChart
