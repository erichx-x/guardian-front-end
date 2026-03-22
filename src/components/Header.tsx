"use client";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <Navbar bg="primary" expand="lg" data-bs-theme="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2 fw-bold text-white fs-4">
            Guardian
            <div className="d-flex align-items-center">
              <Image
                src="/logo-192x192.png"
                alt="Guardian Logo"
                width={32}
                height={32}
              />
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}
