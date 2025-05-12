import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTransactions } from "../hooks/useTransactions";
import { usePersistentState } from "../context/PersistentStateContext";
import Sidebar from "../components/layout/Sidebar";
import BalanceSummary from "../components/dashboard/BalanceSummary";
import DoughnutChart from "../components/dashboard/DoughnutChart";
import LineChart from "../components/dashboard/LineChart";
import ExpenseList from "../components/dashboard/ExpenseList";
import RecentActivity from "../components/dashboard/RecentActivity";
import Loader from "../components/ui/Loader";

const Dashboard = () => {
  const { transactions, loading: isLoading, addTransaction, getTransactionStats } = useTransactions();
  const { persistentState, updateDashboardState } = usePersistentState();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Only set sidebar open by default on desktop
    return window.innerWidth >= 768;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Don't automatically open sidebar on resize
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader size="lg" />
      </div>
    );
  }

  const { balance, totalIncome: income, totalExpenses: expenses } = getTransactionStats();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddTransaction = (transactionData) => {
    addTransaction(transactionData);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-violet-900 bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <select
                  value={persistentState.dashboard.selectedTimeRange}
                  onChange={(e) => updateDashboardState({ selectedTimeRange: e.target.value })}
                  className="block w-full sm:w-40 pl-3 pr-10 py-2 text-base border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm appearance-none cursor-pointer hover:border-gray-400 transition-colors duration-200"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                  <option value="all">All Time</option>
                </select>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openAddTransactionModal'))}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-200 cursor-pointer transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:py-8 md:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            {/* Balance Summary */}
            <BalanceSummary
              balance={balance}
              income={income}
              expenses={expenses}
            />

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full min-h-[300px] sm:min-h-[400px]"
              >
                <DoughnutChart 
                  transactions={transactions} 
                  timeRange={persistentState.dashboard.selectedTimeRange}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full min-h-[300px] sm:min-h-[400px]"
              >
                <LineChart 
                  transactions={transactions}
                  timeRange={persistentState.dashboard.selectedTimeRange}
                />
              </motion.div>
            </div>

            {/* Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-full"
              >
                <ExpenseList 
                  transactions={transactions}
                  timeRange={persistentState.dashboard.selectedTimeRange}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-full"
              >
                <RecentActivity 
                  transactions={transactions}
                  timeRange={persistentState.dashboard.selectedTimeRange}
                />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;