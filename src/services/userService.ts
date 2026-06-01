import usersJson from '../../data/users.json';
import { User } from '@/types';
import { mockFetch, mockResponse } from './api';

let users: User[] = usersJson.map((user) => ({ ...user }));

export async function getUsers(): Promise<User[]> {
  return mockFetch(users, 300);
}

export async function updateUserRole(id: string, role: User['role']): Promise<User> {
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Usuário não encontrado');
  }
  users[index] = { ...users[index], role };
  return mockFetch(users[index], 300);
}

export async function updateUserStatus(id: string, status: User['status']): Promise<User> {
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error('Usuário não encontrado');
  }
  users[index] = { ...users[index], status };
  return mockFetch(users[index], 300);
}
