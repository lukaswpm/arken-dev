import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'

export interface BusinessInsightItem {
  id: string
  type: string
  priority: string
  title: string
  description: string
  status: string
  createdAt: string
}

export interface ChatResponse {
  response: string
  timestamp: string
}

export const aiService = {
  getInsights: (status?: string) =>
    api.get<BusinessInsightItem[]>(API_ENDPOINTS.AI.INSIGHTS, { status }),

  applyInsight: (id: string) =>
    api.post<{ message: string; status: string }>(API_ENDPOINTS.AI.APPLY(id)),

  dismissInsight: (id: string) =>
    api.post<{ message: string; status: string }>(API_ENDPOINTS.AI.DISMISS(id)),

  chat: (message: string) =>
    api.post<ChatResponse>(API_ENDPOINTS.AI.CHAT, { message }),
}
