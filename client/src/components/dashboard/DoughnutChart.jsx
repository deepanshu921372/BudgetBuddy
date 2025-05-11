import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { formatCurrency } from "../../utils/formatters";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DoughnutChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    // Filter expenses only
    const expenses = transactions.filter(t => t.type === "expense");

    // Group by category
    const categoryData = expenses.reduce((acc, curr) => {
      const category = curr.category || "Other";
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += curr.amount;
      return acc;
    }, {});

    // Sort categories by amount (descending)
    const sortedCategories = Object.entries(categoryData)
      .sort(([, a], [, b]) => b - a);

    // Colors for categories
    const colors = [
      "rgba(139, 92, 246, 0.8)", // violet-500
      "rgba(59, 130, 246, 0.8)", // blue-500
      "rgba(16, 185, 129, 0.8)", // emerald-500
      "rgba(245, 158, 11, 0.8)", // amber-500
      "rgba(239, 68, 68, 0.8)",  // red-500
      "rgba(236, 72, 153, 0.8)", // pink-500
      "rgba(168, 85, 247, 0.8)", // purple-500
      "rgba(14, 165, 233, 0.8)", // sky-500
    ];

    return {
      labels: sortedCategories.map(([category]) => category),
      datasets: [
        {
          data: sortedCategories.map(([, amount]) => amount),
          backgroundColor: colors.slice(0, sortedCategories.length),
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
  }, [transactions]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        padding: 12,
        bodyFont: {
          family: "'Inter', sans-serif",
        },
        bodySpacing: 4,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
      },
    },
  };

  return (
    <Card title="Expense by Category" className="h-full">
      <div className="relative h-80">
        {transactions.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">No expense data available</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <Doughnut data={chartData} options={options} />
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default DoughnutChart;