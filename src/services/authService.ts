import { AuthUser, LoginCredentials, User } from '@/types';
import usersJson from '../../data/users.json';
import { mockFetch } from './api';

const STORAGE_KEY = 'guardian_auth';

const users: User[] = usersJson.map((item) => ({ ...item }));

const credentialsMap: Record<string, { password: string; userId: string }> = {
  admin: { password: 'admin', userId: '1' },
  editor: { password: 'editor', userId: '2' },
  user: { password: 'user', userId: '3' },
};

export async function login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> {
  const mapping = credentialsMap[credentials.username.toLowerCase()];

  if (!mapping || mapping.password !== credentials.password) {
    throw new Error('Usuário ou senha inválidos');
  }

  const userRecord = users.find((item) => item.id === mapping.userId);
  if (!userRecord) {
    throw new Error('Usuário não encontrado');
  }

  const user: AuthUser = {
    id: userRecord.id,
    name: userRecord.name,
    role: userRecord.role,
  };

  const token = `mock-token-${user.id}`;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));

  return mockFetch({ user, token }, 400);
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored).user as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  return Boolean(stored);
}
