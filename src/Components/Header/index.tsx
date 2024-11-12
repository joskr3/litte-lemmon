import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContexto";

// Define the Header component
const Header: React.FC = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white w-full shadow-md dark:bg-gray-900">
      <nav className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu Icon */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 md:hidden dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <img src="menu.svg" alt="menu" className="h-6 w-6" />
            </button>
            <Link to="/" className="ml-4 md:ml-0">
              <img src="logo.svg" alt="logo" className="h-8 sm:h-10" />
            </Link>
          </div>

          {/* Right side - Auth and Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="hidden sm:block text-sm sm:text-base text-green-600 font-medium dark:text-green-400">
                  {user.nombre}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link
                  to="/login"
                  className="text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="ml-4 text-sm sm:text-base font-medium text-white bg-green-600 hover:bg-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
            <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <img
                src="cart.svg"
                alt="cart"
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && (
              <span className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200">
                {user.nombre}
              </span>
            )}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  Reserva
                </span>
              </div>
            </div>
            <Link
              to="/reservation"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-700"
            >
              Reservar Mesa
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
