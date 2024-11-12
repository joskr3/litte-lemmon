import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  nombre: string;
  password: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: { nombre: string; password: string }) => boolean;
  logout: () => void;
  register: (userData: User) => boolean;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  const register = (userData: User): boolean => {
    if (!userData.nombre || !userData.password || !userData.email) {
      throw new Error("Todos los campos son requeridos");
    }

    // Check if user already exists
    const userExists = registeredUsers.some(
      (user) => user.email === userData.email || user.nombre === userData.nombre
    );

    if (userExists) {
      throw new Error("El usuario ya existe");
    }

    // Add new user to registered users
    setRegisteredUsers([...registeredUsers, userData]);

    // Automatically login after registration
    setUser(userData);
    return true;
  };

  const login = (userData: { nombre: string; password: string }): boolean => {
    if (!userData.nombre || !userData.password) {
      throw new Error("Usuario y contraseña son requeridos");
    }

    // Find user in registered users
    const foundUser = registeredUsers.find(
      (user) =>
        user.nombre === userData.nombre && user.password === userData.password
    );

    if (!foundUser) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    setUser(foundUser);
    return true;
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
