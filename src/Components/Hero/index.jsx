
import React from "react"
import { useNavigate } from "react-router-dom";

const HeroImage = () => {
    return (
        <div className="absolute inset-0">
            <img 
                src="postre.webp" 
                className="h-full w-full object-cover brightness-75" 
                alt="postre principal" 
            />
        </div>
    )
}

const HeroButton = () => {
    let navigate = useNavigate();
    return (
        <button 
            type="button" 
            className="bg-green-600 hover:bg-green-700 transition-colors rounded-lg text-white px-8 py-3 text-xl font-semibold shadow-lg hover:shadow-xl"
            onClick={() => {
                navigate("/reservation");
            }}
        >
            Reservar
        </button>
    )
}

const HeroContent = () => {
    return (
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-xl space-y-6">
                <h1 className="text-white text-5xl font-bold leading-tight">
                    Postres Saludables
                </h1>
                <p className="text-white/90 text-2xl">
                    Recomendacion
                </p>
                <HeroButton />
            </div>
        </div>
    )
}

const Hero = () => {
    return (
        <section className="relative h-[80vh] bg-gray-900">
            <HeroImage />
            <HeroContent />
        </section>
    )
}

export default Hero
