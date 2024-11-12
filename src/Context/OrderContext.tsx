import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Order {
  id: string;
  totalAmount: number;
  dishes: { name: string; price: number }[];
}

interface OrderContextType {
  orders: Order[];
  addOrder: (dishes: { name: string; price: number }[], totalAmount: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (dishes: { name: string; price: number }[], totalAmount: number) => {
    const newOrder: Order = {
      id: uuidv4(),
      totalAmount,
      dishes,
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const value: OrderContextType = {
    orders,
    addOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder debe ser usado dentro de un OrderProvider");
  }
  return context;
};

export { OrderProvider, useOrder };
