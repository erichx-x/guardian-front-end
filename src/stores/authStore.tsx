'use client';

import { createContext, useEffect, useMemo, useState } from 'react';
import { AuthUser, LoginCredentials } from '@/types';
import { getAuthUser, isAuthenticated, login as authLogin, logout as authLogout } from '@/services/authService';

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getAuthUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    const response = await authLogin(credentials);
    setUser(response.user);
    setLoading(false);
    return response.user;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user) && !loading,
      loading,
      login,
      logout,
    }),
    [loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
