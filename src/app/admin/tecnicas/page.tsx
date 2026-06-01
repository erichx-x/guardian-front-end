'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/dashboard.module.css';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import tecStyles from './tecnicas.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const CATEGORIES = [
  'Quedas',
  'Defesas',
  'Raspagem',
  'Finalização',
  'Passagem',
  'Extras',
];

interface Technique {
  id: number;
  technique: string;
  category: string;
  description: string;
}

interface FormState {
  technique: string;
  category: string;
  description: string;
}

const EMPTY_FORM: FormState = { technique: '', category: '', description: '' };

type ModalMode = 'create' | 'edit';

export default function TecnicasPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ── Data ──────────────────────────────────────────────────────────────
  const [list, setList] = useState<Technique[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  // ── Modal ─────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // ── Delete confirm ────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<Technique | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Auth ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // ── Fetch list ────────────────────────────────────────────────────────
  const fetchList = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const res = await fetch(`${API_URL}/techniques`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setList(await res.json());
    } catch (err: unknown) {
      setListError(err instanceof Error ? err.message : 'Erro ao carregar técnicas.');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) fetchList();
  }, [isAuthorized, fetchList]);

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setFeedback(null);
    setModalMode('create');
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (item: Technique) => {
    setForm({ technique: item.technique, category: item.category, description: item.description });
    setFeedback(null);
    setModalMode('edit');
    setEditingId(item.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFeedback(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.technique.trim() || !form.category) {
      setFeedback({ type: 'error', msg: 'Nome e categoria são obrigatórios.' });
      return;
    }

    setSaving(true);
    try {
      const isEdit = modalMode === 'edit';
      const url = isEdit ? `${API_URL}/techniques/${editingId}` : `${API_URL}/techniques`;
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }

      const saved: Technique = await res.json();

      if (isEdit) {
        setList((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
      } else {
        setList((prev) => [saved, ...prev]);
      }

      setFeedback({
        type: 'success',
        msg: isEdit
          ? `Técnica "${saved.technique}" atualizada com sucesso!`
          : `Técnica "${saved.technique}" criada com sucesso!`,
      });
      setTimeout(() => setModalOpen(false), 900);
    } catch (err: unknown) {
      setFeedback({ type: 'error', msg: err instanceof Error ? err.message : 'Erro inesperado.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/techniques/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setList((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      // keep modal open so user can retry
    } finally {
      setDeleting(false);
    }
  };

  // ── Loading screen ────────────────────────────────────────────────────
  if (!isAuthorized) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f4f6f9',
        }}
      >
        <span className={tecStyles.spinner} aria-hidden="true" style={{ width: 28, height: 28, borderWidth: 3 }} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <AdminSidebar onLogout={handleLogout} />

      <div className={styles.main}>
        <AdminTopbar title="Técnicas" />

        <div className={styles.content}>
          {/* ── Page header ───────────────────────────────────── */}
          <div className={tecStyles.pageHeader}>
            <div>
              <h1 className={tecStyles.pageTitle}>Técnicas</h1>
              <p className={tecStyles.pageSubtitle}>Gerencie as técnicas cadastradas no sistema.</p>
            </div>
            <button id="btn-nova-tecnica" className={tecStyles.btnPrimary} onClick={openCreate}>
              + Nova Técnica
            </button>
          </div>

          {/* ── List card ─────────────────────────────────────── */}
          <div className={tecStyles.listCard}>
            {listLoading && (
              <div className={tecStyles.listState}>
                <span className={tecStyles.spinner} aria-hidden="true" style={{ borderTopColor: '#0d6efd' }} />
                <span>Carregando…</span>
              </div>
            )}

            {!listLoading && listError && (
              <div className={tecStyles.listState}>
                <span>⚠️ {listError}</span>
                <button className={tecStyles.btnSecondary} onClick={fetchList}>
                  Tentar novamente
                </button>
              </div>
            )}

            {!listLoading && !listError && list.length === 0 && (
              <div className={tecStyles.listState}>
                <span className={tecStyles.emptyIcon}>🥋</span>
                <p className={tecStyles.emptyText}>Nenhuma técnica cadastrada ainda.</p>
                <button id="btn-primeira-tecnica" className={tecStyles.btnPrimary} onClick={openCreate}>
                  Cadastrar primeira técnica
                </button>
              </div>
            )}

            {!listLoading && !listError && list.length > 0 && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Técnica</th>
                    <th>Categoria</th>
                    <th>Descrição</th>
                    <th style={{ textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className={tecStyles.techniqueName}>{item.technique}</span>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${tecStyles.categoryBadge}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className={tecStyles.descriptionCell}>
                        {item.description || <em style={{ color: '#adb5bd' }}>—</em>}
                      </td>
                      <td>
                        <div className={tecStyles.rowActions}>
                          <button
                            id={`btn-edit-${item.id}`}
                            className={tecStyles.iconBtn}
                            title="Editar"
                            onClick={() => openEdit(item)}
                          >
                            ✏️
                          </button>
                          <button
                            id={`btn-delete-${item.id}`}
                            className={`${tecStyles.iconBtn} ${tecStyles.iconBtnDanger}`}
                            title="Excluir"
                            onClick={() => setDeleteTarget(item)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          Create / Edit Modal
         ══════════════════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div className={tecStyles.modalOverlay} onClick={closeModal} role="dialog" aria-modal="true">
          <div className={tecStyles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={tecStyles.formCardHeader}>
              <span className={tecStyles.formCardIcon}>🥋</span>
              <h2 className={tecStyles.formCardTitle}>
                {modalMode === 'create' ? 'Nova Técnica' : 'Editar Técnica'}
              </h2>
              <button className={tecStyles.modalClose} onClick={closeModal} aria-label="Fechar">×</button>
            </div>

            <form onSubmit={handleSubmit} className={tecStyles.form} noValidate>
              {/* Nome */}
              <div className={tecStyles.fieldGroup}>
                <label htmlFor="technique" className={tecStyles.label}>
                  Nome <span className={tecStyles.required}>*</span>
                </label>
                <input
                  id="technique"
                  name="technique"
                  type="text"
                  className={tecStyles.input}
                  placeholder="Ex: O-soto-gari"
                  value={form.technique}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Categoria */}
              <div className={tecStyles.fieldGroup}>
                <label htmlFor="category" className={tecStyles.label}>
                  Categoria <span className={tecStyles.required}>*</span>
                </label>
                <div className={tecStyles.selectWrapper}>
                  <select
                    id="category"
                    name="category"
                    className={tecStyles.select}
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma categoria</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <span className={tecStyles.selectArrow}>▾</span>
                </div>
              </div>

              {/* Descrição */}
              <div className={tecStyles.fieldGroup}>
                <label htmlFor="description" className={tecStyles.label}>
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={tecStyles.textarea}
                  placeholder="Descreva a técnica em detalhes…"
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* Feedback */}
              {feedback && (
                <div
                  className={`${tecStyles.feedback} ${
                    feedback.type === 'success' ? tecStyles.feedbackSuccess : tecStyles.feedbackError
                  }`}
                >
                  {feedback.type === 'success' ? '✅' : '⚠️'} {feedback.msg}
                </div>
              )}

              {/* Actions */}
              <div className={tecStyles.actions}>
                <button
                  type="button"
                  id="btn-cancelar"
                  className={tecStyles.btnSecondary}
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  id="btn-salvar"
                  className={tecStyles.btnPrimary}
                  disabled={saving}
                >
                  {saving ? <span className={tecStyles.spinner} aria-hidden="true" /> : null}
                  {saving ? 'Salvando…' : modalMode === 'create' ? 'Criar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          Delete Confirm Modal
         ══════════════════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div className={tecStyles.modalOverlay} role="dialog" aria-modal="true">
          <div className={tecStyles.modalCard} style={{ maxWidth: 420 }}>
            <div className={tecStyles.formCardHeader}>
              <span className={tecStyles.formCardIcon}>⚠️</span>
              <h2 className={tecStyles.formCardTitle}>Confirmar exclusão</h2>
            </div>
            <div className={tecStyles.form}>
              <p style={{ margin: 0, color: '#495057', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Tem certeza que deseja excluir a técnica{' '}
                <strong>&quot;{deleteTarget.technique}&quot;</strong>? Esta ação não pode ser desfeita.
              </p>
              <div className={tecStyles.actions}>
                <button
                  id="btn-cancelar-exclusao"
                  className={tecStyles.btnSecondary}
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                >
                  Cancelar
                </button>
                <button
                  id="btn-confirmar-exclusao"
                  className={tecStyles.btnDanger}
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                >
                  {deleting ? <span className={tecStyles.spinner} aria-hidden="true" /> : null}
                  {deleting ? 'Excluindo…' : 'Excluir'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
