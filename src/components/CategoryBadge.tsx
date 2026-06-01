import { Badge } from 'react-bootstrap';

const categoryVariant: Record<string, string> = {
  Quedas: 'info',
  Defesas: 'success',
  Raspagem: 'warning',
  Finalização: 'danger',
  Passagem: 'primary',
  Extras: 'secondary',
};

export default function CategoryBadge({ category }: { category: string }) {
  return (
    <Badge bg={categoryVariant[category] ?? 'secondary'} className="text-uppercase">
      {category}
    </Badge>
  );
}
