import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import type { CashFlowPoint } from '../../data/financialMockData'

export interface CashFlowChartProps {
  data: CashFlowPoint[]
  height?: number
  yMax?: number
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({
  data,
  height = 220,
  yMax = 60000,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const paddingLeft = 56
  const paddingRight = 16
  const paddingTop = 20
  const paddingBottom = 28

  const width = 500
  const plotWidth = width - paddingLeft - paddingRight
  const plotHeight = height - paddingTop - paddingBottom

  const yTicks = [
    { value: 60000, label: 'R$ 60.000' },
    { value: 40000, label: 'R$ 40.000' },
    { value: 20000, label: 'R$ 20.000' },
    { value: 0, label: 'R$ 0' },
  ]

  const getY = (val: number) => {
    return paddingTop + plotHeight - (val / yMax) * plotHeight
  }

  // Calculate coordinates for each date
  const barWidth = 9.5
  const barGap = 2.5

  const items = data.map((d, i) => {
    const groupCenterX =
      paddingLeft + (i / (data.length - 1)) * plotWidth
    const entradaX = groupCenterX - barWidth - barGap / 2
    const saidaX = groupCenterX + barGap / 2
    const entradaY = getY(d.entradas)
    const saidaY = getY(d.saidas)
    const saldoY = getY(d.saldo)

    return {
      date: d.date,
      entradas: d.entradas,
      saidas: d.saidas,
      saldo: d.saldo,
      groupCenterX,
      entradaX,
      saidaX,
      entradaY,
      saidaY,
      saldoY,
      entradaHeight: paddingTop + plotHeight - entradaY,
      saidaHeight: paddingTop + plotHeight - saidaY,
    }
  })

  // Smooth spline curve for Saldo line
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

  const saldoPoints = items.map((it) => ({ x: it.groupCenterX, y: it.saldoY }))
  const saldoSplinePath = getSplinePath(saldoPoints)

  return (
    <Box sx={{ width: '100%', position: 'relative', userSelect: 'none' }}>
      {/* Legend */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 2.5,
          mb: 1.5,
          px: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
          <Typography sx={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 500 }}>
            Entradas
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
          <Typography sx={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 500 }}>
            Saídas
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2563eb' }} />
          <Typography sx={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 500 }}>
            Saldo
          </Typography>
        </Box>
      </Box>

      {/* SVG Canvas */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Horizontal gridlines and Y-axis labels */}
        {yTicks.map((tick) => {
          const y = getY(tick.value)
          return (
            <g key={tick.value}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth={1}
              />
              <text
                x={paddingLeft - 8}
                y={y + 3.5}
                textAnchor="end"
                fill="#94a3b8"
                fontSize={9}
                fontFamily="Inter, sans-serif"
                fontWeight={500}
              >
                {tick.label}
              </text>
            </g>
          )
        })}

        {/* Vertical hover line indicator */}
        {hoveredIndex !== null && items[hoveredIndex] && (
          <line
            x1={items[hoveredIndex].groupCenterX}
            y1={paddingTop}
            x2={items[hoveredIndex].groupCenterX}
            y2={paddingTop + plotHeight}
            stroke="#94a3b8"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        )}

        {/* Grouped Bars */}
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index
          return (
            <g
              key={item.date}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{ cursor: 'pointer' }}
            >
              {/* Invisible wide hit area */}
              <rect
                x={item.groupCenterX - 18}
                y={paddingTop}
                width={36}
                height={plotHeight}
                fill="transparent"
              />

              {/* Entradas Bar (Green) */}
              <rect
                x={item.entradaX}
                y={item.entradaY}
                width={barWidth}
                height={Math.max(item.entradaHeight, 2)}
                rx={2.5}
                ry={2.5}
                fill="#10b981"
                opacity={isHovered ? 1 : 0.88}
                style={{ transition: 'opacity 0.15s ease' }}
              />

              {/* Saídas Bar (Red) */}
              <rect
                x={item.saidaX}
                y={item.saidaY}
                width={barWidth}
                height={Math.max(item.saidaHeight, 2)}
                rx={2.5}
                ry={2.5}
                fill="#ef4444"
                opacity={isHovered ? 1 : 0.88}
                style={{ transition: 'opacity 0.15s ease' }}
              />

              {/* X-axis date label */}
              <text
                x={item.groupCenterX}
                y={paddingTop + plotHeight + 16}
                textAnchor="middle"
                fill={isHovered ? '#0f172a' : '#94a3b8'}
                fontSize={9.5}
                fontFamily="Inter, sans-serif"
                fontWeight={isHovered ? 600 : 500}
              >
                {item.date}
              </text>
            </g>
          )
        })}

        {/* Saldo Line (Spline) */}
        <path
          d={saldoSplinePath}
          fill="none"
          stroke="#2563eb"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Saldo Points */}
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index
          return (
            <g
              key={`dot-${item.date}`}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={item.groupCenterX}
                cy={item.saldoY}
                r={isHovered ? 4.5 : 3.5}
                fill="#2563eb"
                stroke="#ffffff"
                strokeWidth={2}
                style={{ transition: 'all 0.15s ease' }}
              />
            </g>
          )
        })}
      </svg>

      {/* Floating Tooltip */}
      {hoveredIndex !== null && items[hoveredIndex] && (
        <Box
          sx={{
            position: 'absolute',
            top: 25,
            left: `calc(${(items[hoveredIndex].groupCenterX / width) * 100}% - 70px)`,
            bgcolor: '#0f172a',
            color: '#ffffff',
            px: 1.5,
            py: 1,
            borderRadius: '8px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            zIndex: 10,
            pointerEvents: 'none',
            fontSize: '0.6875rem',
            lineHeight: 1.4,
            minWidth: 140,
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '0.6875rem', color: '#93c5fd', mb: 0.5 }}>
            Data: {items[hoveredIndex].date}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <span style={{ color: '#6ee7b7' }}>Entradas:</span>
            <strong>R$ {items[hoveredIndex].entradas.toLocaleString('pt-BR')},00</strong>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <span style={{ color: '#fca5a5' }}>Saídas:</span>
            <strong>R$ {items[hoveredIndex].saidas.toLocaleString('pt-BR')},00</strong>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
              mt: 0.25,
              pt: 0.25,
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span style={{ color: '#93c5fd' }}>Saldo:</span>
            <strong>R$ {items[hoveredIndex].saldo.toLocaleString('pt-BR')},00</strong>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CashFlowChart
