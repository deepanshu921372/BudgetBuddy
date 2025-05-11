import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Sidebar from "../components/layout/Sidebar";
import LineChart from "../components/dashboard/LineChart";
import DoughnutChart from "../components/dashboard/DoughnutChart";
import useStore from "../store/useStore";
import { formatCurrency } from "../utils/formatters";

const StatCard = ({ title, value, icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-8 lg:pb-[3rem] rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between h-full lg:h-[80%]"
  >
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-xl ${color}`}>
          {icon}
        </div>
        
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </motion.div>
);

const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { transactions, transactionLoading, fetchTransactions } = useStore();
  const [monthlyStats, setMonthlyStats] = useState({
    totalExpense: 0,
    totalIncome: 0,
    savings: 0,
    expenseTrend: 0,
  });

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const currentMonthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      });

      const lastMonthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === (currentMonth - 1) && 
               transactionDate.getFullYear() === currentYear;
      });

      const currentMonthExpenses = currentMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const currentMonthIncome = currentMonthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const lastMonthExpenses = lastMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenseTrend = lastMonthExpenses ? 
        ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 : 0;

      setMonthlyStats({
        totalExpense: currentMonthExpenses,
        totalIncome: currentMonthIncome,
        savings: currentMonthIncome - currentMonthExpenses,
        expenseTrend: Math.round(expenseTrend * 10) / 10,
      });
    }
  }, [transactions]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-violet-900 bg-clip-text text-transparent">
                  Analytics
                </h1>
              </div>
              <div className="text-sm font-medium text-gray-600">
                {format(new Date(), 'MMMM yyyy')}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {transactionLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  title="Total Expenses"
                  value={formatCurrency(monthlyStats.totalExpense)}
                  icon={<span className="text-2xl">💸</span>}
                  color="bg-red-50"
                  trend={monthlyStats.expenseTrend}
                />
                <StatCard
                  title="Total Income"
                  value={formatCurrency(monthlyStats.totalIncome)}
                  icon={<span className="text-2xl">💰</span>}
                  color="bg-green-50"
                />
                <StatCard
                  title="Net Savings"
                  value={formatCurrency(monthlyStats.savings)}
                  icon={<span className="text-2xl">🏦</span>}
                  color="bg-blue-50"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Expense Trends</h2>
                  <div className="h-[400px] w-full">
                    <LineChart transactions={transactions} />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Expense Distribution</h2>
                  <div className="h-[400px] w-full flex items-center justify-center">
                    <DoughnutChart transactions={transactions} />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Summary</h2>
                <div className="overflow-x-auto">
                  {/* Income Summary */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                      Income Categories
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-green-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                            Transactions
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                            Total Amount
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                            % of Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(transactions
                          .filter(transaction => transaction.type === 'income')
                          .reduce((acc, transaction) => {
                            const categoryName = typeof transaction.category === 'object' 
                              ? transaction.category?.name || 'Other Income'
                              : transaction.category || 'Other Income';
                              
                            if (!acc[categoryName]) {
                              acc[categoryName] = {
                                count: 0,
                                total: 0,
                              };
                            }
                            acc[categoryName].count++;
                            acc[categoryName].total += transaction.amount;
                            return acc;
                          }, {}))
                          .map(([name, data]) => ({
                            name,
                            ...data,
                            percentage: monthlyStats.totalIncome > 0 
                              ? (data.total / monthlyStats.totalIncome) * 100 
                              : 0,
                          }))
                          .sort((a, b) => b.total - a.total)
                          .map((category, index) => (
                            <tr 
                              key={category.name} 
                              className="hover:bg-green-50/50 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {category.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {category.count}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                {formatCurrency(category.total)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {category.percentage.toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Expense Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                      Expense Categories
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-red-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                            Transactions
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                            Total Amount
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                            % of Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(transactions
                          .filter(transaction => transaction.type === 'expense')
                          .reduce((acc, transaction) => {
                            const categoryName = typeof transaction.category === 'object' 
                              ? transaction.category?.name || 'Other Expenses'
                              : transaction.category || 'Other Expenses';
                              
                            if (!acc[categoryName]) {
                              acc[categoryName] = {
                                count: 0,
                                total: 0,
                              };
                            }
                            acc[categoryName].count++;
                            acc[categoryName].total += transaction.amount;
                            return acc;
                          }, {}))
                          .map(([name, data]) => ({
                            name,
                            ...data,
                            percentage: monthlyStats.totalExpense > 0 
                              ? (data.total / monthlyStats.totalExpense) * 100 
                              : 0,
                          }))
                          .sort((a, b) => b.total - a.total)
                          .map((category, index) => (
                            <tr 
                              key={category.name} 
                              className="hover:bg-red-50/50 transition-colors duration-150"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {category.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {category.count}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                {formatCurrency(category.total)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {category.percentage.toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Analytics; 