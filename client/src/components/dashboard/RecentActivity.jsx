import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { fadeIn, staggerContainer } from "../../animations/variants";
import { formatCurrency } from "../../utils/formatters";

const RecentActivity = ({ transactions, limit = 5 }) => {
  // Sort transactions by date (most recent first)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  const getTypeStyles = (type) => {
    if (type === "income") {
      return {
        bgColor: "bg-green-100",
        textColor: "text-success-600",
        icon: (
          <svg
            className="w-5 h-5 text-success-600"
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
        ),
        amountPrefix: "+",
      };
    } else {
      return {
        bgColor: "bg-red-100",
        textColor: "text-danger-600",
        icon: (
          <svg
            className="w-5 h-5 text-danger-600"
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
        ),
        amountPrefix: "-",
      };
    }
  };

  return (
    <Card title="Recent Activity" className="h-full">
      <div className="space-y-4">
        {recentTransactions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No transactions yet</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {recentTransactions.map((transaction, index) => {
              const { bgColor, textColor, icon, amountPrefix } = getTypeStyles(transaction.type);
              
              return (
                <motion.div
                  key={transaction._id || index}
                  variants={fadeIn("up", index * 0.1)}
                  className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className={`p-2 rounded-lg ${bgColor}`}>{icon}</div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{transaction.description}</h4>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <span className={`text-sm font-medium ${textColor}`}>
                        {amountPrefix}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;