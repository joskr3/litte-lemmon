import { useLocation, Link } from 'react-router-dom';

interface Dish {
  name: string;
  price: number;
}

const Resume = () => {
  const location = useLocation();
  const { date, time, selectedDishes, selectedTable } = location.state || {};

  return (
    <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-6">Resumen de la Reserva</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">Detalles de la Reserva</h2>
          <p className="text-gray-700"><strong>Mesa:</strong> {selectedTable}</p>
          <p className="text-gray-700"><strong>Fecha:</strong> {date}</p>
          <p className="text-gray-700"><strong>Hora:</strong> {time}</p>
          <h3 className="text-lg font-medium">Platos Seleccionados:</h3>
          <ul className="list-disc pl-5">
            {selectedDishes.map((dish: Dish, index: number) => (
              <li key={index} className="text-gray-700">
                {dish.name} - ${dish.price}
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/payment" // Assuming there is a payment page
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-center block"
        >
          Ir a Pagar
        </Link>
      </div>
    </div>
  );
};

export default Resume;
