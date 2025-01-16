import Link from 'next/link';
import { FaChartBar } from 'react-icons/fa'; // Asegúrate de instalar react-icons

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      {/* Logo e Ícono */}
      <div className="flex items-center space-x-2">
        <FaChartBar className="text-xl" />
        <h1 className="text-lg font-bold">Bernat Borras Cabot</h1>
      </div>

      {/* Menú de navegación */
      /*<div className="hidden md:flex space-x-6">
        <Link href="/docs"className="hover:underline">
          Visualización de datos
        </Link>
      </div>*/}

      {/* Barra de búsqueda
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>*/}
    </nav>
  );
};

export default NavBar;
