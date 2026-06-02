import { Technique, ApiResponse, SearchParams } from '@/types';
import { apiRequest } from './api';

export async function getTechniques(params?: SearchParams): Promise<ApiResponse<Technique[]>> {
  const query = new URLSearchParams();
  if (params?.q) query.set('q', params.q);
  if (params?.category) query.set('category', params.category);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const queryString = query.toString();
  const url = `/techniques${queryString ? `?${queryString}` : ''}`;
  return apiRequest<ApiResponse<Technique[]>>(url);
}

export async function searchTechniques(query: string): Promise<ApiResponse<Technique[]>> {
  const normalized = query.trim();
  if (!normalized) {
    return { data: [], total: 0 };
  }

  const url = `/techniques/search?q=${encodeURIComponent(normalized)}`;
  return apiRequest<ApiResponse<Technique[]>>(url);
}

export async function getTechniqueById(id: string): Promise<Technique | null> {
  try {
    return await apiRequest<Technique>(`/techniques/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return null;
    }
    throw error;
  }
}

export async function createTechnique(data: Omit<Technique, 'id'>): Promise<Technique> {
  return apiRequest<Technique>('/techniques', {
    method: 'POST',
    body: data,
  });
}

export async function updateTechnique(id: string, data: Partial<Omit<Technique, 'id'>>): Promise<Technique> {
  return apiRequest<Technique>(`/techniques/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: data,
  });
}

export async function deleteTechnique(id: string): Promise<{ success: boolean }> {
  await apiRequest<{ message: string }>(`/techniques/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return { success: true };
}
