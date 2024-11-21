// import { initialDishes } from "@/Context/TableContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
// import { useOrder } from "@/Context/OrderContext";
import { Suspense } from "react";

interface DetalleProps {
  id?: string;
  nombre: string;
  precio?: string;
  imagen:string;
}
const DetalleFetch = () => {
  const { isPending, error, data } = useQuery<DetalleProps[]>({
    queryKey: ["queryDetalle"],
    queryFn: () =>
      fetch("http://localhost:8000/detalles").then((res) => res.json()),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="py-12 w-full bg-gray-50 dark:bg-gray-900">
      <div className="w-full justify-center mx-auto px-4">
        <div className="flex flex-wrap w-full  gap-8">
          <Suspense fallback={<div>Loading...</div>}>
            {data?.map(({ nombre, precio, id, imagen }: DetalleProps) => (
              <Card className="flex flex-col justify-center m-auto min-w-56 max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>{`${nombre} - $/. ${precio}`}</CardTitle>
                  <CardDescription>{id}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <img
                    src={imagen}
                    alt={nombre}
                    className="object-cover  max-h-28 max-w-36"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="register">Ver mas</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eum saepe fuga dolorum beatae nobis ut nemo sapiente ad
                        exercitationem? Obcaecati officiis accusantium vel iste,
                        libero rerum consectetur pariatur sint nesciunt.
                      </p>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

const Detalle = () => {
  //const tableContext = useTable(); // Get table context
  // const dishes = initialDishes;
  // const { orders } = useOrder();
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className=" mx-auto px-4">
        <div className="flex flex-wrap gap-8">
          { <DetalleFetch />}
        </div>
      </div>
    </section>
  );
};

export default Detalle;
