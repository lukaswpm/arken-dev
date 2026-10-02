import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'
import type { OrderItem } from '../framework/data/salesMockData'
import type { CategoryShare } from '../framework/data/mockData'

export interface SalesKpiResponse {
  totalSales: string
  rawTotalSales: number
  ordersCount: number
  averageTicket: string
  rawAverageTicket: number
  conversionRate: number
  salesDeltaPct: number
  salesDeltaDirection: 'up' | 'down'
  evolutionVendas: { date: string; value: number; label: string }[]
  evolutionTicket: { date: string; value: number; label: string }[]
  categoryShares: CategoryShare[]
}

export const salesService = {
  getSales: () =>
    api.get<OrderItem[]>(API_ENDPOINTS.SALES.LIST),

  getSalesKpis: () =>
    api.get<SalesKpiResponse>(API_ENDPOINTS.SALES.KPIS),
}
