import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import {motion} from "motion/react"
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

 interface ImageHero{
  id: number;
  url: string;
  description: string;
}


export function CarouselHero() {
    const { isPending, error, data } = useQuery<ImageHero[]>({
      queryKey: ["queryHeroImages"],
      queryFn: () =>
        fetch(
          "http://localhost:8000/imagenes_hero"
        ).then((res) => res.json()),
    });

    if (isPending) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

  return (
    <div className="absolute inset-0">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <CarouselContent>
            {data.map((image) => (
              <CarouselItem key={image?.id}>
                <div className="p-1  max-h-[50dvh] w-full">
                  <img
                    src={
                    image?.url ?  image?.url : "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    }
                    className=" max-h-96 md:h-1/4 w-full object-cover brightness-75"
                    alt="postre principal"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Suspense>
      </Carousel>
    </div>
  );
}

const HeroButton = () => {
  let navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      type="button"
      className="bg-green-600 hover:bg-green-700 transition-colors rounded-lg text-white px-8 py-3 text-xl font-semibold shadow-lg hover:shadow-xl"
      onClick={() => {
        navigate("/reservation");
      }}
    >
      Reservar
    </motion.button>
  );
};

const HeroContent = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
      <div className="max-w-xl space-y-6">
        <h1 className="text-white text-5xl font-bold leading-tight">
          Postres Saludables
        </h1>
        <p className="text-white/90 text-2xl">Recomendacion</p>
        <HeroButton />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative ">
      <CarouselHero />
      <HeroContent />
    </section>
  );
};

export default Hero;
