'use client';

import Link from 'next/link';
import { Card, Badge } from 'react-bootstrap';
import { Technique } from '@/types';
import CategoryBadge from '@/components/CategoryBadge';
import TagList from '@/components/TagList';
import { truncateText } from '@/utils/formatters';

export default function TechniqueCard({ technique }: { technique: Technique }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      {technique.thumbnail ? (
        <Card.Img src={technique.thumbnail} alt={technique.technique} />
      ) : (
        <div className="bg-secondary bg-opacity-10 rounded-top d-flex align-items-center justify-content-center" style={{ minHeight: 180 }}>
          <Badge bg="secondary" className="text-uppercase fs-7 py-2 px-3">
            Sem imagem
          </Badge>
        </div>
      )}
      <Card.Body className="d-flex flex-column">
        <CategoryBadge category={technique.category} />
        <Card.Title className="mt-3">{technique.technique}</Card.Title>
        <Card.Text className="text-muted mb-3">{truncateText(technique.description || 'Descrição não disponível.', 100)}</Card.Text>
        <TagList tags={technique.tags ?? []} />
        <div className="mt-auto pt-3">
          <Link href={`/techniques/${technique.id}`} className="btn btn-primary w-100">
            Ver detalhes
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
