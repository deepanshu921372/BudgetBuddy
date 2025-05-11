import React from "react";
import { motion } from "framer-motion";

const Loader = ({ size = "md", color = "primary" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClasses = {
    primary: "border-t-primary-500",
    secondary: "border-t-secondary-500",
    success: "border-t-success-500",
    danger: "border-t-danger-500",
    warning: "border-t-warning-500",
    info: "border-t-info-500",
  };

  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-200 ${colorClasses[color]} rounded-full`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      ></motion.div>
    </div>
  );
};

export default Loader;