export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REFRESH: '/api/v1/auth/refresh',
    LOGOUT: '/api/v1/auth/logout',
    ME: '/api/v1/auth/me',
  },
  PRODUCTS: {
    LIST: '/api/v1/products',
    KPIS: '/api/v1/products/kpis',
    CATEGORIES: '/api/v1/products/categories',
    BY_ID: (id: string) => `/api/v1/products/${id}`,
    STOCK: (id: string) => `/api/v1/products/${id}/stock`,
  },
  CUSTOMERS: {
    LIST: '/api/v1/customers',
    KPIS: '/api/v1/customers/kpis',
    BY_ID: (id: string) => `/api/v1/customers/${id}`,
  },
  SALES: {
    LIST: '/api/v1/sales',
    KPIS: '/api/v1/sales/kpis',
  },
  DASHBOARD: {
    SUMMARY: '/api/v1/dashboard/summary',
  },
  AI: {
    INSIGHTS: '/api/v1/ai/insights',
    APPLY: (id: string) => `/api/v1/ai/insights/${id}/apply`,
    DISMISS: (id: string) => `/api/v1/ai/insights/${id}/dismiss`,
    CHAT: '/api/v1/ai/chat',
  },
}
