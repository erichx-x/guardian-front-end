'use client';

import { Form, Table, Button } from 'react-bootstrap';
import { User } from '@/types';
import { USER_ROLES, STATUS_OPTIONS } from '@/utils/constants';
import { formatDate } from '@/utils/formatters';

export default function UserTable({
  users,
  onChangeRole,
  onChangeStatus,
}: {
  users: User[];
  onChangeRole: (id: string, role: User['role']) => void;
  onChangeStatus: (id: string, status: User['status']) => void;
}) {
  return (
    <div className="border rounded-4 bg-white shadow-sm p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
        <div>
          <h2 className="h5 mb-1">Usuários</h2>
          <p className="text-muted mb-0">Gerencie os papéis e o acesso dos usuários.</p>
        </div>
      </div>

      <div className="table-responsive">
        <Table hover borderless className="mb-0 align-middle">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Função</th>
              <th>Status</th>
              <th>Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Form.Select
                    size="sm"
                    value={user.role}
                    onChange={(event) => onChangeRole(user.id, event.target.value as User['role'])}
                  >
                    {USER_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Form.Select
                    size="sm"
                    value={user.status}
                    onChange={(event) => onChangeStatus(user.id, event.target.value as User['status'])}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <Button size="sm" variant="outline-secondary" disabled>
                    Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
