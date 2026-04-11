'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Simple local authentication check
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  // Prevent flashing of admin content while checking authentication
  if (!isAuthorized) {
    return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ minHeight: '80vh' }}>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="fw-bold mb-0">Admin Dashboard</h1>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={handleLogout} className="fw-bold px-4 py-2 rounded-3 shadow-sm">
            Logout
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm border-0 rounded-4">
            <Card.Body className="p-4 d-flex flex-column">
              <h5 className="fw-bold text-primary mb-3">System Status</h5>
              <p className="text-muted flex-grow-1">The system is running smoothly with no errors reported.</p>
              <div>
                <Badge bg="success" className="p-2 px-3 rounded-pill">All Systems Operational</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8} className="mb-4">
          <Card className="h-100 shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <h3 className="fw-bold mb-3">Welcome back, Admin!</h3>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                This is a protected area. You have successfully authenticated locally.
                Variables and logic have been maintained in English as requested.
              </p>
              
              <div className="p-4 bg-light rounded-4 border-start border-4 border-primary">
                <h5 className="fw-bold mt-0">Quick Options</h5>
                <ul className="mb-0 text-muted">
                  <li className="mb-2">Manage Users (Pending Implementation)</li>
                  <li className="mb-2">View Analytics (Pending Implementation)</li>
                  <li>System Settings (Pending Implementation)</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
