'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UserProfile {
  id: string;
  email: string;
  role: string;
  profile?: {
    fullName: string;
    department?: string;
    batch?: string;
    studentId?: string;
    company?: string;
    graduationYear?: string;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, logout: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
          // If we are on a protected route and unauthorized, redirect to login
          if (pathname.startsWith('/student') || pathname.startsWith('/alumni') || pathname.startsWith('/admin')) {
            router.push('/login');
          }
        }
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [pathname, router]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
