import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import TransactionForm from "./TransactionForm";

const AddTransaction = ({ onAddTransaction }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("expense");

  const toggleForm = (type = "expense") => {
    setTransactionType(type);
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = (transaction) => {
    onAddTransaction(transaction);
    setIsFormOpen(false);
  };

  return (
    <div className="mb-6">
      {!isFormOpen ? (
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => toggleForm("expense")}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200 flex items-center justify-center gap-2 py-4"
            icon={
              <svg
                className="w-5 h-5"
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
            }
          >
            Add Expense
          </Button>
          <Button
            onClick={() => toggleForm("income")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 py-4"
            icon={
              <svg
                className="w-5 h-5"
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
            }
          >
            Add Income
          </Button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {transactionType === "expense" ? "Add Expense" : "Add Income"}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <TransactionForm
                type={transactionType}
                onSubmit={handleSubmit}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AddTransaction;