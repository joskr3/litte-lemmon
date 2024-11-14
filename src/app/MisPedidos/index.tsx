import { useOrder } from "../../../Context/OrderContext"; // Import OrderContext
import { Link } from "react-router-dom";

const MisPedidos = () => {
  const { orders } = useOrder(); // Get orders from OrderContext

  return (
    <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-6">
        Mis Pedidos
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-700">
          No tienes pedidos realizados.
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border rounded-lg p-4">
              <h2 className="text-lg font-medium">Pedido ID: {order.id}</h2>
              <p className="text-gray-700">
                <strong>Total:</strong> ${order.totalAmount}
              </p>
              <h3 className="text-md font-medium">Platos:</h3>
              <ul className="list-disc pl-5">
                {order.dishes.map((dish, index) => (
                  <li key={index} className="text-gray-700">
                    {dish.name} - ${dish.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/"
        className="mt-4 w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-center inline-flex"
      >
        Volver a Inicio
      </Link>
    </div>
  );
};

export default MisPedidos;
