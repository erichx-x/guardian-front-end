"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import techniquesData from "../../../data/techniques.json";

function ResultContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length < 2) return [];

    const scoredTechniques = techniquesData.techniques.map((item) => {
      let score = 0;
      const title = (item.technique || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const cat = (item.category || "").toLowerCase();

      // Similar scoring behavior mapping matching logic
      if (title.includes(term)) score += 100;
      if (cat.includes(term)) score += 80;
      if (desc.includes(term)) score += 50;

      return { item, score };
    });

    return scoredTechniques
      .filter((t) => t.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((t) => t.item);
  }, [query]);

  return (
    <Container className="py-4">
      <h4 className="mb-4 fw-bold" style={{ color: "#2d3748" }}>
        Resultado de {query}
      </h4>

      {results.length > 0 ? (
        <Row className="g-4">
          {results.map((tech, idx) => (
            <Col xs={12} md={6} lg={4} key={idx}>
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "0.5rem" }}>
                <Card.Body className="d-flex flex-column p-4">
                  <h4 className="fw-bold mb-1" style={{ color: "#212529", fontSize: "1.25rem" }}>
                    {tech.technique}
                  </h4>
                  <h6 className="text-secondary mb-3">{tech.category}</h6>
                  
                  <p 
                    className="text-secondary mb-4" 
                    style={{ 
                      lineHeight: "1.6",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {tech.description || "Some quick example text to build on the card title and make up the bulk of the card's content."}
                  </p>

                  <div className="mt-auto">
                    <Link 
                      href={`/detail?name=${encodeURIComponent(tech.technique)}`}
                      className="text-decoration-none"
                      style={{ color: "#0d6efd", fontWeight: "500" }}
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4 text-center text-muted">
            <p className="mb-0 fs-5">Nenhuma técnica encontrada para &quot;{query}&quot;.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default function ResultPage() {
  return (
    <main style={{ backgroundColor: "#fbfcfd", minHeight: "calc(100vh - 62px)" }}>
      <Suspense fallback={<Container className="py-4 text-center text-muted">Carregando...</Container>}>
        <ResultContent />
      </Suspense>
    </main>
  );
}
