'use client';

import styles from '@/app/admin/dashboard.module.css';

export default function AdminContent() {
  return (
    <div className={styles.content}>
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#212529', marginBottom: '16px' }}>
          Bem-vindo ao Guardian
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#6c757d', marginBottom: '32px' }}>
          Olá! Este é seu painel de administração. Selecione uma opção no menu para começar.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#999' }}>
          © {new Date().getFullYear()} Guardian. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
