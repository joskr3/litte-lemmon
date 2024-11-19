import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import {motion} from "motion/react"

import { useNavigate } from "react-router-dom";

export function CarouselHero() {
  return (
    <div className="absolute inset-0">
      <Carousel
        className="h-[40dvh] w-full mx-auto  md:h-[50dvh]"
        opts={{
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1 h-full w-full">
                <img
                  src="postre.webp"
                  className="h-full md:h-1/4 w-full object-cover brightness-75"
                  alt="postre principal"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
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
