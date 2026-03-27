"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Card } from "react-bootstrap";
import techniquesData from "../../../data/techniques.json";
import SearchForm from "../../components/SearchForm";

function DetailContent() {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name");

  // Dados padrão caso nada seja encontrado, igual ao mockup visual
  const defaultTechnique = {
    technique: "Omoplata - Segurando na faixa e passando pelas pernas",
    category: "Defesas",
    description: "Ao inicio do golpe do adversário segure na sua propra faixa ou por dentro da perna do adversário antes que ele conclua o movimento saia por baixo das pernas dele estourando na levantada, a perna o posta que segura a faixa é estendida e usada de apoio para ter base e levantar o proprio corpo."
  };

  const matchedTechnique = nameParam
    ? techniquesData.techniques.find(t => t.technique.toLowerCase() === nameParam.toLowerCase())
    : null;

  const technique = matchedTechnique || defaultTechnique;

  return (
    <Container className="py-4">
      {/* Campo de Busca independent component */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-sm-3 p-2">
          <SearchForm />
        </Card.Body>
      </Card>

      {/* Card principal com os detalhes da técnica */}
      <Card className="shadow-sm border-0 p-2">
        <Card.Body>
          <h1 className="h4 fw-bold mb-4" style={{ color: "#333" }}>{technique.technique}</h1>

          <h5 className="h6 fw-bold mb-1" style={{ color: "#6c757d" }}>Categoria:</h5>
          <p className="text-muted mb-4 fs-6">{technique.category}</p>

          <h5 className="h6 fw-bold mb-1" style={{ color: "#6c757d" }}>Descrição:</h5>
          <p className="text-muted fs-6" style={{ lineHeight: "1.6" }}>{technique.description}</p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default function DetailPage() {
  return (
    <main style={{ backgroundColor: "#fbfcfd", minHeight: "calc(100vh - 62px)", padding: "1rem 0" }}>
      <Suspense fallback={
        <Container className="py-4 text-center text-muted">Carregando...</Container>
      }>
        <DetailContent />
      </Suspense>
    </main>
  );
}
