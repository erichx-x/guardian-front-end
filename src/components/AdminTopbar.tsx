'use client';

import styles from '@/app/admin/dashboard.module.css';

// ── SVG icon helpers ──────────────────────────────────────────────────────────
const Icon = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const Icons = {
  search: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
};

interface AdminTopbarProps {
  title?: string;
}

export default function AdminTopbar({ title = 'Dashboard' }: AdminTopbarProps) {
  return (
    <div className={styles.topbar}>
      <h1 className={styles.topbarTitle}>{title}</h1>
      <div className={styles.topbarActions}>
        
      </div>
    </div>
  );
}
