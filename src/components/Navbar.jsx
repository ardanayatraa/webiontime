import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  // Hook untuk mendapatkan lokasi saat ini
  const location = useLocation();

  // Fungsi untuk menentukan apakah link saat ini aktif
  const isActive = (path) => location.pathname === path ? 'border-t-2 border-yellow-500' : '';

  return (
    <nav className="bg-white text-black py-8 w-full fixed top-0 left-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold uppercase">Webion Team</div>
        {/* Menu Navigasi */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`hover:border-t-2 hover:border-yellow-500 uppercase mt-0.5 ${isActive('/')}`}
          >
            Home
          </Link>
          <Link
            to="/contact-us"
            className={`hover:border-t-2 hover:border-yellow-500 uppercase mt-0.5 ${isActive('/contact-us')}`}
          >
            Contact Us
          </Link>
          <Link
            to="/catalog"
            className={`hover:border-t-2 hover:border-yellow-500 uppercase mt-0.5 ${isActive('/catalog')}`}
          >
            Catalog
          </Link>
          <Link
            to="/explore"
            className={`hover:border-t-2 hover:border-yellow-500 uppercase mt-0.5 ${isActive('/explore')}`}
          >
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
