/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorBoundary = () => {


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-red-600">
            ¡Oops! Algo salió mal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Error : 404</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Página no encontrada
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
