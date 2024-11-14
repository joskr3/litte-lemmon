import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface DetalleProps {
  id?: string;
  download_url: string;
  author: string;
}

function DetalleCard({ id, download_url, author }: DetalleProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{author}</CardTitle>
        <CardDescription>{id}</CardDescription>
      </CardHeader>
      <CardContent>
      <img src={download_url} alt={author} className="object-cover  *:h-48 w-96" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="register">Ver mas</Button>
      </CardFooter>
    </Card>
  );
}

const Detalle = () => {
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
          {data.map(({id,download_url,author}:DetalleProps) => (
            <DetalleCard key={id} download_url={download_url} author={author} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Detalle;
