import { LoginInput, loginSchema, SignupInput, signupSchema } from '@/schemas/auth.schema';
import { useAuthStore, User } from '@/stores/auth.store';
import React, { createContext, useCallback, useContext } from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, login: storeLogin, logout: storeLogout, signup: storeSignup } = useAuthStore();

  const login = useCallback(async (input: LoginInput) => {
    try {
      const validatedData = loginSchema.parse(input);
      // In a real app, you would make an API call here
      // For demo purposes, we'll just create a mock user
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email: validatedData.email,
      };
      storeLogin(mockUser);
    } catch (error) {
      throw error;
    }
  }, [storeLogin]);

  const signup = useCallback(async (input: SignupInput) => {
    try {
      const validatedData = signupSchema.parse(input);
      
      const mockUser: User = {
        id: '1',
        name: validatedData.name,
        email: validatedData.email,
      };
      storeSignup(mockUser);
    } catch (error) {
      throw error;
    }
  }, [storeSignup]);

  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
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