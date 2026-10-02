import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'
import type { CustomerItem, CustomerDetailData } from '../framework/data/customersMockData'

export interface CustomerKpi {
  label: string
  value: string
  change: string
  trendDirection: 'up' | 'down'
  caption: string
  tone: 'blue' | 'green' | 'orange' | 'purple'
}

export interface CustomerUpsertPayload {
  name: string
  surname?: string
  email: string
  phone?: string
  document?: string
  address?: string
  city?: string
  state?: string
  status?: string
  avatarUrl?: string
  avatarImage?: string
}

export const customerService = {
  getCustomers: (params?: { search?: string; status?: string; city?: string }) =>
    api.get<CustomerItem[]>(API_ENDPOINTS.CUSTOMERS.LIST, params),

  getCustomerKpis: () =>
    api.get<CustomerKpi[]>(API_ENDPOINTS.CUSTOMERS.KPIS),

  getCustomerById: (id: string) =>
    api.get<CustomerDetailData>(API_ENDPOINTS.CUSTOMERS.BY_ID(id)),

  createCustomer: (payload: CustomerUpsertPayload) =>
    api.post<CustomerItem>(API_ENDPOINTS.CUSTOMERS.LIST, payload),

  updateCustomer: (id: string, payload: CustomerUpsertPayload) =>
    api.put<CustomerItem>(API_ENDPOINTS.CUSTOMERS.BY_ID(id), payload),

  deleteCustomer: (id: string) =>
    api.delete<void>(API_ENDPOINTS.CUSTOMERS.BY_ID(id)),
}
