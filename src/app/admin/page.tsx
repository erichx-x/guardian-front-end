'use client';

import { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { getTechniques } from '@/services/techniqueService';
import { getUsers } from '@/services/userService';
import AdminStatsCards from '@/components/AdminStatsCards';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminPage() {
  const [techniqueCount, setTechniqueCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const techniquesResponse = await getTechniques({ limit: 1000 });
        const users = await getUsers();
        setTechniqueCount(techniquesResponse.total ?? techniquesResponse.data.length);
        setUserCount(users.length);
        setCategoryCount(new Set(techniquesResponse.data.map((tech) => tech.category)).size);
      } catch {
        setError('Não foi possível carregar os dados do painel.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <EmptyState title="Erro ao carregar painel" description={error} />;
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1 className="h4">Dashboard</h1>
        <p className="text-muted">Visão geral do Guardian e seus dados principais.</p>
      </div>

      <AdminStatsCards totalTechniques={techniqueCount} activeUsers={userCount} categories={categoryCount} />

      <Card className="mt-4 border-0 shadow-sm">
        <Card.Body>
          <h2 className="h5 mb-3">Atividade rápida</h2>
          <p className="text-muted mb-0">
            Use as seções de Técnicas e Usuários para manter o catálogo atualizado e o acesso do time sob controle.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
