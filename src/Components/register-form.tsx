import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@/Context/UserContexto";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


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


const NewRegisterForm = () => {
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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-green-700 ">Registro</CardTitle>
        <CardDescription className="text-yellow-500">
          Ingresa tus nombres, correo y contraseña para crear una cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre" className="text-green-700">
                Nombres
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder=""
                className={cn({ "border-red-500": errors.nombre })}
                {...register("nombre")}
                required
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm">{errors.nombre.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-green-700">
                Correo
              </Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                className={cn({ "border-red-500": errors.email })}
                {...register("email")}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-green-700">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                className={cn({ "border-red-500": errors.password })}
                {...register("password")}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-green-700">
                Repetir Contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className={cn({ "border-red-500": errors.confirmPassword })}
                {...register("confirmPassword")}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-green-700">
          Ir al {" "}
          <Link to="/" className="underline text-yellow-500">
            inicio
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewRegisterForm;
