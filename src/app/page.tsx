'use client';

import Link from 'next/link';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import PublicLayout from '@/layouts/PublicLayout';
import SearchBar from '@/components/SearchBar';
import { CATEGORIES } from '@/utils/constants';

export default function Home() {
  return (
    <PublicLayout>
      <main className="py-5">
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={12}>
              <p className="text-uppercase text-primary fw-bold mb-2">Plataforma Guardian</p>
              <h1 className="display-6 fw-bold mb-4">A forma mais rápida de encontrar técnicas de Jiu-Jitsu.</h1>
              <p className="lead text-muted mb-4">
                Busque técnicas por nome, categoria ou tag. Todos os dados estão mockados localmente para uma evolução segura e pronta para produção.
              </p>
              <SearchBar />
            </Col>
            <Col lg={12}>
              <Card className="border-0 shadow-sm bg-soft p-4">
                <h2 className="h5 mb-3">Categorias rápidas</h2>
                <div className="d-flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <Button
                      key={category}
                      as={Link}
                      href={`/result?category=${encodeURIComponent(category)}`}
                      variant="outline-primary"
                      className="text-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </PublicLayout>
  );
}
