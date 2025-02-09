import { useState } from "react";
import NavLink from "./Navlink";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className="bg-white dark:bg-gray-900">
        <nav className="container mx-auto p-6 lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <div>
              <a
                className="text-2xl font-bold text-gray-700 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl"
                href="#"
              >
                CHI FOU MI
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute inset-x-0 z-20 w-full bg-white px-6 py-4 shadow-md transition-all duration-300 ease-in-out dark:bg-gray-900 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent ${
              isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
              <NavLink href="#">Créer une partie</NavLink>

              <NavLink href="#">Mes parties</NavLink>

              <NavLink to="/auth">Login</NavLink>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
