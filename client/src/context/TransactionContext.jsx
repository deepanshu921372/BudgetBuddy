import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";

export const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const isFetching = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !isFetching.current) {
      fetchTransactions();
    } else {
      setTransactions([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchTransactions = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setIsLoading(true);
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch transactions");
      console.error("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now().toString(),
      ...transaction,
      date: new Date(transaction.date).toISOString(),
      amount: parseFloat(transaction.amount)
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === id ? { ...transaction, ...updatedData } : transaction
    ));
  };

  // Get total balance, income and expenses
  const getBalance = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const balance = income - expenses;
    
    return { balance, income, expenses };
  };

  // Get transactions by category
  const getTransactionsByCategory = (type = "expense") => {
    const filteredTransactions = transactions.filter((t) => t.type === type);
    
    // Group by category
    const categoryMap = filteredTransactions.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});
    
    return Object.entries(categoryMap).map(([category, amount]) => ({
      category,
      amount,
    }));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isLoading,
        error,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getBalance,
        getTransactionsByCategory,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};