'use client';

import styles from '@/app/admin/dashboard.module.css';

const navItems = [
  { label: 'Técnicas', href: '/admin/tecnicas' },
  { label: 'Usuários', href: '/admin/usuarios' },
];

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  return (
    <nav className={styles.sidebar}>
      {/* Primary nav */}
      <ul className={styles.sidebarNav}>
        {navItems.map((item) => (
          <li key={item.label}>
            <a href={item.href} className={styles.sidebarItem} title={item.label}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <button
          className={styles.sidebarItem}
          onClick={onLogout}
          title="Sign out"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
