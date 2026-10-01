import React from 'react'
import { Box, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

export interface DateRangeSelectProps {
  value: string
  onChange: (value: string) => void
}

export const DateRangeSelect: React.FC<DateRangeSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  }

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        IconComponent={KeyboardArrowDownRoundedIcon}
        sx={{
          bgcolor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: '#334155',
          height: 38,
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 0.75,
            pr: '32px !important',
            pl: 1.5,
          },
          '&:hover': {
            bgcolor: '#f8fafc',
            borderColor: '#cbd5e1',
          },
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
            <span>{selected}</span>
          </Box>
        )}
      >
        <MenuItem value="Últimos 7 dias">Últimos 7 dias</MenuItem>
        <MenuItem value="Últimos 30 dias">Últimos 30 dias</MenuItem>
        <MenuItem value="Últimos 90 dias">Últimos 90 dias</MenuItem>
        <MenuItem value="Este ano (2025)">Este ano (2025)</MenuItem>
      </Select>
    </Box>
  )
}

export default DateRangeSelect
