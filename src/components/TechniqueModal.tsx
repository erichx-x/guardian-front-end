'use client';

import { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Technique } from '@/types';
import { CATEGORIES } from '@/utils/constants';

type TechniquePayload = Omit<Technique, 'id'>;

export default function TechniqueModal({
  show,
  onClose,
  onSubmit,
  initialData,
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: TechniquePayload) => Promise<void>;
  initialData?: Technique | null;
}) {
  const [form, setForm] = useState<TechniquePayload>({
    technique: '',
    category: '',
    description: '',
    video: '',
    thumbnail: '',
    tags: [],
  });
  const [tagText, setTagText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        technique: initialData.technique,
        category: initialData.category,
        description: initialData.description,
        video: initialData.video,
        thumbnail: initialData.thumbnail ?? '',
        tags: initialData.tags ?? [],
      });
      setTagText((initialData.tags ?? []).join(', '));
    } else {
      setForm({
        technique: '',
        category: '',
        description: '',
        video: '',
        thumbnail: '',
        tags: [],
      });
      setTagText('');
    }
  }, [initialData]);

  const handleChange = (field: keyof TechniquePayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.technique.trim() || !form.category.trim()) {
      setError('Nome e categoria são obrigatórios.');
      return;
    }

    setSaving(true);
    try {
      const tags = tagText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      await onSubmit({ ...form, tags });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar técnica.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Editar técnica' : 'Nova técnica'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="techniqueName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              value={form.technique}
              onChange={(event) => handleChange('technique', event.target.value)}
              placeholder="Ex: O-soto-gari"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="techniqueCategory">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              value={form.category}
              onChange={(event) => handleChange('category', event.target.value)}
              required
            >
              <option value="">Selecione uma categoria</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="techniqueDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="techniqueVideo">
            <Form.Label>Link do vídeo</Form.Label>
            <Form.Control
              type="url"
              value={form.video}
              onChange={(event) => handleChange('video', event.target.value)}
              placeholder="https://youtube.com/..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="techniqueThumbnail">
            <Form.Label>Thumbnail (URL)</Form.Label>
            <Form.Control
              type="url"
              value={form.thumbnail}
              onChange={(event) => handleChange('thumbnail', event.target.value)}
              placeholder="https://..."
            />
          </Form.Group>

          <Form.Group className="mb-0" controlId="techniqueTags">
            <Form.Label>Tags (separadas por vírgula)</Form.Label>
            <Form.Control
              value={tagText}
              onChange={(event) => setTagText(event.target.value)}
              placeholder="queda, judo, takedown"
            />
          </Form.Group>
          {error && <p className="text-danger mt-3">{error}</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? <Spinner animation="border" size="sm" /> : 'Salvar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
