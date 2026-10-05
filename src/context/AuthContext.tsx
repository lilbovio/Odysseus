import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  career: string;
  avatarUrl?: string;
  token?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, career?: string) => Promise<void>;
  logout: () => void;
  updateUserCareer: (career: string) => void;
}

const defaultUser: AuthUser = {
  id: 'usr-juan-01',
  name: 'Juan Pérez',
  email: 'juan.perez@universidad.edu.mx',
  career: 'Licenciatura en Derecho · 6to Semestre',
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  isAuthenticated: true,
  isLoading: false,
  login: async () => {},
  logout: () => {},
  updateUserCareer: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('odysseus_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultUser;
      }
    }
    return defaultUser;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('odysseus_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('odysseus_auth_user');
    }
  }, [user]);

  const login = async (email: string, career?: string) => {
    setIsLoading(true);
    // Simulated auth delay (Cognito Amplify/OAuth exchange stub)
    await new Promise((r) => setTimeout(r, 150));
    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ') || 'Estudiante',
      email,
      career: career || 'Licenciatura en Derecho · 6to Semestre',
      token: `cognito-mock-jwt-${Date.now()}`,
    };
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserCareer = (career: string) => {
    if (user) {
      setUser({ ...user, career });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
        updateUserCareer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
