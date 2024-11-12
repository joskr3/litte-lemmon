import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define validation schema with Zod
const schema = z.object({
  cardNumber: z.string().min(1, "Número de tarjeta es requerido"),
  cardholderName: z.string().min(1, "Nombre del titular es requerido"),
  expirationDate: z.string().min(1, "Fecha de expiración es requerida"),
  cvv: z.string().min(1, "CVV es requerido"),
});

type FormData = z.infer<typeof schema>;

const Payment = () => {
  const location = useLocation();
  const { selectedDishes } = location.state || {};
  const totalAmount = selectedDishes ? selectedDishes.reduce((total: number, dish: { price: number }) => total + dish.price, 0) : 0;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle payment processing here
    console.log("Payment Data:", data);
    alert(`Pago realizado con éxito por un total de $${totalAmount}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-6">Pago</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
          <input
            type="text"
            {...register("cardNumber")}
            className={`w-full px-4 py-2 rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Nombre del Titular</label>
          <input
            type="text"
            {...register("cardholderName")}
            className={`w-full px-4 py-2 rounded-lg border ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
          <input
            type="text"
            {...register("expirationDate")}
            placeholder="MM/AA"
            className={`w-full px-4 py-2 rounded-lg border ${errors.expirationDate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            {...register("cvv")}
            className={`w-full px-4 py-2 rounded-lg border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          />
          {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
        </div>

        <div className="text-center">
          <p className="text-lg font-medium">Total a Pagar: ${totalAmount}</p>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Pagar
        </button>
      </form>
    </div>
  );
};

export default Payment;
