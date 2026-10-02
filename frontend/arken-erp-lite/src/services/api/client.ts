export const BASE_API_URL =
  (import.meta as any).env?.VITE_API_URL || 'http://localhost:5024'

export const DEFAULT_TENANT_ID = '11111111-1111-1111-1111-111111111111'

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options

  let url = `${BASE_API_URL}${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, String(val))
      }
    })
    const query = searchParams.toString()
    if (query) {
      url += (url.includes('?') ? '&' : '?') + query
    }
  }

  const tenantId = localStorage.getItem('tenant_id') || DEFAULT_TENANT_ID
  const token = localStorage.getItem('access_token')

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Tenant-ID': tenantId,
  }

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    headers: {
      ...defaultHeaders,
      ...(headers as Record<string, string>),
    },
    ...restOptions,
  })

  if (!response.ok) {
    let errorDetail = `Erro HTTP ${response.status}: ${response.statusText}`
    try {
      const data = await response.json()
      if (data?.message || data?.error) {
        errorDetail = data.message || data.error
      }
    } catch {
      // Ignore json parse error on non-json error responses
    }
    throw new Error(errorDetail)
  }

  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}

export const api = {
  get: <T>(url: string, params?: RequestOptions['params']) =>
    apiClient<T>(url, { method: 'GET', params }),

  post: <T>(url: string, body?: any) =>
    apiClient<T>(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(url: string, body?: any) =>
    apiClient<T>(url, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(url: string, body?: any) =>
    apiClient<T>(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(url: string) =>
    apiClient<T>(url, { method: 'DELETE' }),
}
