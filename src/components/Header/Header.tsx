import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaList, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import logo from '../../assets/logo.png';
import ROUTES from '../../utils/routes';
import './Header.css';
import { LSTokens } from '../../constants/constants';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const hiddenMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  const goToSignIn = () => {
    Cookies.remove('access_token');
    navigate(ROUTES.SIGNIN);
  };

  const goToSignUp = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <header className="flex justify-between items-center bg-gray-700 h-[70px] box-border">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-[70px] w-auto" />
      </div>
      <div className="h-full">
        <div className="flex items-center sm:hidden pr-1 relative z-20 ">
          <button type="button" onClick={toggleMenu} className="text-white text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav
          className={`nav ${menuOpen ? 'nav--open' : ''} sm:flex items-center h-full gap-4 text-xs`}
        >
          <Link
            to={ROUTES.MAIN_PAGE}
            className="flex items-center justify-center h-full"
            onClick={hiddenMenu}
          >
            <div className="text-white opacity-70 hover:opacity-100  hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px] transition-colors duration-400 linear">
              <FaHome className="mr-2" />
              <span>home</span>
            </div>
          </Link>
          <Link
            to={ROUTES.NOT_FOUND}
            className="flex items-center justify-center h-full"
            onClick={hiddenMenu}
          >
            <div className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear">
              <FaUser className="mr-2" />
              <span>profile</span>
            </div>
          </Link>
          <Link
            to={ROUTES.CATALOG}
            className="flex items-center justify-center h-full"
            onClick={hiddenMenu}
          >
            <div className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear">
              <FaList className="mr-2" />
              <span>catalog</span>
            </div>
          </Link>
          <Link
            to={ROUTES.NOT_FOUND}
            className="flex items-center justify-center h-full"
            onClick={hiddenMenu}
          >
            <div className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear">
              <FaShoppingCart className="mr-2" />
              <span>cart</span>
            </div>
          </Link>
          {Cookies.get(LSTokens.ACCESS_TOKEN) ? (
            <div
              className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear"
              onClick={goToSignIn}
            >
              <FiLogOut className="mr-2" />
              <span>log out</span>
            </div>
          ) : (
            <div
              className="text-white opacity-70 hover:opacity-100 hover:bg-indigo-500 cursor-pointer h-full uppercase flex items-center px-[10px]  transition-colors duration-400 linear"
              onClick={goToSignUp}
            >
              <FiLogIn className="mr-2" />
              <span>sign up</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
