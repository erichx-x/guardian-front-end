'use client';

import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const spinnerStyle = size === 'lg' ? { width: '3rem', height: '3rem' } : undefined;
  const variant = size === 'sm' ? 'spinner-border-sm' : '';

  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <Spinner animation="border" role="status" className={variant} style={spinnerStyle}>
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    </div>
  );
}
