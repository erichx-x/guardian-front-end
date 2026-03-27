"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, Form, Button, InputGroup, ListGroup } from "react-bootstrap";
import techniquesData from "../../data/techniques.json";
import styles from "./page.module.css";

interface Technique {
  technique: string;
  category: string;
  description: string;
}

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [results, setResults] = useState<Technique[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const term = debouncedTerm.trim().toLowerCase();

    if (term.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const scoredTechniques = techniquesData.techniques.map((item) => {
      let score = 0;
      const title = (item.technique || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const cat = (item.category || "").toLowerCase();

      if (title.includes(term)) score += 100;
      if (cat.includes(term)) score += 80;
      if (desc.includes(term)) score += 50;

      return { item, score };
    });

    const filtered = scoredTechniques
      .filter((t) => t.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((t) => t.item);

    setResults(filtered);
    setShowDropdown(true);
  }, [debouncedTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      router.push(`/result?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowDropdown(false);
    }
  };

  return (
    <main style={{ padding: "2rem 0", height: "calc(100vh - 62px)" }}>
      <Container>
        <Card className="border-0 shadow-sm mt-3">
          <Card.Body className="p-4">
            <h1 className="h3 mb-3 fw-normal text-primary">Bem-vindo ao Guardian</h1>
            <p className="text-muted mb-4">
              Esta é uma plataforma de para consultar técnicas de jiu-jitsu, ela ainda está na versão beta, por isso digite nome da técnica ou a categoria.
            </p>
            <Form id="search-technique" onSubmit={handleSearchSubmit}>
              <div className="position-relative" ref={containerRef}>
                <InputGroup>
                  <Form.Control
                    id="search"
                    placeholder="Digite o nome da técnica ou a categoria"
                    aria-label="Digite o nome da técnica ou a categoria"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                      if (debouncedTerm.trim().length >= 2) setShowDropdown(true);
                    }}
                    autoComplete="off"
                  />
                  <Button variant="primary" type="submit">
                    Pesquisar
                  </Button>
                </InputGroup>

                {showDropdown && (
                  <div className={styles.autocompleteContainer}>
                    <ListGroup className="shadow">
                      {results.length > 0 ? (
                        results.map((tech, index) => (
                          <ListGroup.Item
                            key={index}
                            action
                            className={styles.dropdownItem}
                            onClick={() => {
                              setSearchTerm(tech.technique);
                              setShowDropdown(false);
                              router.push(`/detail?name=${encodeURIComponent(tech.technique)}`);
                            }}
                          >
                            <div className="d-flex flex-column">
                              <span className="fw-bold">{tech.technique}</span>
                              <small className="text-muted text-truncate w-100 d-inline-block">
                                {tech.category} {tech.description && `- ${tech.description}`}
                              </small>
                            </div>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <ListGroup.Item className={`text-muted text-center py-3 ${styles.dropdownItem}`}>
                          Nenhuma técnica encontrada
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </div>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}
