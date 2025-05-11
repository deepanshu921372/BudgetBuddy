import React from "react";
import { motion } from "framer-motion";

const categories = [
  { id: "all", name: "All" },
  { id: "food", name: "Food" },
  { id: "transport", name: "Transport" },
  { id: "entertainment", name: "Entertainment" },
  { id: "utilities", name: "Utilities" },
  { id: "education", name: "Education" },
  { id: "health", name: "Health" },
  { id: "other", name: "Other" },
];

const CategoryFilter = ({ activeCategory, onChange }) => {
  return (
    <div className="flex overflow-x-auto py-2 mb-6 -mx-4 px-4 md:px-0 md:mx-0 no-scrollbar">
      <div className="flex space-x-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors duration-200 ${
              activeCategory === category.id
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;