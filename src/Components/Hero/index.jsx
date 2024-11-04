/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const HeroImage = ({ image }) => {
    return (
        <div className="absolute inset-0">
            <img 
                src={image.src} 
                className="h-full w-full object-cover brightness-75" 
                alt={image.alt} 
            />
        </div>
    );
};

const HeroButton = () => {
    return (
        <button 
            type="button" 
            className="bg-green-600 hover:bg-green-700 transition-colors rounded-lg text-white px-8 py-3 text-xl font-semibold shadow-lg hover:shadow-xl"
        >
            Reservar
        </button>
    );
};

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
    );
};

const Hero = ({ image }) => {
    return (
        <section className="relative h-[80vh] bg-gray-900">
            <HeroImage image={image} />
            <HeroContent />
        </section>
    );
};

Hero.propTypes = {
    image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired
    }).isRequired
};

export default Hero;
