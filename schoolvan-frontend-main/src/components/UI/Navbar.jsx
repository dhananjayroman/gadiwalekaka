import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginRole, setLoginRole] = useState(""); // "student" | "carowner" | ""
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isStudent = localStorage.getItem('isLoggedIn') === 'true';
    const isCarOwner = localStorage.getItem('carOwnerLoggedIn') === 'true';

    if (isStudent) setLoginRole("student");
    else if (isCarOwner) setLoginRole("carowner");
    else setLoginRole("");
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('carOwnerLoggedIn');
    setLoginRole("");
    navigate('/login');
  };

  const navLinksStudent = [
    { name: 'Profile', path: '/profile' },
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Schools', path: '/school' },
    { name: 'Vehicle', path: '/vehicle' },
    { name: 'Track Van', path: '/track-van' },
    { name: 'Contact', path: '/contact' }
  ];

  const navLinksCarOwner = [
    { name: 'Car-Owner', path: '/admissions' },
    { name: 'Driver Tracking', path: '/driver-tracking' }
  ];

  const NavItem = ({ name, path, onClick }) => {
    const isActive = location.pathname === path;
    return (
      <NavLink 
        to={path} 
        onClick={onClick}
        className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
          isActive ? 'text-[#F4B400]' : isScrolled ? 'text-gray-700 hover:text-[#F4B400]' : 'text-gray-800 hover:text-[#F4B400]'
        }`}
      >
        {name}
        {isActive && (
          <motion.div
            layoutId="navbar-underline"
            className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F4B400] rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </NavLink>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <img src="/images/gadilogo.png" alt="Logo" className="h-10 w-auto object-contain" />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-[#F4B400] to-yellow-600 bg-clip-text text-transparent tracking-tight">
                GadiWaleKaka
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* 👇 Show if STUDENT is logged in */}
            {loginRole === "student" && (
              <>
                {navLinksStudent.map(link => (
                  <NavItem key={link.path} name={link.name} path={link.path} />
                ))}
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#FEE2E2" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 ml-4 px-5 py-2 rounded-xl bg-red-50 text-red-600 transition-colors font-semibold text-sm border border-red-100"
                >
                  <LogOut size={16} /> Logout
                </motion.button>
              </>
            )}

            {/* 👇 Show if CAR OWNER is logged in */}
            {loginRole === "carowner" && (
              <>
                {navLinksCarOwner.map(link => (
                  <NavItem key={link.path} name={link.name} path={link.path} />
                ))}
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#FEE2E2" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 ml-4 px-5 py-2 rounded-xl bg-red-50 text-red-600 transition-colors font-semibold text-sm border border-red-100"
                >
                  <LogOut size={16} /> Logout
                </motion.button>
              </>
            )}

            {/* 👇 Show if NOT logged in */}
            {loginRole === "" && (
              <div className="flex items-center gap-2 pl-4">
                <NavLink 
                  to="/login" 
                  className={`px-5 py-2 rounded-xl font-semibold transition-all ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/50'}`}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="px-5 py-2 rounded-xl bg-[#F4B400] text-gray-900 font-bold hover:bg-yellow-500 transition-all shadow-md shadow-yellow-500/20 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Register
                </NavLink>
                <NavLink 
                  to="/carowner-login" 
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-md hover:-translate-y-0.5 ml-2"
                >
                  <Car size={16} /> Car-Owner
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              aria-label="Toggle Navigation Menu"
              onClick={toggleMenu}
              className={`p-2 rounded-xl focus:outline-none transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-white/50'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full origin-top"
          >
            <div className="mx-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col p-4 space-y-1">
              {/* 👇 Show if STUDENT is logged in */}
              {loginRole === "student" && (
                <>
                  {navLinksStudent.map(link => (
                    <NavLink 
                      key={link.path}
                      to={link.path} 
                      onClick={toggleMenu} 
                      className={({isActive}) => `px-4 py-3 rounded-xl font-semibold transition-colors ${isActive ? 'bg-yellow-50 text-[#F4B400]' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <button onClick={() => { handleLogout(); toggleMenu(); }} className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-semibold">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </>
              )}

              {/* 👇 Show if CAR OWNER is logged in */}
              {loginRole === "carowner" && (
                <>
                  {navLinksCarOwner.map(link => (
                    <NavLink 
                      key={link.path}
                      to={link.path} 
                      onClick={toggleMenu} 
                      className={({isActive}) => `px-4 py-3 rounded-xl font-semibold transition-colors ${isActive ? 'bg-yellow-50 text-[#F4B400]' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <button onClick={() => { handleLogout(); toggleMenu(); }} className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-semibold">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </>
              )}

              {/* 👇 Show if NOT logged in */}
              {loginRole === "" && (
                <div className="space-y-2">
                  <NavLink 
                    to="/login" 
                    onClick={toggleMenu} 
                    className="block w-full px-4 py-3 text-center rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    onClick={toggleMenu} 
                    className="block w-full px-4 py-3 text-center rounded-xl bg-[#F4B400] text-gray-900 font-bold hover:bg-yellow-500 transition-colors"
                  >
                    Register
                  </NavLink>
                  <NavLink 
                    to="/carowner-login" 
                    onClick={toggleMenu} 
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-center rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors"
                  >
                    <Car size={18} /> Car-Owner
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
