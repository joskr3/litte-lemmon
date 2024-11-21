import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/Context/UserContexto";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

// Define validation schema with Zod
const schema = z.object({
  usuario: z.string().min(1, "Usuario es requerido"),
  password: z.string().min(1, "Contraseña es requerida"),
});

// Define types for form data
type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { login } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      login({
        nombre: data.usuario,
        password: data.password,
      })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error);
        })
        .finally(() => {
          console.log("Se ejecuto el Login");
        });
    } catch (err: any) {
      console.error(err);
    }
  };
  
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-green-700 ">
          Inicio de sesión
        </CardTitle>
        <CardDescription className="text-yellow-500">
          Ingresa tu usuario y contraseña para iniciar sesión.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="usuario" className="text-green-700">
                Usuario
              </Label>
              <Input
                id="usuario"
                type="text"
                placeholder=""
                className={cn({ "border-red-500": errors.usuario })}
                {...register("usuario")}
                required
              />
              {errors.usuario && (
                <p className="text-red-500 text-sm">{errors.usuario.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-green-700">
                  Password
                </Label>
                <Link
                  to="/"
                  className="ml-auto inline-block text-sm underline text-green-700"
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>
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
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-green-700">
          No tienes una cuenta?{" "}
          <Link to="/register" className="underline text-yellow-500">
            Registro
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
