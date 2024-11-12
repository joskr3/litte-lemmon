/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTable, Dish } from "../../Context/TableContext";
import Header from "../../Components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrder } from "../../Context/OrderContext";
import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
} from "../../utils/guardarEnLocalStorage";

// Define validation schema with Zod
const schema = z.object({
  date: z.string().min(1, "Fecha es requerida"),
  time: z.string().min(1, "Hora es requerida"),
  selectedDishes: z.array(z.string()).min(1, "Al menos un plato es requerido"),
  selectedTable: z.number().min(1, "Por favor seleccione una mesa"),
});

// Define types for form data
type FormData = z.infer<typeof schema>;

interface TableProps {
  number: number;
  onSelect: (number: number) => void;
  isSelected: boolean;
}

const Table: React.FC<TableProps> = ({ number, onSelect, isSelected }) => (
  <button
    onClick={() => onSelect(number)}
    className={`w-40 h-40 border-2 rounded-lg transition-colors flex items-center justify-center ${
      isSelected ? "bg-green-200" : "border-green-600 hover:bg-green-50"
    }`}
  >
    <span className="text-xl font-medium text-green-700">Mesa {number}</span>
  </button>
);

const ReservationForm = () => {
  const context = useTable();
  const { addOrder, orders } = useOrder();

  if (!context) {
    throw new Error("useTable debe ser usado dentro de un TableProvider");
  }

  const { availableDishes } = context;
  const location = useLocation();
  const currentDate = new Date();
  const defaultDate = currentDate.toISOString().split("T")[0];
  const defaultTime = currentDate.toTimeString().split(" ")[0].slice(0, 5);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: defaultDate,
      time: defaultTime,
      selectedDishes: [],
      selectedTable: 0,
    },
  });

  const [showDateTime, setShowDateTime] = useState(false);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  // const localStorageTotalAmount = +obtenerDeLocalStorage("totalAmount");
  // const totalAmount:number =
  //   location.state?.totalAmount || localStorageTotalAmount || 0;

  const orderFromDishes = (dishes: Dish[]): FormData["selectedDishes"] => {
    return dishes.map((dish) => dish.name);
  };

  const selectedDishes = orderFromDishes(
    location.state?.selectedDishes ||
      obtenerDeLocalStorage("selectedDishes") ||
      []
  );

  const totalAmountFromSelectedDishes = selectedDishes.reduce((total, dishName) => {
    const dish = availableDishes.find((d) => d.name === dishName);
    return total + (dish ? dish.price : 0);
  }, 0);

  const totalAmount:number = location.state?.totalAmount || totalAmountFromSelectedDishes || 0;

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const updatedOrders = [...orders, { ...data, totalAmount }];
    guardarEnLocalStorage("orders", updatedOrders);
    
    // Create an array of dish objects with name and price
    const dishDetailsFromData = data.selectedDishes.map((dishName) => {
      const dish = availableDishes.find((d) => d.name === dishName);
      return {
        name: dishName,
        price: dish ? dish.price : 0,
      };
    });

    // addOrder from data and totalAmount
    addOrder(dishDetailsFromData, totalAmount);
    
    // Navigate to a success page or confirmation page
    navigate('/resume',
      { state: { ...data, totalAmount, selectedDishes } }
    ); // Change '/success' to the desired route
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
        Reserva tu Mesa
      </h1>
      {/* Tables Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((number) => (
          <Table
            key={number}
            number={number}
            onSelect={(tableNumber) => {
              setSelectedTable(tableNumber);
              setValue("selectedTable", tableNumber);
            }}
            isSelected={selectedTable === number}
          />
        ))}
      </div>
      {/* Button to show date and time fields */}
      <button
        type="button"
        onClick={() => setShowDateTime(!showDateTime)}
        className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-green-700 font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
      >
        Hacer Reserva
      </button>
      {/* Reservation Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto mt-4"
      >
        {showDateTime && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                {...register("date")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hora
              </label>
              <input
                type="time"
                {...register("time")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.time ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time.message}</p>
              )}
            </div>
          </div>
        )}
        {/* Dish Selection */}
        <div className="space-y-6">
          <label className="text-4xl font-bold text-green-700 text-center m-auto space-y-6">
            Platos
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableDishes.map((dish) => (
              <div
                key={dish.id}
                className="border rounded-lg p-4 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  value={dish.name}
                  {...register("selectedDishes")}
                  className="mr-2"
                />
                <span>
                  {dish.name} - ${dish.price}
                </span>
              </div>
            ))}
          </div>
          {errors.selectedDishes && (
            <p className="text-red-500 text-sm">
              {errors.selectedDishes.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 space-y-4"
        >
          Hacer Pedido
        </button>
      </form>
    </div>
  );
};

const Reservation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ReservationForm />
    </div>
  );
};

export default Reservation;
