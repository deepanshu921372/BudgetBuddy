import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const fetchTransactions = useCallback(async (filters = {}) => {
    if (!localStorage.getItem("token")) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/transactions?${queryParams}`);
      setTransactions(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error("Transaction fetch error:", error);
      if (!isInitialFetch) {
        const errorMsg = error.response?.data?.error || 'Failed to fetch transactions';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
      setIsInitialFetch(false);
    }
  }, []);

  const fetchAnalytics = useCallback(async (dateRange = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(dateRange).toString();
      const response = await api.get(`/transactions/analytics?${queryParams}`);
      setAnalytics(response.data.data);
      setError(null);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to fetch analytics';
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchTransactions();
    } else {
      setLoading(false);
    }
    
    return () => {
      // Cancel any pending requests here if needed
    };
  }, []);

  const addTransaction = async (transactionData) => {
    try {
      setLoading(true);
      const response = await api.post('/transactions', transactionData);
      setTransactions(prev => [response.data.data, ...prev]);
      toast.success('Transaction added successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add transaction';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/transactions/${id}`);
      setTransactions(prev => prev.filter(transaction => transaction._id !== id));
      toast.success('Transaction deleted successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to delete transaction';
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTransactionStats = useCallback(() => {
    if (!transactions.length) return { totalIncome: 0, totalExpenses: 0, balance: 0 };

    const stats = transactions.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount);
        if (transaction.type === 'income') {
          acc.totalIncome += amount;
        } else {
          acc.totalExpenses += amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0 }
    );

    return {
      ...stats,
      balance: stats.totalIncome - stats.totalExpenses
    };
  }, [transactions]);

  const getCategoryBreakdown = useCallback(() => {
    if (!transactions.length) return { income: {}, expenses: {} };

    return transactions.reduce(
      (acc, transaction) => {
        const type = transaction.type;
        const category = transaction.category;
        const amount = Number(transaction.amount);

        if (!acc[type][category]) {
          acc[type][category] = { total: 0, count: 0 };
        }

        acc[type][category].total += amount;
        acc[type][category].count += 1;

        return acc;
      },
      { income: {}, expenses: {} }
    );
  }, [transactions]);

  return {
    transactions,
    analytics,
    loading,
    error,
    fetchTransactions,
    fetchAnalytics,
    addTransaction,
    deleteTransaction,
    getTransactionStats,
    getCategoryBreakdown
  };
};