import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'
import type { CategoryShare } from '../framework/data/mockData'

export interface DashboardMetric {
  label: string
  value: string
  change: string
  trendDirection: 'up' | 'down'
  caption: string
  tone: 'blue' | 'green' | 'orange' | 'purple'
}

export interface DashboardSummaryResponse {
  metrics: DashboardMetric[]
  revenueData: { date: string; value: number; label?: string }[]
  categoryShares: CategoryShare[]
  recentSales: {
    id: string
    orderNumber: string
    date: string
    customer: string
    total: string
    rawTotal: number
    status: string
  }[]
  featuredProducts: {
    id: string
    name: string
    category: string
    price: string
    stock: number
    image: string
  }[]
}

export const dashboardService = {
  getSummary: () =>
    api.get<DashboardSummaryResponse>(API_ENDPOINTS.DASHBOARD.SUMMARY),
}
