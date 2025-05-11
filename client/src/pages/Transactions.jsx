import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { useTransactions } from "../hooks/useTransactions";
import { usePersistentState } from "../context/PersistentStateContext";
import AddTransactionModal from "../components/modals/AddTransactionModal";
import { formatCurrency } from "../utils/formatters";
import * as XLSX from "xlsx";

const Transactions = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(() => {
    const savedState = localStorage.getItem('sidebarOpen');
    return savedState ? JSON.parse(savedState) : true;
  });
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRef = useRef(null);
  const { transactions, addTransaction, deleteTransaction, updateTransaction } = useTransactions();
  const { persistentState, updateTransactionsState } = usePersistentState();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname === "/transactions") return "all";
    if (location.pathname === "/transactions/income") return "income";
    if (location.pathname === "/transactions/expenses") return "expenses";
    return persistentState.transactions.filterType || "all";
  });

  React.useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    updateTransactionsState({ filterType: tab });
    if (tab === "all") navigate("/transactions");
    else navigate(`/transactions/${tab}`);
  };

  const handleAddTransaction = (transactionData) => {
    addTransaction(transactionData);
  };

  const handleSortChange = (e) => {
    updateTransactionsState({ sortBy: e.target.value });
  };

  const handleSortOrderChange = () => {
    updateTransactionsState({ 
      sortOrder: persistentState.transactions.sortOrder === 'asc' ? 'desc' : 'asc' 
    });
  };

  const sortTransactions = (transactions) => {
    const { sortBy, sortOrder } = persistentState.transactions;
    return [...transactions].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.date) - new Date(a.date);
          break;
        case 'amount':
          comparison = b.amount - a.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });
  };

  const filteredTransactions = sortTransactions(
    transactions.filter(transaction => {
      if (activeTab === "income") return transaction.type === "income";
      if (activeTab === "expenses") return transaction.type === "expense";
      return true;
    })
  );

  // Download all transactions as Excel
  const handleDownloadExcel = () => {
    if (!transactions || transactions.length === 0) return;
    // Prepare data for Excel
    const data = transactions.map((t) => ({
      Date: new Date(t.date).toLocaleDateString(),
      Type: t.type,
      Description: t.description,
      Category: t.category,
      Amount: t.amount,
      Currency: persistentState.settings.currency || 'USD',
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  // Handle delete
  const handleDelete = async (transactionId) => {
    await deleteTransaction(transactionId);
    setDropdownOpenId(null);
  };

  // Handle edit
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
    setDropdownOpenId(null);
  };

  // Handle details
  const handleDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setDetailsModalOpen(true);
  };

  return (
    <div className="flex h-screen fixed inset-0 bg-transparent backdrop-blur-sm z-40 overflow-y-auto">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-4 sm:space-y-0">
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
                  Transactions
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <select
                    value={persistentState.transactions.sortBy}
                    onChange={handleSortChange}
                    className="block w-full sm:w-40 pl-3 pr-10 py-2 text-base border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm appearance-none cursor-pointer hover:border-gray-400 transition-colors duration-200"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1.5em 1.5em'
                    }}
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="category">Category</option>
                  </select>
                  <button
                    onClick={handleSortOrderChange}
                    className="p-2 rounded-lg border cursor-pointer border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-200 bg-white shadow-sm"
                    title={`Sort ${persistentState.transactions.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                  >
                    {persistentState.transactions.sortOrder === 'asc' ? (
                      <svg className="w-5 h-5 cursor-pointer text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9M3 12h5M3 16h9M3 20h13" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 cursor-pointer text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h13M3 16h9M3 12h5M3 8h9M3 4h13" />
                      </svg>
                    )}
                  </button>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-200 cursor-pointer transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Transaction
                </button>
                <button
                  onClick={handleDownloadExcel}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer transform hover:scale-105"
                  style={{ minWidth: 180 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Download All Transactions
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mt-4 border-b border-gray-200 overflow-x-auto pb-px">
              <button
                onClick={() => handleTabChange("all")}
                className={`pb-4 px-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer hover:text-violet-600 ${
                  activeTab === "all"
                    ? "text-violet-600 border-b-2 border-violet-600"
                    : "text-gray-500"
                }`}
              >
                All Transactions
              </button>
              <button
                onClick={() => handleTabChange("income")}
                className={`pb-4 px-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer hover:text-violet-600 ${
                  activeTab === "income"
                    ? "text-violet-600 border-b-2 border-violet-600"
                    : "text-gray-500"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => handleTabChange("expenses")}
                className={`pb-4 px-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer hover:text-violet-600 ${
                  activeTab === "expenses"
                    ? "text-violet-600 border-b-2 border-violet-600"
                    : "text-gray-500"
                }`}
              >
                Expenses
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new transaction.</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-200 cursor-pointer transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Your First Transaction
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <motion.li
                      key={transaction._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer relative"
                      onClick={e => {
                        // Only open details if not clicking the three dots
                        if (!e.target.closest('.dropdown-trigger')) handleDetails(transaction);
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${
                            transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                          }`}>
                            {transaction.type === "income" ? (
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                          <span className={`text-sm font-medium ${
                            transaction.type === "income" ? "text-green-600" : "text-red-600"
                          }`}>
                            {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                          </span>
                          <div className="ml-4 relative dropdown-trigger" ref={dropdownRef} onClick={e => { e.stopPropagation(); setDropdownOpenId(dropdownOpenId === transaction._id ? null : transaction._id); }}>
                            <button className="text-gray-400 hover:text-violet-600 cursor-pointer focus:outline-none">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                            {dropdownOpenId === transaction._id && (
                              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-violet-50" onClick={() => handleEdit(transaction)}>Edit</button>
                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" onClick={() => handleDelete(transaction._id)}>Delete</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
      />

      {/* Transaction Details Modal */}
      {detailsModalOpen && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-transparent backdrop-blur-sm z-40 overflow-y-auto"
            onClick={() => setDetailsModalOpen(false)}
          />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 relative z-50 border border-gray-100">
            <button onClick={() => setDetailsModalOpen(false)} className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex items-center mb-6">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md mr-4 ${selectedTransaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                {selectedTransaction.type === 'income' ? (
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                ) : (
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
            </div>
            <div className="space-y-4 text-base">
              <div><span className="font-semibold text-gray-700">Type:</span> <span className={selectedTransaction.type === 'income' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{selectedTransaction.type.charAt(0).toUpperCase() + selectedTransaction.type.slice(1)}</span></div>
              <div><span className="font-semibold text-gray-700">Amount:</span> <span className={selectedTransaction.type === 'income' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{formatCurrency(selectedTransaction.amount)}</span></div>
              <div><span className="font-semibold text-gray-700">Description:</span> <span className="text-gray-800">{selectedTransaction.description}</span></div>
              <div><span className="font-semibold text-gray-700">Category:</span> <span className="text-gray-800">{selectedTransaction.category}</span></div>
              <div><span className="font-semibold text-gray-700">Date:</span> <span className="text-gray-800">{new Date(selectedTransaction.date).toLocaleDateString()}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Transaction Modal */}
      <AddTransactionModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={async (formData) => {
          await updateTransaction(selectedTransaction._id, formData);
          setEditModalOpen(false);
        }}
        initialData={selectedTransaction}
        mode="edit"
      />
    </div>
  );
};

export default Transactions; 