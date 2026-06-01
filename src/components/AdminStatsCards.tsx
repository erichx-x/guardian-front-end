'use client';

import { Card, Row, Col } from 'react-bootstrap';

export default function AdminStatsCards({
  totalTechniques,
  activeUsers,
  categories,
}: {
  totalTechniques: number;
  activeUsers: number;
  categories: number;
}) {
  const cards = [
    { label: 'Técnicas cadastradas', value: totalTechniques },
    { label: 'Usuários ativos', value: activeUsers },
    { label: 'Categorias', value: categories },
  ];

  return (
    <Row className="g-3">
      {cards.map((card) => (
        <Col key={card.label} xs={12} md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body>
              <p className="text-uppercase text-muted mb-2 small">{card.label}</p>
              <h3 className="mb-0">{card.value}</h3>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
