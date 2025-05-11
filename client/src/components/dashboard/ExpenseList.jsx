import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { fadeIn, staggerContainer } from "../../animations/variants";
import { formatCurrency } from "../../utils/formatters";

const categoryIcons = {
  food: (
    <div className="bg-orange-100 p-2 rounded-lg">
      <svg
        className="w-5 h-5 text-orange-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
  ),
  transport: (
    <div className="bg-blue-100 p-2 rounded-lg">
      <svg
        className="w-5 h-5 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    </div>
  ),
  entertainment: (
    <div className="bg-purple-100 p-2 rounded-lg">
      <svg
        className="w-5 h-5 text-purple-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </div>
  ),
  utilities: (
    <div className="bg-yellow-100 p-2 rounded-lg">
      <svg
        className="w-5 h-5 text-yellow-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </div>
  ),
  education: (
    <div className="bg-green-100 p-2 rounded-lg">
      <svg
        className="w-5 h-5 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    </div>
  ),
  health: (
    <div className="bg-pink-100 p-2 rounded-lg">
      <svg
        className="w-5 h-5 text-pink-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  ),
  other: (
    <div className="bg-gray-100 p-2 rounded-lg">
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </div>
  ),
};

const ExpenseList = ({ transactions, limit = 5 }) => {
  // Get only expenses and sort by date (most recent first)
  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return (
    <Card title="Recent Expenses" className="h-full">
      <div className="space-y-4">
        {expenses.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No expenses yet</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {expenses.map((expense, index) => (
              <motion.div
                key={expense._id || index}
                variants={fadeIn("up", index * 0.1)}
                className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                {categoryIcons[expense.category] || categoryIcons.other}
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">{expense.description}</h4>
                      <p className="text-xs text-gray-500">
                        {new Date(expense.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-danger-600">-{formatCurrency(expense.amount)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default ExpenseList;