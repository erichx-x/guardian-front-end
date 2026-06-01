'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, InputGroup, ListGroup, Button, Spinner } from 'react-bootstrap';
import { searchTechniques } from '@/services/techniqueService';
import { useDebounce } from '@/hooks/useDebounce';
import styles from '@/styles/search.module.css';

export default function SearchBar() {
  const router = useRouter();
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedTerm = useDebounce(term, 300);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (debouncedTerm.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    let canceled = false;
    setLoading(true);

    searchTechniques(debouncedTerm)
      .then((response) => {
        if (!canceled) {
          setSuggestions(response.data.map((item) => item.technique));
          setShowDropdown(true);
        }
      })
      .catch(() => {
        if (!canceled) {
          setSuggestions([]);
          setShowDropdown(true);
        }
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, [debouncedTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    const sanitized = value.trim();
    if (!sanitized) return;
    router.push(`/result?q=${encodeURIComponent(sanitized)}`);
    setShowDropdown(false);
  };

  return (
    <div className="w-100" ref={containerRef}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch(term);
        }}
      >
        <InputGroup>
          <Form.Control
            type="search"
            placeholder="Digite o nome da técnica ou a categoria"
            aria-label="Buscar técnicas"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowDropdown(true);
              }
            }}
          />
          <Button type="submit" variant="primary">
            {loading ? <Spinner animation="border" size="sm" /> : 'Pesquisar'}
          </Button>
        </InputGroup>
      </Form>

      {showDropdown && (
        <div className={styles.autocompleteOverlay}>
          <ListGroup>
            {suggestions.length > 0 ? (
              suggestions.map((item) => (
                <ListGroup.Item
                  key={item}
                  action
                  onClick={() => handleSearch(item)}
                >
                  {item}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-muted">Nenhuma técnica encontrada</ListGroup.Item>
            )}
          </ListGroup>
        </div>
      )}
    </div>
  );
}
