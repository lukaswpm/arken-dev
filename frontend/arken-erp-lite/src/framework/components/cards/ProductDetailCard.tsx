import React, { useState } from 'react'
import {
  Box,
  Card,
  Typography,
  Chip,
  Tabs,
  Tab,
  Button,
  Divider,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import StatusChip from '../tables/StatusChip'

export interface ProductDetailData {
  id: string
  name: string
  specs: string
  category: string
  code: string
  ean: string
  price: string
  status: string
  image: string
  description: string
  brand: string
  model: string
  weight: string
  dimensions: string
}

export interface ProductDetailCardProps {
  product?: ProductDetailData
  onEdit?: () => void
  onViewStock?: () => void
}

const defaultProduct: ProductDetailData = {
  id: 'NT001',
  name: 'Notebook Dell Inspiron 15',
  specs: 'Intel i5, 8GB, 256GB SSD',
  category: 'Eletrônicos',
  code: 'NT001',
  ean: '7891234567890',
  price: 'R$ 2.500,00',
  status: 'Em estoque',
  image: '/images/dell_hero.jpg',
  description:
    'Notebook Dell Inspiron 15, ideal para trabalho e estudos. Processador Intel Core i5, 8GB de RAM e SSD de 256GB. Tela Full HD de 15.6".',
  brand: 'Dell',
  model: 'Inspiron 15',
  weight: '2,1 kg',
  dimensions: '36 x 24 x 2 cm',
}

export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  product = defaultProduct,
  onEdit,
  onViewStock,
}) => {
  const [activeTab, setActiveTab] = useState('Informações')

  return (
    <Card
      sx={{
        p: '16px 18px',
        borderRadius: '12px',
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* Top Product Hero Image */}
      <Box
        sx={{
          width: '100%',
          height: 180,
          borderRadius: '10px',
          overflow: 'hidden',
          bgcolor: '#f8fafc',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            p: 1,
          }}
        />
      </Box>

      {/* Header: Category Badge + Title & Specs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Chip
          label={product.category}
          size="small"
          sx={{
            width: 'fit-content',
            height: 20,
            fontSize: '0.625rem',
            fontWeight: 600,
            bgcolor: '#eff6ff',
            color: '#2563eb',
            borderRadius: '4px',
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            color: '#0f172a',
            lineHeight: 1.25,
            mt: 0.25,
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
          {product.specs}
        </Typography>
      </Box>

      {/* Price & Status Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '1.25rem',
            color: '#0f172a',
            letterSpacing: '-0.02em',
          }}
        >
          {product.price}
        </Typography>
        <StatusChip status={product.status} />
      </Box>

      {/* Code & EAN */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#64748b' }}>
        <Typography variant="caption" sx={{ fontSize: '0.6875rem' }}>
          Código: <strong>{product.code}</strong>
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.6875rem' }}>
          EAN: {product.ean}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#f1f5f9' }} />

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
        sx={{
          minHeight: 30,
          borderBottom: '1px solid #f1f5f9',
          '& .MuiTab-root': {
            minHeight: 30,
            py: 0.5,
            px: 1.25,
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'none',
            color: '#64748b',
            '&.Mui-selected': {
              color: '#2563eb',
              fontWeight: 600,
            },
          },
          '& .MuiTabs-indicator': {
            bgcolor: '#2563eb',
            height: 2,
            borderRadius: '2px',
          },
        }}
      >
        <Tab label="Informações" value="Informações" />
        <Tab label="Estoque" value="Estoque" />
        <Tab label="Histórico" value="Histórico" />
        <Tab label="Anexos" value="Anexos" />
      </Tabs>

      {/* Description */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#0f172a' }}
        >
          Descrição
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#64748b', fontSize: '0.6875rem', lineHeight: 1.45 }}
        >
          {product.description}
        </Typography>
      </Box>

      {/* Specs Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
          bgcolor: '#f8fafc',
          p: 1.25,
          borderRadius: '8px',
          border: '1px solid #f1f5f9',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <LayersOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.625rem', display: 'block' }}>
              Categoria
            </Typography>
            <Typography variant="caption" sx={{ color: '#1e293b', fontSize: '0.6875rem', fontWeight: 600 }}>
              {product.category}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <ShieldOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.625rem', display: 'block' }}>
              Marca
            </Typography>
            <Typography variant="caption" sx={{ color: '#1e293b', fontSize: '0.6875rem', fontWeight: 600 }}>
              {product.brand}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <LaptopOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.625rem', display: 'block' }}>
              Modelo
            </Typography>
            <Typography variant="caption" sx={{ color: '#1e293b', fontSize: '0.6875rem', fontWeight: 600 }}>
              {product.model}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <ScaleOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.625rem', display: 'block' }}>
              Peso
            </Typography>
            <Typography variant="caption" sx={{ color: '#1e293b', fontSize: '0.6875rem', fontWeight: 600 }}>
              {product.weight}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, gridColumn: 'span 2' }}>
          <AspectRatioOutlinedIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.625rem', display: 'block' }}>
              Dimensões
            </Typography>
            <Typography variant="caption" sx={{ color: '#1e293b', fontSize: '0.6875rem', fontWeight: 600 }}>
              {product.dimensions}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Insights da IA Box */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: '8px',
          bgcolor: '#faf5ff',
          border: '1px solid #f3e8ff',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <AutoAwesomeRoundedIcon sx={{ fontSize: 16, color: '#8b5cf6' }} />
            <Typography sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#0f172a' }}>
              Insights da IA
            </Typography>
            <Chip
              label="Beta"
              size="small"
              sx={{
                height: 15,
                fontSize: '0.5625rem',
                bgcolor: '#eff6ff',
                color: '#2563eb',
                fontWeight: 600,
                borderRadius: '3px',
              }}
            />
          </Box>

          <Button
            size="small"
            startIcon={<RefreshRoundedIcon sx={{ fontSize: 13 }} />}
            sx={{
              p: 0,
              minWidth: 0,
              color: '#64748b',
              fontSize: '0.625rem',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { color: '#8b5cf6', bgcolor: 'transparent' },
            }}
          >
            Gerar insights
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}>
            <DiamondOutlinedIcon sx={{ fontSize: 13, color: '#8b5cf6', mt: 0.25, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.6875rem', color: '#334155', lineHeight: 1.35 }}>
              Este produto teve um aumento de <strong>32%</strong> nas vendas nos últimos 30 dias.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}>
            <ErrorOutlineRoundedIcon sx={{ fontSize: 13, color: '#f59e0b', mt: 0.25, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.6875rem', color: '#334155', lineHeight: 1.35 }}>
              É o <strong>2º</strong> mais vendido na categoria Eletrônicos.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}>
            <DiamondOutlinedIcon sx={{ fontSize: 13, color: '#8b5cf6', mt: 0.25, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.6875rem', color: '#334155', lineHeight: 1.35 }}>
              Pode ser interessante aumentar o estoque, pois a previsão de demanda para os próximos 15 dias é de <strong>20 unidades</strong>.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.25 }}>
          <Button
            size="small"
            endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 13 }} />}
            sx={{
              p: 0,
              minWidth: 0,
              color: '#2563eb',
              fontSize: '0.65625rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
            }}
          >
            Ver análise completa
          </Button>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 0.5 }}>
        <Button
          variant="contained"
          size="small"
          onClick={onEdit}
          startIcon={<EditOutlinedIcon sx={{ fontSize: 15 }} />}
          sx={{
            bgcolor: '#2563eb',
            color: '#ffffff',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            py: 0.75,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#1d4ed8', boxShadow: 'none' },
          }}
        >
          Editar Produto
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={onViewStock}
          startIcon={<Inventory2OutlinedIcon sx={{ fontSize: 15 }} />}
          sx={{
            bgcolor: '#ffffff',
            borderColor: '#e2e8f0',
            color: '#2563eb',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            py: 0.75,
            textTransform: 'none',
            '&:hover': { bgcolor: '#eff6ff', borderColor: '#bfdbfe' },
          }}
        >
          Ver no Estoque
        </Button>
      </Box>
    </Card>
  )
}

export default ProductDetailCard
