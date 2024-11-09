/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import React from "react";
// import useFetch from "../../hooks/useFetch";

const Card = ({ url = "", texto = "" }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            alt="Plato"
            src={url}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            {texto}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Descubre esta deliciosa opción preparada con los mejores
            ingredientes.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-auto self-start">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

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
        <div className="grid gap-8">
          {data.map((obj) => (
            <Card key={obj.id} url={obj.download_url} texto={obj.author} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Detalle;
