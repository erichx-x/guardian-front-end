'use client';

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Technique } from '@/types';
import {
  createTechnique,
  deleteTechnique,
  getTechniques,
  updateTechnique,
} from '@/services/techniqueService';
import TechniqueTable from '@/components/TechniqueTable';
import TechniqueModal from '@/components/TechniqueModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { PAGE_SIZE_ADMIN } from '@/utils/constants';

export default function AdminTechniquesPage() {
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTechnique, setActiveTechnique] = useState<Technique | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Technique | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTechniques();
  }, []);

  async function loadTechniques() {
    setLoading(true);
    setError(null);
    try {
      const response = await getTechniques({ limit: 1000 });
      setTechniques(response.data);
    } catch {
      setError('Não foi possível carregar as técnicas.');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setActiveTechnique(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (technique: Technique) => {
    setActiveTechnique(technique);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setActiveTechnique(null);
    setModalOpen(false);
  };

  const handleSaveTechnique = async (data: Omit<Technique, 'id'>) => {
    setSaving(true);
    try {
      if (activeTechnique) {
        const updated = await updateTechnique(activeTechnique.id, data);
        setTechniques((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      } else {
        const created = await createTechnique(data);
        setTechniques((current) => [created, ...current]);
      }
      setModalOpen(false);
    } catch {
      setError('Falha ao salvar a técnica.');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      await deleteTechnique(deleteTarget.id);
      setTechniques((current) => current.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setError('Falha ao excluir a técnica.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <EmptyState title="Erro" description={error} />;
  }

  return (
    <Container className="py-4">
      <TechniqueTable
        techniques={techniques}
        pageSize={PAGE_SIZE_ADMIN}
        onCreate={handleOpenCreate}
        onEdit={handleOpenEdit}
        onDelete={setDeleteTarget}
      />

      <TechniqueModal
        show={modalOpen}
        initialData={activeTechnique}
        onClose={handleCloseModal}
        onSubmit={handleSaveTechnique}
      />

      <DeleteConfirmModal
        show={Boolean(deleteTarget)}
        title="Excluir técnica"
        description={deleteTarget ? `Deseja realmente excluir a técnica "${deleteTarget.technique}"?` : ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={saving}
      />
    </Container>
  );
}
