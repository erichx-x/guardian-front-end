'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/dashboard.module.css';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import tecStyles from './tecnicas.module.css';

const CATEGORIES = [
  'Quedas',
  'Defesas',
  'Raspagem',
  'Finalização',
  'Passagem',
  'Extras',
];

interface FormState {
  titulo: string;
  categoria: string;
  descricao: string;
}

const EMPTY_FORM: FormState = { titulo: '', categoria: '', descricao: '' };

export default function TecnicasPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFeedback(null);
  };

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setFeedback(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.titulo.trim() || !form.categoria) {
      setFeedback({ type: 'error', msg: 'Título e categoria são obrigatórios.' });
      return;
    }

    setLoading(true);
    try {
      // TODO: substituir pela chamada real à API
      await new Promise((res) => setTimeout(res, 800));
      console.log('Nova técnica:', form);
      setFeedback({ type: 'success', msg: `Técnica "${form.titulo}" criada com sucesso!` });
      setForm(EMPTY_FORM);
    } catch {
      setFeedback({ type: 'error', msg: 'Erro ao criar a técnica. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

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
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando…</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <AdminSidebar onLogout={handleLogout} />

      <div className={styles.main}>
        <AdminTopbar />

        <div className={styles.content}>
          {/* Page header */}
          <div className={tecStyles.pageHeader}>
            <div>
              <h1 className={tecStyles.pageTitle}>Técnicas</h1>
              <p className={tecStyles.pageSubtitle}>Cadastre uma nova técnica no sistema.</p>
            </div>
          </div>

          {/* Form card */}
          <div className={tecStyles.formCard}>
            <div className={tecStyles.formCardHeader}>
              <span className={tecStyles.formCardIcon}>🥋</span>
              <h2 className={tecStyles.formCardTitle}>Nova Técnica</h2>
            </div>

            <form onSubmit={handleSubmit} className={tecStyles.form} noValidate>
              {/* Título */}
              <div className={tecStyles.fieldGroup}>
                <label htmlFor="titulo" className={tecStyles.label}>
                  Título <span className={tecStyles.required}>*</span>
                </label>
                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  className={tecStyles.input}
                  placeholder="Ex: O-soto-gari"
                  value={form.titulo}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Categoria */}
              <div className={tecStyles.fieldGroup}>
                <label htmlFor="categoria" className={tecStyles.label}>
                  Categoria <span className={tecStyles.required}>*</span>
                </label>
                <div className={tecStyles.selectWrapper}>
                  <select
                    id="categoria"
                    name="categoria"
                    className={tecStyles.select}
                    value={form.categoria}
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
                <label htmlFor="descricao" className={tecStyles.label}>
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  className={tecStyles.textarea}
                  placeholder="Descreva a técnica em detalhes…"
                  rows={6}
                  value={form.descricao}
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
                  id="btn-limpar"
                  className={tecStyles.btnSecondary}
                  onClick={handleClear}
                  disabled={loading}
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  id="btn-criar"
                  className={tecStyles.btnPrimary}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={tecStyles.spinner} aria-hidden="true" />
                  ) : null}
                  {loading ? 'Criando…' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
