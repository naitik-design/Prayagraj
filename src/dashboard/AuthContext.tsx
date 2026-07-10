import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('hotel_admin_token') || sessionStorage.getItem('hotel_admin_token');
      if (token) {
        try {
          const res = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('hotel_admin_token');
            sessionStorage.removeItem('hotel_admin_token');
          }
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (token: string, remember: boolean) => {
    if (remember) {
      localStorage.setItem('hotel_admin_token', token);
    } else {
      sessionStorage.setItem('hotel_admin_token', token);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('hotel_admin_token');
    sessionStorage.removeItem('hotel_admin_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
