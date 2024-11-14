import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContexto";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// Define the Header component
const Header: React.FC = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const LoginAndRegister = ({ mobile = false, desktop = false }) => {
    
    if (mobile && !isMenuOpen) return null;
    if (desktop && isMenuOpen) return null;
    
    return (
      <div
        className={cn(
          mobile ? "flex flex-col items-center" : "flex items-center space-x-4",
          desktop ? "hidden md:flex" : "md:hidden"
        )}
      >
        <Button variant="link" onClick={() => navigate("/login")}>
          Iniciar sesión
        </Button>
        <Button variant="register" onClick={() => navigate("/register")}>
          Registrarse
        </Button>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white w-full shadow-md dark:bg-gray-900">
      <nav className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu Icon */}
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 md:hidden dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <img src="menu.svg" alt="menu" className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              className="mr-4"
              onClick={() => navigate("/")}
            >
              <img src="logo.svg" alt="logo" className="h-8 sm:h-10" />
            </Button>
          </div>

          {/* Right side - Auth and Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button variant="ghost">
                  ¡Hola, {user.nombre}!
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff700"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate("/mis-pedidos")}
                >
                  Mis pedidos
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Salir
                </Button>
              </div>
            ) : (
              <LoginAndRegister  desktop/>
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
            {/* aqui iria un contenido que solo se muestta em mobile  */}
            <LoginAndRegister  mobile/>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
