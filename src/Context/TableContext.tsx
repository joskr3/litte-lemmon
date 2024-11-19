// @ts-nocheck
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useUser } from "./UserContexto.tsx"; // Import UserContext

// Define interfaces
export interface Dish { // Exporting Dish interface
  id: number;
  name: string;
  price: number;
  download_url?:string
}

interface Reservation {
  id: number;
  userId: string;
  tableNumber: number;
  date: string;
  time: string;
  dishes: Dish[]; // Changed to an array of dishes
  createdAt: string;
}

interface TableContextValue {
  reservations: Reservation[];
  availableDishes: Dish[];
  makeReservation: (
    tableNumber: number,
    date: string,
    time: string,
    selectedDishes: Dish[] // Changed to accept an array of dishes
  ) => Reservation;
  getUserReservations: () => Reservation[];
}

const TableContext = createContext<TableContextValue | null>(null);

export const initialDishes: Dish[] = [
  {
    id: 1,
    name: "Pasta Carbonara",
    price: 15.99,
    download_url:
      "https://cdn.pixabay.com/photo/2015/04/08/13/13/pasta-712664_1280.jpg",
  },
  {
    id: 2,
    name: "Salmon a la Parrilla",
    price: 22.99,
    download_url:
      "https://cdn.pixabay.com/photo/2020/04/27/05/52/salmon-5098232_1280.jpg",
  },
  {
    id: 3,
    name: "Ensalada César",
    price: 12.99,
    download_url : "https://cdn.pixabay.com/photo/2017/04/18/05/05/suppresses-2237785_1280.jpg",
  },
  {
    id: 4,
    name: "Risotto de Champiñones",
    price: 18.99,
    download_url : "https://cdn.pixabay.com/photo/2020/01/15/00/28/champignon-4766607_1280.jpg",
  },
  {
    id: 5,
    name: "Pollo al Limón",
    price: 16.99,
    download_url : "https://cdn.pixabay.com/photo/2017/07/16/12/39/chicken-2509164_1280.jpg",
  },
];

const TableProvider = ({ children }) => {
  const { user } = useUser(); // Get user info from UserContext
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [availableDishes] = useState<Dish[]>(initialDishes);

  const makeReservation = (
    tableNumber: number,
    date: string,
    time: string,
    selectedDishes: Dish[] // Accept an array of dishes
  ): Reservation => {
    if (!user) {
      throw new Error("Debe iniciar sesión para hacer una reserva");
    }

    const newReservation: Reservation = {
      id: Date.now(),
      userId: user.nombre,
      tableNumber,
      date,
      time,
      dishes: selectedDishes, // Store the array of dishes
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [...prev, newReservation]);
    return newReservation;
  };

  const getUserReservations = (): Reservation[] => {
    if (!user) return [];
    return reservations.filter((res) => res.userId === user.nombre);
  };

  const value: TableContextValue = {
    reservations,
    availableDishes,
    makeReservation,
    getUserReservations,
  };

  const Provider = TableContext.Provider;
  return <Provider value={value}>{children}</Provider>;
};

const useTable = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTable debe ser usado dentro de un TableProvider");
  }
  return context;
};

export { TableProvider, useTable };
