import React from "react";
import { motion } from "framer-motion";

const Input = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  success,
  required = false,
  disabled = false,
  className = "",
  icon,
  iconPosition = "left",
  variant = "default",
  glassmorphism = false
}) => {
  const variants = {
    default: "bg-white border-gray-300",
    primary: "bg-violet-50/30 border-violet-200",
    glass: "glass-effect border-white/20"
  };

  const getInputClasses = () => `
    block w-full rounded-lg py-2.5 transition-all duration-300 input-focus
    ${icon && iconPosition === "left" ? "pl-10" : "pl-4"}
    ${icon && iconPosition === "right" ? "pr-10" : "pr-4"}
    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""}
    ${success ? "border-green-500 focus:border-green-500 focus:ring-green-500/50" : ""}
    ${disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : ""}
    ${variants[glassmorphism ? "glass" : variant]}
  `;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <motion.label
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </motion.label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        <motion.input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={getInputClasses()}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-sm text-red-500 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
      {success && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-sm text-green-500 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </motion.p>
      )}
    </div>
  );
};

export default Input;