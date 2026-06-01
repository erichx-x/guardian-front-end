'use client';

import { Card, Badge } from 'react-bootstrap';
import { Technique } from '@/types';
import CategoryBadge from '@/components/CategoryBadge';
import TagList from '@/components/TagList';

export default function TechniqueDetail({ technique }: { technique: Technique }) {
  return (
    <Card className="shadow-sm border-0">
      {technique.video ? (
        <div className="ratio ratio-16x9">
          <iframe
            src={technique.video}
            title={technique.technique}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="bg-dark bg-opacity-10 rounded-top d-flex align-items-center justify-content-center" style={{ minHeight: 260 }}>
          <Badge bg="dark" className="text-uppercase fs-7 py-2 px-3">
            Sem vídeo disponível
          </Badge>
        </div>
      )}

      <Card.Body>
        <CategoryBadge category={technique.category} />
        <Card.Title className="mt-3 mb-2">{technique.technique}</Card.Title>
        <Card.Text className="text-muted mb-4">{technique.description || 'Esta técnica ainda não possui uma descrição detalhada.'}</Card.Text>
        <TagList tags={technique.tags ?? []} />
      </Card.Body>
    </Card>
  );
}
