import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'
import type { CatalogProduct } from '../framework/data/productsMockData'

export interface ProductKpi {
  label: string
  value: string
  change: string
  trendDirection: 'up' | 'down'
  caption: string
  tone: 'blue' | 'green' | 'orange' | 'purple'
}

export interface ProductCategoryItem {
  id: string
  name: string
  description?: string
}

export interface ProductUpsertPayload {
  name: string
  description?: string
  code?: string
  sku?: string
  price: number
  categoryId?: string
  stockQuantity: number
  brand?: string
  model?: string
  imageUrl?: string
  image?: string
}

export const productService = {
  getProducts: (params?: { search?: string; category?: string; status?: string }) =>
    api.get<CatalogProduct[]>(API_ENDPOINTS.PRODUCTS.LIST, params),

  getProductKpis: () =>
    api.get<ProductKpi[]>(API_ENDPOINTS.PRODUCTS.KPIS),

  getCategories: () =>
    api.get<ProductCategoryItem[]>(API_ENDPOINTS.PRODUCTS.CATEGORIES),

  getProductById: (id: string) =>
    api.get<CatalogProduct>(API_ENDPOINTS.PRODUCTS.BY_ID(id)),

  createProduct: (payload: ProductUpsertPayload) =>
    api.post<CatalogProduct>(API_ENDPOINTS.PRODUCTS.LIST, payload),

  updateProduct: (id: string, payload: ProductUpsertPayload) =>
    api.put<CatalogProduct>(API_ENDPOINTS.PRODUCTS.BY_ID(id), payload),

  updateStock: (id: string, newStock: number) =>
    api.patch<{ id: string; stock: number }>(API_ENDPOINTS.PRODUCTS.STOCK(id), { newStock }),

  deleteProduct: (id: string) =>
    api.delete<void>(API_ENDPOINTS.PRODUCTS.BY_ID(id)),
}
