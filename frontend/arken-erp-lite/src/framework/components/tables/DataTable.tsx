import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

export interface Column<T> {
  id: string
  label: React.ReactNode
  align?: 'left' | 'center' | 'right'
  minWidth?: number
  render?: (item: T, index: number) => React.ReactNode
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T, index: number) => string | number
  emptyMessage?: string
  size?: 'small' | 'medium'
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'Nenhum registro encontrado',
  size = 'small',
}: DataTableProps<T>) {
  return (
    <TableContainer sx={{ overflowX: 'auto', width: '100%' }}>
      <Table size={size} sx={{ minWidth: 280 }}>
        <TableHead>
          <TableRow sx={{ '& th': { borderBottom: '1px solid #f1f5f9' } }}>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.align || 'left'}
                sx={{
                  color: '#64748b',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  py: 0.75,
                  px: 1,
                  minWidth: col.minWidth,
                  letterSpacing: '0.01em',
                  bgcolor: 'transparent',
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow
                key={keyExtractor(item, index)}
                hover
                sx={{
                  '&:last-child td': { borderBottom: 0 },
                  '& td': {
                    borderBottom: '1px solid #f8fafc',
                    py: 0.7,
                    px: 1,
                    fontSize: '0.75rem',
                    color: '#1e293b',
                  },
                  '&:hover': {
                    bgcolor: '#f8fafc !important',
                  },
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align || 'left'}>
                    {col.render
                      ? col.render(item, index)
                      : (item as Record<string, unknown>)[col.id] as React.ReactNode}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
