/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTable, Dish } from '../../Context/TableContext'; // Import Dish type
import Header from '../../Components/Header';
import { useNavigate } from 'react-router-dom';

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
}

const Table: React.FC<TableProps> = ({ number, onSelect }) => (
  <button
    onClick={() => {
      onSelect(number);
      alert(`Mesa ${number} reservada`);
    }}
    className="w-40 h-40 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
  >
    <span className="text-xl font-medium text-green-700">Mesa {number}</span>
  </button>
);

const ReservationForm = () => {
  const context = useTable();
  if (!context) {
    throw new Error("useTable debe ser usado dentro de un TableProvider");
  }
  const { availableDishes, makeReservation } = context;
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.selectedTable === null) {
      return; // Prevent submission if no table is selected
    }
    try {
      const selectedDishes = data.selectedDishes.map(dishName => 
        availableDishes.find(dish => dish.name === dishName)
      ).filter((dish): dish is Dish => dish !== undefined); // Filter out undefined values

      if (selectedDishes.length === 0) {
        throw new Error("Plato no encontrado");
      }

      makeReservation(data.selectedTable, data.date, data.time, selectedDishes); // Pass array of selected dishes
      alert('¡Reserva realizada con éxito!');
      // Navigate to Resume page with reservation details
      navigate('/resume', { state: { date: data.date, time: data.time, selectedDishes, selectedTable: data.selectedTable } });
      // Reset form
      setValue("selectedTable", 0);
      setValue("date", '');
      setValue("time", '');
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
            onSelect={(tableNumber) => setValue("selectedTable", tableNumber)}
          />
        ))}
      </div>

      {/* Reservation Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            type="date"
            {...register("date")}
            className={`w-full px-4 py-2 rounded-lg border ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Hora
          </label>
          <input
            type="time"
            {...register("time")}
            className={`w-full px-4 py-2 rounded-lg border ${errors.time ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Platos
          </label>
          <select
            {...register("selectedDishes")}
            multiple
            className={`w-full px-4 py-2 rounded-lg border ${errors.selectedDishes ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          >
            {availableDishes.map((dish) => (
              <option key={dish.id} value={dish.name}>
                {dish.name} - ${dish.price}
              </option>
            ))}
          </select>
          {errors.selectedDishes && <p className="text-red-500 text-sm">{errors.selectedDishes.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Realizar Pedido
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
