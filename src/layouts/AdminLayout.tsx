'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import LoadingSpinner from '@/components/LoadingSpinner';
import styles from '@/styles/admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !user) {
    return (
      <div className={styles.authFallback}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.adminWrapper}>
      <AdminSidebar />
      <div className={styles.adminMain}>
        <AdminTopbar user={user} onLogout={logout} />
        <div className={styles.adminContent}>{children}</div>
      </div>
    </div>
  );
}
