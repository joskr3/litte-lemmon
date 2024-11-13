import { useOrder } from "@/Context/OrderContext";
import { useUser } from "@/Context/UserContexto";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  totalAmount: number;
  dishes: { name: string; price: number }[];
}

const Resume = () => {
  const { user } = useUser();
  const { orders } = useOrder();
  // const location = useLocation();
  // const selectedDishes = location.state?.selectedDishes || [];
  const currentUser = user?.nombre || "";

  const DisplayOrders = () => {
    return (
      <div className="flex flex-col gap-4">
        {orders.map((order: Order) => (
          <div key={order.id} className="border p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold">Pedido #{order.id}</p>
            <p className="text-gray-600">Total: ${order.totalAmount}</p>
            <ul className="list-disc pl-6">
              {order.dishes.map((dish, index) => (
                <li key={index}>
                  {dish.name} - ${dish.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };


  const IrAlPago = () => {
    return (
      <Link to="/payment" className="mt-4 text-blue-500 hover:underline">
        Ir al pago
      </Link>
    );
  };

  const IraHome = () => {
    return (
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Volver al inicio
      </Link>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Resumen de Pedidos</h1>
      {currentUser ? (
        <>
          <p className="text-lg mb-2">Usuario: {currentUser}</p>
          <DisplayOrders />
        </>
      ) : (
        <>
          <p className="text-lg mb-2">Usuario no autenticado</p>
          {/* <DisplaySelectedDishes /> */}
        </>
      )}
      {/* {selectedDishes.length > 0 && <IrAlPago />} */}
      <div className="mt-4 mx-4  gap-4 inline-flex ">
        <IrAlPago />
        <IraHome />
      </div>
    </div>
  );
};

export default Resume;
