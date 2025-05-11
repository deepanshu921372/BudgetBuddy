import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { formatCurrency } from "../../utils/formatters";

const BalanceSummary = ({ balance, income, expenses }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      {/* Total Balance */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl p-4 sm:p-6 shadow-lg shadow-violet-200"
      >
        <div className="flex flex-col">
          <span className="text-violet-100 text-sm font-medium mb-1">Total Balance</span>
          <div className="flex items-end justify-between">
            <motion.span 
              className="text-2xl sm:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {formatCurrency(balance)}
            </motion.span>
            <div className="p-2 bg-violet-600/30 rounded-lg">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-violet-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Income */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-4 sm:p-6 shadow-lg shadow-emerald-200"
      >
        <div className="flex flex-col">
          <span className="text-emerald-100 text-sm font-medium mb-1">Total Income</span>
          <div className="flex items-end justify-between">
            <motion.span 
              className="text-2xl sm:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {formatCurrency(income)}
            </motion.span>
            <div className="p-2 bg-emerald-600/30 rounded-lg">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expenses */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl p-4 sm:p-6 shadow-lg shadow-rose-200 sm:col-span-2 lg:col-span-1"
      >
        <div className="flex flex-col">
          <span className="text-rose-100 text-sm font-medium mb-1">Total Expenses</span>
          <div className="flex items-end justify-between">
            <motion.span 
              className="text-2xl sm:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {formatCurrency(expenses)}
            </motion.span>
            <div className="p-2 bg-rose-600/30 rounded-lg">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-rose-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BalanceSummary;