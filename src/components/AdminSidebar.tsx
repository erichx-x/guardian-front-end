'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Nav } from 'react-bootstrap';
import styles from '@/styles/admin.module.css';

const navItems = [
  { label: 'Dashboard', href: '/admin', emoji: '📊' },
  { label: 'Técnicas', href: '/admin/tecnicas', emoji: '🥋' },
  { label: 'Usuários', href: '/admin/usuarios', emoji: '👥' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <strong>Guardian</strong>
      </div>
      <Nav className="flex-column">
        {navItems.map((item) => (
          <Nav.Link
            as={Link}
            href={item.href}
            key={item.href}
            className={pathname === item.href ? styles.sidebarLinkActive : styles.sidebarLink}
          >
            <span className="me-2">{item.emoji}</span>
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </aside>
  );
}
