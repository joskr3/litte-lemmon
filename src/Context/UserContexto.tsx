import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:8000";

interface User {
  nombre: string;
  password: string;
  email?: string;
}

interface UserContextType {
  user: User | null;
  logout: () => void;
  register: (userData: User) => Promise<void>;
  login: (userData: User) => Promise<void>;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerMutation = useMutation({
    mutationFn: async (userData: User) => {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (userData: { username: string; password: string }) => {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    },
  });

  const register = async (userData: User) => {
    try {
      await registerMutation.mutateAsync(userData);
      setUser(userData);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  const login = async ({ nombre: username, password }: User) => {
    try {
      await loginMutation.mutateAsync({ username, password });
      setUser({ nombre: username, password });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = (): void => {
    setUser(null);
  };

  const value: UserContextType = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
