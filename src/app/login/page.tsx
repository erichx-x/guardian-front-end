'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '@/hooks/useAuth';
import PublicLayout from '@/layouts/PublicLayout';

export default function LoginPage() {
  const { isAuthenticated, login, loading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ username, password });
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao autenticar');
    }
  };

  return (
    <PublicLayout>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="bg-primary text-white text-center py-4">
                <h2 className="mb-0 fw-bold">Login</h2>
                <p className="mb-0 text-white-50">Acesse o painel administrativo</p>
              </div>
              <Card.Body className="p-5 bg-white">
                {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Label className="fw-semibold text-secondary">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="p-3 bg-light border-0 shadow-sm"
                    />
                  </Form.Group>

                  <Form.Group className="mb-5" controlId="formPassword">
                    <Form.Label className="fw-semibold text-secondary">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="admin"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="p-3 bg-light border-0 shadow-sm"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 p-3 fw-bold rounded-3 shadow" disabled={loading}>
                    {loading ? 'Entrando…' : 'Entrar'}
                  </Button>
                  
                  <div className="text-center mt-4">
                    <small className="text-muted">Use <strong>admin/admin</strong>, <strong>editor/editor</strong> ou <strong>user/user</strong>.</small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
}
