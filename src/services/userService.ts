import { User } from '@/types';
import { apiRequest } from './api';

export async function getUsers(): Promise<User[]> {
  return apiRequest<User[]>('/users');
}

export async function updateUserRole(id: string, role: User['role']): Promise<User> {
  return apiRequest<User>(`/users/${encodeURIComponent(id)}/role`, {
    method: 'PATCH',
    body: { role },
  });
}

export async function updateUserStatus(id: string, status: User['status']): Promise<User> {
  return apiRequest<User>(`/users/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: { status },
  });
}
