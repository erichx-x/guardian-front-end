import { AuthUser, LoginCredentials } from '@/types';
import { apiRequest, clearStoredAuth, getStoredAuth, setStoredAuth } from './api';

export async function login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> {
  const response = await apiRequest<{ user: AuthUser; token: string }>('/auth/login', {
    method: 'POST',
    body: credentials,
  });

  setStoredAuth(response);
  return response;
}

export function logout() {
  clearStoredAuth();
}

export function getAuthUser(): AuthUser | null {
  return getStoredAuth()?.user ?? null;
}

export function getAuthToken(): string | null {
  return getStoredAuth()?.token ?? null;
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredAuth()?.token);
}
