/* eslint-disable no-unused-vars */
import React from "react";

/* eslint-disable react/prop-types */
const MenuButton = (props) => {
    const { texto } = props;
    return (
        <button 
            type="button" 
            className="bg-green-600 hover:bg-green-700 transition-colors rounded-lg text-white px-6 py-3 text-lg font-medium shadow-md hover:shadow-lg flex-1 min-w-[200px] max-w-[280px]"
        >
            {texto}
        </button>
    );
};

const Menu = ({ options }) => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <nav className="flex flex-wrap justify-center gap-6">
                    {options.map(({ id, name }) => (
                        <MenuButton key={id} texto={name} />
                    ))}
                </nav>
            </div>
        </section>
    );
};

export default Menu;
