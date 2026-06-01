'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from 'react-bootstrap';
import PublicLayout from '@/layouts/PublicLayout';
import SearchBar from '@/components/SearchBar';
import TechniqueDetail from '@/components/TechniqueDetail';
import EmptyState from '@/components/EmptyState';
import { getTechniques } from '@/services/techniqueService';
import { Technique } from '@/types';

export default function DetailPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let canceled = false;
    if (!name) {
      setTechnique(null);
      return;
    }

    setLoading(true);
    getTechniques({ q: name, limit: 1 })
      .then((response) => {
        if (!canceled) {
          setTechnique(response.data[0] ?? null);
        }
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, [name]);

  return (
    <PublicLayout>
      <main className="py-5">
        <Container>
          <div className="mb-4">
            <SearchBar />
          </div>

          {loading ? (
            <EmptyState title="Carregando técnica..." description="Aguarde enquanto buscamos seu detalhe." />
          ) : technique ? (
            <TechniqueDetail technique={technique} />
          ) : (
            <EmptyState
              title="Técnica não encontrada"
              description="Use o campo de busca para procurar outra técnica ou navegue pela lista publicamente."
            />
          )}
        </Container>
      </main>
    </PublicLayout>
  );
}
