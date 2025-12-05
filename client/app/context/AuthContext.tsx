'use client';
import { createContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const tokenName = process.env.NEXT_PUBLIC_AUTH_TOKEN || 'auth_token';

// --- TYPES ---
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  idHome: number | null;
}

interface AuthContextType {
  authToken: string | null;
  authUser: User | null;
  authLoading: boolean;
  authLoginState: (token: string, user: User) => void;
  authLogoutState: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

// --- CONTEXT ---
export const AuthContext = createContext<AuthContextType | null>(null);

// --- PROVIDER ---
export function AuthProvider({ children }: ProviderProps) {
  const savedToken = Cookies.get(tokenName) ?? null;

  const [authToken, setAuthToken] = useState<string | null>(savedToken);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // LOGIN: save token + user in state and cookie
  const authLoginState = (token: string, user: User) => {
    setAuthToken(token);
    setAuthUser(user);
    Cookies.set(tokenName, token, { expires: 7 });
  };

  // LOGOUT: clear state + cookie
  const authLogoutState = () => {
    setAuthToken(null);
    setAuthUser(null);
    Cookies.remove(tokenName);
    toast.success('You have been logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        authUser,
        authLoading,
        authLoginState,
        authLogoutState,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
