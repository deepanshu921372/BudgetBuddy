import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import logo from "../../assets/images/logo2.png";
import logoText from "../../assets/images/logoText.png";
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="h-12"
            >
              <img
                src={logo}
                alt="BudgetBuddy"
                className="h-full rounded-full object-contain"
              />
            </motion.div>
            <img src={logoText} alt="BudgetBuddy" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`font-medium cursor-pointer transition-all duration-300 relative ${
                    isActive("/dashboard")
                      ? "text-violet-600 after:w-full"
                      : "text-gray-700 hover:text-violet-600"
                  } after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:bg-violet-600 after:transition-all after:duration-300 after:ease-in-out ${isActive("/dashboard") ? "after:w-full" : "after:w-0"} hover:after:w-full`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className={`font-medium cursor-pointer transition-all duration-300 relative ${
                    isActive("/transactions")
                      ? "text-violet-600 after:w-full"
                      : "text-gray-700 hover:text-violet-600"
                  } after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:bg-violet-600 after:transition-all after:duration-300 after:ease-in-out ${isActive("/transactions") ? "after:w-full" : "after:w-0"} hover:after:w-full`}
                >
                  Transactions
                </Link>
                <Link
                  to="/analytics"
                  className={`font-medium cursor-pointer transition-all duration-300 relative ${
                    isActive("/analytics")
                      ? "text-violet-600 after:w-full"
                      : "text-gray-700 hover:text-violet-600"
                  } after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:bg-violet-600 after:transition-all after:duration-300 after:ease-in-out ${isActive("/analytics") ? "after:w-full" : "after:w-0"} hover:after:w-full`}
                >
                  Analytics
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-violet-50 transition-all duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`font-medium cursor-pointer transition-all duration-300 relative ${
                    isActive("/")
                      ? "text-violet-600 after:w-full"
                      : "text-gray-700 hover:text-violet-600"
                  } after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:bg-violet-600 after:transition-all after:duration-300 after:ease-in-out ${isActive("/") ? "after:w-full" : "after:w-0"} hover:after:w-full`}
                >
                  Home
                </Link>
                <Link
                  to="/features"
                  className={`font-medium cursor-pointer transition-all duration-300 relative ${
                    isActive("/features")
                      ? "text-violet-600 after:w-full"
                      : "text-gray-700 hover:text-violet-600"
                  } after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:bg-violet-600 after:transition-all after:duration-300 after:ease-in-out ${isActive("/features") ? "after:w-full" : "after:w-0"} hover:after:w-full`}
                >
                  Features
                </Link>
                <Link
                  to="/about"
                  className={`font-medium cursor-pointer transition-all duration-300 relative ${
                    isActive("/about")
                      ? "text-violet-600 after:w-full"
                      : "text-gray-700 hover:text-violet-600"
                  } after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:bg-violet-600 after:transition-all after:duration-300 after:ease-in-out ${isActive("/about") ? "after:w-full" : "after:w-0"} hover:after:w-full`}
                >
                  About
                </Link>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/login")}
                    className="cursor-pointer hover:bg-violet-50 transition-all duration-300"
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/signup")}
                    className="cursor-pointer bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none cursor-pointer hover:text-violet-600 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden mt-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-purple-100/20"
            >
              <div className="flex flex-col py-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className={`px-4 py-3 cursor-pointer transition-all duration-300 relative ${
                        isActive("/dashboard")
                          ? "bg-violet-50 text-violet-600"
                          : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/transactions"
                      className={`px-4 py-3 cursor-pointer transition-all duration-300 relative ${
                        isActive("/transactions")
                          ? "bg-violet-50 text-violet-600"
                          : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Transactions
                    </Link>
                    <Link
                      to="/analytics"
                      className={`px-4 py-3 cursor-pointer transition-all duration-300 relative ${
                        isActive("/analytics")
                          ? "bg-violet-50 text-violet-600"
                          : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Analytics
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 text-left text-red-600 hover:bg-red-50 cursor-pointer transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      className={`px-4 py-3 cursor-pointer transition-all duration-300 ${
                        isActive("/")
                          ? "bg-violet-50 text-violet-600"
                          : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/features"
                      className={`px-4 py-3 cursor-pointer transition-all duration-300 ${
                        isActive("/features")
                          ? "bg-violet-50 text-violet-600"
                          : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Features
                    </Link>
                    <Link
                      to="/about"
                      className={`px-4 py-3 cursor-pointer transition-all duration-300 ${
                        isActive("/about")
                          ? "bg-violet-50 text-violet-600"
                          : "text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                    <div className="grid grid-cols-2 gap-2 p-4">
                      <Link
                        to="/login"
                        className="w-full py-2 text-center bg-white border border-violet-500 rounded-lg text-violet-600 font-medium hover:bg-violet-50 cursor-pointer transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="w-full py-2 text-center bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg text-white font-medium hover:from-violet-700 hover:to-purple-700 cursor-pointer transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
