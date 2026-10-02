import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'

export interface UserDto {
  id: string
  email: string
  name: string
  avatarUrl?: string
  role: string
}

export interface TenantDto {
  id: string
  name: string
  slug: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string
  user: UserDto
  tenant: TenantDto
}

export interface LoginCredentials {
  email: string
  password: string
  deviceId?: string
  tenantSlugOrId?: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const payload = {
      email: credentials.email.trim(),
      password: credentials.password,
      deviceId: credentials.deviceId || 'web-client',
      tenantSlugOrId: credentials.tenantSlugOrId || localStorage.getItem('tenant_id') || '11111111-1111-1111-1111-111111111111',
    }

    const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload)

    if (response?.accessToken) {
      localStorage.setItem('access_token', response.accessToken)
      if (response.refreshToken) {
        localStorage.setItem('refresh_token', response.refreshToken)
      }
      if (response.tenant?.id) {
        localStorage.setItem('tenant_id', response.tenant.id)
        localStorage.setItem('current_tenant', JSON.stringify(response.tenant))
      }
      if (response.user) {
        localStorage.setItem('current_user', JSON.stringify(response.user))
      }
    }

    return response
  },

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token')
    try {
      if (refreshToken) {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken })
      }
    } catch (e) {
      console.warn('Erro ao revogar token no backend:', e)
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('current_user')
      localStorage.removeItem('current_tenant')
    }
  },

  async getCurrentUser(): Promise<{ user: UserDto; tenant: TenantDto } | null> {
    try {
      return await api.get<{ user: UserDto; tenant: TenantDto }>(API_ENDPOINTS.AUTH.ME)
    } catch {
      return null
    }
  },

  getStoredUser(): UserDto | null {
    const userStr = localStorage.getItem('current_user')
    if (!userStr) return null
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token')
  },
}
