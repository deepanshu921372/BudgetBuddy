import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/logo2.png";
import logoText from "../../assets/images/logotext.png";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close sidebar when route changes
  useEffect(() => {
    if (isMobile && isOpen) {
      toggleSidebar();
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      if (isMobile) {
        toggleSidebar();
      }
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLinkClick = (path, isDropdownToggle = false) => {
    if (isDropdownToggle) {
      return;
    }
    
    if (isMobile) {
      toggleSidebar();
    }
    
    if (path) {
      navigate(path);
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
    closed: {
      x: isMobile ? "-100%" : 0,
      opacity: isMobile ? 0 : 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    closed: {
      x: -20,
      opacity: 0,
    },
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const menuItems = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      title: "Home",
      path: "/",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Transactions",
      path: "/transactions",
      dropdown: [
        { title: "All Transactions", path: "/transactions" },
        { title: "Income", path: "/transactions/income" },
        { title: "Expenses", path: "/transactions/expenses" },
      ],
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Analytics",
      path: "/analytics",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      title: "Categories",
      path: "/categories",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Settings",
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed md:sticky top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-xl shadow-lg z-50 flex flex-col ${
          !isMobile && "border-r border-gray-100"
        }`}
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        {/* Logo */}
        <motion.div 
          className="p-4 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <img src={logoText} alt="BudgetBuddy" className="h-8 ml-2" />
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={item.path}>
              <motion.div
                variants={menuItemVariants}
                custom={index}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  onClick={() => {
                    if (item.dropdown) {
                      toggleDropdown(item.title);
                    } else {
                      handleLinkClick(item.path);
                    }
                  }}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 group cursor-pointer ${
                    isActive(item.path)
                      ? "bg-violet-500/10 text-violet-600"
                      : "text-gray-700 hover:bg-violet-500/5 hover:text-violet-600"
                  }`}
                >
                  <span className={`${isActive(item.path) ? "text-violet-600" : "text-gray-400 group-hover:text-violet-600"} mr-3 transition-colors duration-300`}>
                    {item.icon}
                  </span>
                  <span className="flex-1 whitespace-nowrap">{item.title}</span>
                  {item.dropdown && (
                    <svg
                      className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${
                        activeDropdown === item.title ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </motion.div>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 mt-1 space-y-1"
                    >
                      {item.dropdown.map((subItem) => (
                        <motion.div
                          key={subItem.path}
                          variants={menuItemVariants}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            onClick={() => handleLinkClick(subItem.path)}
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                              isActive(subItem.path)
                                ? "bg-violet-500/10 text-violet-600"
                                : "text-gray-600 hover:bg-violet-500/5 hover:text-violet-600"
                            }`}
                          >
                            {subItem.title}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <motion.div
          className="p-4 border-t border-gray-100/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer w-full px-4 py-2.5 text-sm font-medium bg-red-100 border border-red-200 text-gray-700 rounded-lg hover:bg-red-500/5 hover:text-red-600 transition-all duration-300"
          >
            <svg
              className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </motion.div>
        {/* User Profile */}
        <motion.div 
          className="px-4 py-3 border-t border-b border-gray-100/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div 
            onClick={() => handleLinkClick('/profile')}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-semibold transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
              {getInitials(currentUser?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-violet-600 transition-colors duration-300">
                {currentUser?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sidebar;
