"use client";

import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";

export default function Home() {
  return (
    <main style={{ padding: "2rem 0" }}>
      <Container>
        <Card className="border-0 shadow-sm mt-3">
          <Card.Body className="p-4">
            <h1 className="h3 mb-3 fw-normal text-primary">Bem-vindo ao Guardian</h1>
            <p className="text-muted mb-4">
              Esta é uma plataforma de para consultar técnicas de jiu-jitsu, ela ainda está na versão beta, por isso digite nome da técnica ou a categoria.
            </p>
            <Form onSubmit={(e) => e.preventDefault()}>
              <InputGroup>
                <Form.Control
                  id="search"
                  placeholder="Digite o nome da técnica ou a categoria"
                  aria-label="Digite o nome da técnica ou a categoria"
                />
                <Button variant="primary" type="submit">
                  Pesquisar
                </Button>
              </InputGroup>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}
