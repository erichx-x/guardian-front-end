'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import PublicLayout from '@/layouts/PublicLayout';
import SearchBar from '@/components/SearchBar';
import TechniqueCard from '@/components/TechniqueCard';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';
import { useSearchResults } from '@/features/search/useSearchResults';
import { CATEGORIES, PAGE_SIZE_PUBLIC } from '@/utils/constants';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const [page, setPage] = useState(1);
  const { loading, error, results, total } = useSearchResults(query, {
    category,
    page,
    limit: PAGE_SIZE_PUBLIC,
  });

  useEffect(() => {
    setPage(1);
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE_PUBLIC));
  const pageTitle = query ? `Resultados para “${query}”` : category ? `Categoria: ${category}` : 'Todas as técnicas';

  return (
    <PublicLayout>
      <main className="py-5">
        <Container>
          <div className="mb-4">
            <SearchBar />
          </div>

          <div className="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-4">
            <div>
              <h1 className="h4 mb-2">{pageTitle}</h1>
              <p className="text-muted mb-0">{total} técnica(s) encontrada(s).</p>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Button variant={category === '' ? 'primary' : 'outline-primary'} size="sm" onClick={() => router.push('/result')}>
                Todas
              </Button>
              {CATEGORIES.map((item) => (
                <Button
                  key={item}
                  variant={item === category ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => router.push(`/result?category=${encodeURIComponent(item)}`)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <EmptyState title="Carregando resultados..." description="Aguarde enquanto buscamos as técnicas." />
          ) : error ? (
            <EmptyState title="Ocorreu um erro" description={error} />
          ) : results.length === 0 ? (
            <EmptyState title="Nenhuma técnica encontrada" description="Tente outro termo de busca ou categoria." />
          ) : (
            <>
              <Row className="g-4">
                {results.map((technique) => (
                  <Col xs={12} md={6} lg={4} key={technique.id}>
                    <TechniqueCard technique={technique} />
                  </Col>
                ))}
              </Row>
              <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </Container>
      </main>
    </PublicLayout>
  );
}
