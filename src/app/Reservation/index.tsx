import React, { useState } from "react"; // Import React and useState for managing component state
import { useForm } from "react-hook-form"; // Import useForm for form handling
import { z } from "zod"; // Import Zod for schema validation
import { zodResolver } from "@hookform/resolvers/zod"; // Import Zod resolver for integrating Zod with react-hook-form
import { useTable } from "@/Context/TableContext";
import { useOrder } from "@/Context/OrderContext";
import { useNavigate } from "react-router-dom";
import Header from "@/Components/Header";

// Define validation schema with Zod
const schema = z.object({
  date: z.string().min(1, "Fecha es requerida"), // Validate that date is a non-empty string
  time: z.string().min(1, "Hora es requerida"), // Validate that time is a non-empty string
  selectedDishes: z.array(z.string()).min(1, "Al menos un plato es requerido"), // Validate that at least one dish is selected
  selectedTable: z.number().min(1, "Por favor seleccione una mesa"), // Validate that a table is selected
});

// Define types for form data
type FormData = z.infer<typeof schema>; // Infer TypeScript types from the Zod schema

// Define props for Table component
interface TableProps {
  number: number; // Table number
  onSelect: (number: number) => void; // Function to handle table selection
  isSelected: boolean; // Boolean to indicate if the table is selected
}

// Table component to render individual tables
const Table: React.FC<TableProps> = ({ number, onSelect, isSelected }) => (
  <button
    onClick={() => onSelect(number)} // Call onSelect with the table number when clicked
    className={`w-40 h-40 border-2 rounded-lg transition-colors flex items-center justify-center ${
      isSelected ? "bg-green-200" : "border-green-600 hover:bg-green-50"
    }`} // Apply styles based on selection state
  >
    <span className="text-xl font-medium text-green-700">Mesa {number}</span>
  </button>
);

// ReservationForm component to handle the reservation process
const ReservationForm = () => {
  const context = useTable(); // Get table context
  const { addOrder } = useOrder(); // Get addOrder function and current orders from OrderContext

  if (!context) {
    throw new Error("useTable debe ser usado dentro de un TableProvider"); // Ensure context is available
  }

  const { availableDishes } = context; // Get available dishes from context
  const currentDate = new Date(); // Get current date
  const defaultDate = currentDate.toISOString().split("T")[0]; // Format default date for input
  const defaultTime = currentDate.toTimeString().split(" ")[0].slice(0, 5); // Format default time for input

  // Initialize form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema), // Use Zod for validation
    defaultValues: {
      date: defaultDate, // Set default date
      time: defaultTime, // Set default time
      selectedDishes: [], // Initialize selected dishes as empty
      selectedTable: 0, // Initialize selected table as 0
    },
  });

  const [showDateTime, setShowDateTime] = useState(false); // State to toggle date/time fields
  const [selectedTable, setSelectedTable] = useState<number | null>(null); // State to track

  // Function to extract dish names from an array of Dish objects
  // const orderFromDishes = (dishes: Dish[]): FormData["selectedDishes"] => {
  //   return dishes.map((dish) => dish.name); // Return an array of dish names
  // };

  // const totalAmount = selectedDishes.reduce((total, dishName) => {
  //   const dish = availableDishes.find((d) => d.name === dishName); // Find dish by name
  //   return total + (dish ? dish.price : 0); // Add dish price to total
  // }, 0); // Initialize total amount as 0

  const navigate = useNavigate(); // Initialize navigate for routing

  // Function to handle form submission
  const onSubmit = async (data: FormData) => {
    // Create an array of dish objects with name and price
    const dishDetailsFromData = data.selectedDishes.map((dishName) => {
      const dish = availableDishes.find((d) => d.name === dishName); // Find dish by name
      return {
        name: dishName, // Return dish name
        price: dish ? dish.price : 0, // Return dish price or 0 if not found
      };
    });
    // Calculate total amount
    const totalAmount = dishDetailsFromData.reduce(
      (total, dish) => total + dish.price,
      0
    );
    // Add order with dish details and total amount
    addOrder(dishDetailsFromData, totalAmount);
    // console.log(totalAmount,"TOTAL AMOUNT en reservation- submit")
    // Navigate to a success page or confirmation page
    navigate("/resume"); // Pass data to the next route
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
              setSelectedTable(tableNumber); // Set selected table
              setValue("selectedTable", tableNumber); // Update form value
            }}
            isSelected={selectedTable === number} // Check if table is selected
          />
        ))}
      </div>
      {/* Button to show date and time fields */}
      <button
        type="button"
        onClick={() => setShowDateTime(!showDateTime)} // Toggle date/time fields
        className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-green-700 font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
      >
        Hacer Reserva
      </button>
      {/* Reservation Form */}
      <form
        onSubmit={handleSubmit(onSubmit)} // Handle form submission
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
                {...register("date")} // Register date input
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
                {...register("time")} // Register time input
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
                  {...register("selectedDishes")} // Register dish selection
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

// Main Reservation component
const Reservation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ReservationForm />
    </div>
  );
};

export default Reservation; // Export Reservation component
