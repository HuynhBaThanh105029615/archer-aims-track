import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'archer' | 'recorder' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('archery_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Demo users with different roles
    let mockUser: User;
    if (email === 'archer@demo.com') {
      mockUser = { id: '1', name: 'John Archer', email, role: 'archer' };
    } else if (email === 'recorder@demo.com') {
      mockUser = { id: '2', name: 'Sarah Recorder', email, role: 'recorder' };
    } else if (email === 'admin@demo.com') {
      mockUser = { id: '3', name: 'Mike Admin', email, role: 'admin' };
    } else {
      mockUser = { id: '4', name: 'Demo User', email, role: 'archer' };
    }
    
    setUser(mockUser);
    localStorage.setItem('archery_user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = { id: Date.now().toString(), name, email, role: 'archer' };
    setUser(newUser);
    localStorage.setItem('archery_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('archery_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
