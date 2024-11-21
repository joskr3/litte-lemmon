import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  const register = async ({ nombre, password, email }: User) => {

    try {
      const userExists = registeredUsers.some(
        (user) => user.email === email || user.nombre === nombre
      );
      if (userExists) {
        throw new Error("El usuario ya existe");
      }

        const registerMutation = useMutation({
          mutationFn: async (userData: User) => {
            const response = await axios.post(`${API_URL}/register`, userData);
            return response.data;
          },
        });

        const response = await registerMutation.mutateAsync({
          nombre,
          password,
          email,
        });

        if (response.status === 201) {
          console.log("Usuario registrado exitosamente");
        } else {
          console.error("Error al registrar usuario:", response.statusText);
        }

        setRegisteredUsers([...registeredUsers, response.data]);
      
      setUser({ nombre, password, email });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  const login = async ({ nombre: username, password }: User) => {
    try {
      const loginQuery = useQuery({
        queryKey: ["login", { username, password }],
        queryFn: async () => {
          const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
          });
          return response.data;
        },
      });

      if (loginQuery.isSuccess) {
        setUser({ nombre: username, password });
      } else {
        console.error("Error al iniciar sesión:", loginQuery.error);
      }
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

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
