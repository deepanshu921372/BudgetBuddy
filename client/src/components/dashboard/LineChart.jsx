import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { formatCurrency } from "../../utils/formatters";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    // Get the past 6 months
    const today = new Date();
    const months = [];
    const incomeData = [];
    const expenseData = [];

    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = month.toLocaleDateString("en-US", { month: "short" });
      months.push(monthName);
      
      // Initialize with zeros
      incomeData.push(0);
      expenseData.push(0);
    }

    // Group transactions by month
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const monthIndex = Math.floor(
        (today - transactionDate) / (30 * 24 * 60 * 60 * 1000)
      );
      
      if (monthIndex >= 0 && monthIndex < 6) {
        if (transaction.type === "income") {
          incomeData[5 - monthIndex] += transaction.amount;
        } else if (transaction.type === "expense") {
          expenseData[5 - monthIndex] += transaction.amount;
        }
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "rgba(16, 185, 129, 1)", // emerald-600
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          pointBackgroundColor: "rgba(16, 185, 129, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(16, 185, 129, 1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Expenses",
          data: expenseData,
          borderColor: "rgba(239, 68, 68, 1)", // red-600
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          pointBackgroundColor: "rgba(239, 68, 68, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(239, 68, 68, 1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [transactions]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.5)", // gray-200 with opacity
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          color: "#6B7280", // gray-500
          callback: function (value) {
            return formatCurrency(value);
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          color: "#6B7280", // gray-500
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
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
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
      },
    },
  };

  return (
    <Card title="Income vs Expenses" className="h-full">
      <div className="relative h-80">
        {transactions.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">No transaction data available</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <Line data={chartData} options={options} />
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default LineChart;