import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaList, FaShoppingCart } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-gray-700 h-[70px] box-border">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-[70px] w-auto" />
      </div>
      <nav className="flex items-center h-full gap-4 text-xs">
        <Link to="/" className="flex items-center justify-center h-full">
          <div className="text-white opacity-70 hover:opacity-100  hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px] transition-colors duration-400 linear">
            <FaHome className="mr-2" />
            <span>home</span>
          </div>
        </Link>
        <Link to="/sign-up" className="flex items-center justify-center h-full">
          <div className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear">
            <FaUser className="mr-2" />
            <span>profile</span>
          </div>
        </Link>
        <Link to="/sign-up" className="flex items-center justify-center h-full">
          <div className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear">
            <FaList className="mr-2" />
            <span>catalog</span>
          </div>
        </Link>
        <Link to="/sign-up" className="flex items-center justify-center h-full">
          <div className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear">
            <FaShoppingCart className="mr-2" />
            <span>cart</span>
          </div>
        </Link>
        <Link to="/sign-in" className="flex items-center justify-center h-full">
          <div className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear">
            <FiLogOut className="mr-2" />
            <span>log out</span>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
