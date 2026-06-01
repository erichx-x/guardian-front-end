'use client';

import { Button } from 'react-bootstrap';
import { AuthUser } from '@/types';
import styles from '@/styles/admin.module.css';

interface AdminTopbarProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function AdminTopbar({ user, onLogout }: AdminTopbarProps) {
  return (
    <div className={styles.topbar}>
      <div>
        <p className="mb-1 text-muted">Painel Administrativo</p>
        <h2 className={styles.topbarTitle}>Bem-vindo, {user.name}</h2>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className={styles.topbarUserStatus}>{user.role.toUpperCase()}</span>
        <Button variant="outline-secondary" size="sm" onClick={onLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}
