import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../Context/UserContexto";
import Hlogin from "../../Components/HeaderLogin";

// Define validation schema with Zod
const schema = z
  .object({
    nombre: z.string().min(1, "Nombre es requerido"),
    email: z.string().email("Email no válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmar contraseña es requerido"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Define types for form data
type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { register: registerUser } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser({
        nombre: data.nombre,
        email: data.email,
        password: data.password,
      });
      navigate("/"); // Redirect to home after successful registration
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="nombre"
          >
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="nombre"
            {...register("nombre")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.nombre ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder="Ingrese su nombre de usuario"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder="Ingrese su email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder="Ingrese su contraseña"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            htmlFor="confirmPassword"
          >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder="Confirme su contraseña"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Registrarse
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </form>
  );
};

const Title = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-green-700 mb-2">Crear Cuenta</h1>
      <span className="text-3xl font-medium text-yellow-500">Little Lemon</span>
    </div>
  );
};

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Hlogin />
      <div className="max-w-md mx-auto space-y-8 mt-8">
        <Title />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
