import { notFound } from 'next/navigation';
import { getTechniqueById } from '@/services/techniqueService';
import PublicLayout from '@/layouts/PublicLayout';
import TechniqueDetail from '@/components/TechniqueDetail';
import { Container } from 'react-bootstrap';

type Params = {
  params: {
    id: string;
  };
};

export default async function TechniqueDetailPage({ params }: Params) {
  const technique = await getTechniqueById(params.id);

  if (!technique) {
    notFound();
  }

  return (
    <PublicLayout>
      <main className="py-5">
        <Container>
          <TechniqueDetail technique={technique} />
        </Container>
      </main>
    </PublicLayout>
  );
}
