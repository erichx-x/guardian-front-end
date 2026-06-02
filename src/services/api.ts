import { AuthUser } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const STORAGE_KEY = 'guardian_auth';

export function getStoredAuth(): { token: string; user: AuthUser } | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as { token: string; user: AuthUser };
  } catch {
    return null;
  }
}

export function setStoredAuth(value: { token: string; user: AuthUser }) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getAuthToken(): string | null {
  return getStoredAuth()?.token ?? null;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers ?? {});
  headers.set('Accept', 'application/json');

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let body = init.body;
  if (body && !(body instanceof FormData) && typeof body !== 'string') {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    body,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (!response.ok) {
    const errorBody = isJson ? await response.json().catch(() => null) : null;
    const message =
      errorBody?.error || errorBody?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (isJson) {
    return response.json() as Promise<T>;
  }

  return null as unknown as T;
}
