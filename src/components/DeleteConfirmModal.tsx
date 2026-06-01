'use client';

import { Modal, Button, Spinner } from 'react-bootstrap';

export default function DeleteConfirmModal({
  show,
  title,
  description,
  onConfirm,
  onCancel,
  loading,
}: {
  show: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Excluir'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
