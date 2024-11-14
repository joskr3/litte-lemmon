/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Headerlogin: React.FC = () => {
  let navigate = useNavigate();
  return (
    <header className="sticky z-50 top-0 bg-white shadow-sm dark:bg-gray-900">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-600 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg px-2 py-1 md:hidden"
        >
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          <span className="text-sm font-medium">Atrás</span>
        </button>
        
        <Link to="/" className="cursor-pointer">
          <img src="logo.svg" alt="logo" className="h-8 sm:h-10" />
        </Link>
        
        <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <img
            src="cart.svg"
            alt="cart"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Headerlogin;
