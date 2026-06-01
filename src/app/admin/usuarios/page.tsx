'use client';

import { useEffect, useState } from 'react';
import { getUsers, updateUserRole, updateUserStatus } from '@/services/userService';
import UserTable from '@/components/UserTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { User } from '@/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => setError('Não foi possível carregar os usuários.'))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (id: string, role: User['role']) => {
    try {
      const updated = await updateUserRole(id, role);
      setUsers((current) => current.map((user) => (user.id === updated.id ? updated : user)));
    } catch {
      setError('Falha ao atualizar a função.');
    }
  };

  const handleStatusChange = async (id: string, status: User['status']) => {
    try {
      const updated = await updateUserStatus(id, status);
      setUsers((current) => current.map((user) => (user.id === updated.id ? updated : user)));
    } catch {
      setError('Falha ao atualizar o status.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <EmptyState title="Erro" description={error} />;
  }

  return <UserTable users={users} onChangeRole={handleRoleChange} onChangeStatus={handleStatusChange} />;
}
