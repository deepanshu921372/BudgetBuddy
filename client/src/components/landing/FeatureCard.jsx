import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      className="flex-1 bg-white rounded-2xl shadow-lg border border-purple-100/20 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/30 backdrop-blur-sm"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200/50 transform hover:rotate-6 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl lg:text-2xl font-semibold mt-6 mb-3 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;