import React from "react";
import { motion } from "framer-motion";

const Card = ({ 
  title, 
  children, 
  className = "", 
  padding = "p-6",
  variant = "default",
  hoverable = true,
  glassmorphism = false 
}) => {
  const variants = {
    default: "bg-white",
    primary: "bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10",
    secondary: "bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10"
  };

  const baseClasses = `
    rounded-2xl shadow-sm border border-gray-100
    ${variants[variant]}
    ${glassmorphism ? 'glass-effect' : ''}
    ${hoverable ? 'card-hover' : ''}
    ${className}
  `;

  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.01 } : {}}
      whileTap={hoverable ? { scale: 0.99 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={baseClasses}
    >
      {title && (
        <div className={`px-6 py-2 pt-2 border-b border-gray-100/50`}>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
      )}
      <div className={padding}>{children}</div>
    </motion.div>
  );
};

export default Card;