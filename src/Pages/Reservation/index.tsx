/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTable, Dish } from "../../Context/TableContext"; // Import Dish type
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";

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
  isSelected: boolean; // New prop to indicate if the table is selected
}

const Table: React.FC<TableProps> = ({ number, onSelect, isSelected }) => (
  <button
    onClick={() => {
      onSelect(number);
    }}
    className={`w-40 h-40 border-2 rounded-lg transition-colors flex items-center justify-center ${
      isSelected ? "bg-green-200" : "border-green-600 hover:bg-green-50"
    }`}
  >
    <span className="text-xl font-medium text-green-700">Mesa {number}</span>
  </button>
);

const ReservationForm = () => {
  const context = useTable();
  if (!context) {
    throw new Error("useTable debe ser usado dentro de un TableProvider");
  }
  const { availableDishes, makeReservation, user } = context; // Get user info from context
  const navigate = useNavigate();

  const currentDate = new Date();
  const defaultDate = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const defaultTime = currentDate.toTimeString().split(" ")[0].slice(0, 5); // Format: HH:MM

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

  const [showDateTime, setShowDateTime] = useState(false); // State to control visibility of date and time fields
  const [selectedTable, setSelectedTable] = useState<number | null>(null); // State to track selected table

  const onSubmit = async (data: FormData) => {
    try {
      const selectedDishes = data.selectedDishes
        .map((dishName) =>
          availableDishes.find((dish) => dish.name === dishName)
        )
        .filter((dish): dish is Dish => dish !== undefined); // Filter out undefined values

      if (selectedDishes.length === 0) {
        throw new Error("Plato no encontrado");
      }

      makeReservation(data.selectedTable, data.date, data.time, selectedDishes); // Pass array of selected dishes
      // Navigate to Resume page with reservation details
      navigate("/resume", {
        state: {
          date: data.date,
          time: data.time,
          selectedDishes,
          selectedTable,
          user,
        },
      }); // Pass user info
      // Reset form
      console.log(register, "REGISTRO");
      setValue("selectedTable", 0);
      setValue("date", "");
      setValue("time", "");
      setValue("selectedDishes", []);
    } catch (err) {
      console.error(err);
    }
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
            isSelected={selectedTable === number} // Pass selected state
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
      {showDateTime && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-md mx-auto mt-4"
        >
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
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 space-y-6"
          >
            Hacer Pedido
          </button>
        </form>
      )}
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
