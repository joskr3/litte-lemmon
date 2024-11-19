import { initialDishes, useTable } from "@/Context/TableContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { useOrder } from "@/Context/OrderContext";

interface DetalleProps {
  id?: string;
  download_url: string;
  name: string;
}
interface DetalleFetchProps {
  id?: string;
  download_url: string;
  author: string;
}

function DetalleCard({ id, download_url, name }: DetalleProps) {
  return (
    <Card className="flex flex-col justify-center m-auto min-h-12 max-w-44">
      <CardHeader>
        <CardTitle >{name}</CardTitle>
        <CardDescription>{id}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <img
          src={download_url}
          alt={name}
          className="object-cover  max-h-28 max-w-36"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="register">Ver mas</Button>
      </CardFooter>
    </Card>
  );
}

function DetalleFetchCard({ id, download_url, author }: DetalleFetchProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{author}</CardTitle>
        <CardDescription>{id}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={download_url}
          alt={author}
          className="object-cover  *:h-48 w-96"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="register">Ver mas</Button>
      </CardFooter>
    </Card>
  );
}

const DetalleFetch = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["queryFotos"],
    queryFn: () =>
      fetch("https://picsum.photos/v2/list").then((res) => res.json()),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map(({ id, download_url, author }: DetalleFetchProps) => (
            <DetalleFetchCard
              key={id}
              download_url={download_url}
              author={author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Detalle = () => {
  //const tableContext = useTable(); // Get table context
  const dishes = initialDishes;
  const { orders } = useOrder();
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {orders &&
            dishes?.map((dish) => (
              <DetalleCard
                key={dish?.id}
                download_url={dish?.download_url || ""}
                name={dish?.name}
              />
            ))}
          {!orders && <DetalleFetch />}
        </div>
      </div>
    </section>
  );
};

export default Detalle;
