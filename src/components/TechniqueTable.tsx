'use client';

import { useMemo, useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Technique } from '@/types';
import { usePagination } from '@/hooks/usePagination';
import CategoryBadge from '@/components/CategoryBadge';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';

export default function TechniqueTable({
  techniques,
  pageSize,
  onEdit,
  onDelete,
  onCreate,
}: {
  techniques: Technique[];
  pageSize: number;
  onEdit: (item: Technique) => void;
  onDelete: (item: Technique) => void;
  onCreate: () => void;
}) {
  const [query, setQuery] = useState('');
  const { page, totalPages, goToPage } = usePagination(techniques.length, 1, pageSize);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return techniques.filter((item) => {
      return (
        item.technique.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(term))
      );
    });
  }, [techniques, query]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  return (
    <div className="border rounded-4 bg-white shadow-sm p-4">
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-start mb-4">
        <div>
          <h2 className="h5 mb-1">Técnicas</h2>
          <p className="text-muted mb-0">Busque, edite e exclua técnicas do catálogo.</p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Button variant="outline-primary" onClick={onCreate}>
            + Nova técnica
          </Button>
        </div>
      </div>

      <Form.Group className="mb-3" controlId="searchTechniques">
        <InputGroup>
          <Form.Control
            placeholder="Buscar técnica, categoria ou tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </InputGroup>
      </Form.Group>

      {pageItems.length === 0 ? (
        <EmptyState title="Nenhuma técnica encontrada" description="Ajuste o filtro ou adicione uma nova técnica para começar." />
      ) : (
        <div className="table-responsive">
          <Table hover borderless className="mb-0 align-middle">
            <thead>
              <tr>
                <th>Técnica</th>
                <th>Categoria</th>
                <th>Tags</th>
                <th style={{ width: 160 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((technique) => (
                <tr key={technique.id}>
                  <td>{technique.technique}</td>
                  <td><CategoryBadge category={technique.category} /></td>
                  <td>{technique.tags?.slice(0, 3).map((tag) => <span key={tag} className="badge bg-light text-dark me-1">#{tag}</span>)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline-secondary" onClick={() => onEdit(technique)}>
                        Editar
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => onDelete(technique)}>
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onChange={goToPage} />
    </div>
  );
}
