import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTable } from '../../Context/TableContext';
import Header from '../../Components/Header';

// Define validation schema with Zod
const schema = z.object({
  date: z
    .date({
      required_error: "Por favor seleccione una fecha",
      invalid_type_error: "Por favor seleccione una fecha válida",
    })
    .min(new Date(), "La fecha no puede ser anterior a la actual")
    .refine((date) => date != null, {
      message: "Por favor seleccione una fecha",
    }),
  time: z.string().min(1, "Hora es requerida"),
  selectedDish: z.string().min(1, "Plato es requerido"),
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

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.selectedTable === null) {
      return; // Prevent submission if no table is selected
    }
    try {
      const selectedDish = availableDishes.find(dish => dish.name === data.selectedDish);
      if (!selectedDish) {
        throw new Error("Plato no encontrado");
      }
      makeReservation(data.selectedTable, data.date.toDateString() , data.time, selectedDish);
      alert('¡Reserva realizada con éxito!');
      // Reset form
      setValue("selectedTable", 0);
      setValue("date", 
        new Date().toISOString().split('T')[0] as unknown as Date,
       );
      setValue("time", '');
      setValue("selectedDish", '');
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
            Plato
          </label>
          <select
            {...register("selectedDish")}
            className={`w-full px-4 py-2 rounded-lg border ${errors.selectedDish ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          >
            <option value="">Seleccione un plato</option>
            {availableDishes.map((dish) => (
              <option key={dish.id} value={dish.name}>
                {dish.name} - ${dish.price}
              </option>
            ))}
          </select>
          {errors.selectedDish && <p className="text-red-500 text-sm">{errors.selectedDish.message}</p>}
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
