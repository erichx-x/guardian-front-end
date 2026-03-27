"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Card, Form, InputGroup } from "react-bootstrap";
import Link from "next/link";
import techniquesData from "../../../data/techniques.json";

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
      {/* Campo de Busca que imita o header estrutural do Layout */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-sm-3 p-2">
          <InputGroup id="search-form">
            <Form.Control
              type="text"
              placeholder="Digite o nome da técnica ou a categoria"
              readOnly
              className="bg-white border-end-0 border"
              style={{ cursor: "pointer", boxShadow: "none" }}
            />
            <InputGroup.Text className="bg-white border-start-0 border" style={{ cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6c757d" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </InputGroup.Text>
          </InputGroup>
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
