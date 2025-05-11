import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  icon,
  loading = false,
  disabled = false,
  glassmorphism = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg focus:outline-none transition-all duration-300";
  
  const variants = {
    primary: "button-gradient text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
    secondary: "bg-white text-gray-700 border-2 border-gray-200 hover:border-violet-500 hover:text-violet-600 hover:shadow-lg hover:shadow-purple-100/50",
    outline: "border-2 border-violet-500 text-violet-600 hover:bg-violet-50 hover:shadow-lg hover:shadow-purple-100/50",
    success: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
    glass: "glass-effect text-gray-700 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20"
  };

  const sizes = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[glassmorphism ? "glass" : variant]}
    ${sizes[size]}
    ${className}
    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"}
  `;

  const motionProps = {
    whileHover: !disabled && { scale: 1.01 },
    whileTap: !disabled && { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  if (as === "link") {
    return (
      <motion.div {...motionProps}>
        <Link
          className={buttonClasses}
          {...props}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading...
            </>
          ) : (
            <>
              {icon && <span className="mr-2">{icon}</span>}
              {children}
            </>
          )}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;