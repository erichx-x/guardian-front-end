'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar, Container, Nav } from 'react-bootstrap';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/result?q=', label: 'Buscar' },
  { href: '/login', label: 'Login' },
  { href: '/admin', label: 'Admin' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <Navbar bg="primary" expand="lg" data-bs-theme="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} href="/" className="fw-bold text-white">
            Guardian
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="guardian-navbar" />
          <Navbar.Collapse id="guardian-navbar">
            <Nav className="ms-auto">
              {navLinks.map((item) => (
                <Nav.Link
                  as={Link}
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? 'active' : ''}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
