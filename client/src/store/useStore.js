import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Categories state
      categories: [],
      selectedCategory: null,
      categoryLoading: false,
      categoryError: null,

      // Transactions state
      transactions: [],
      transactionLoading: false,
      transactionError: null,
      dateRange: { startDate: null, endDate: null },

      // UI state
      sidebarOpen: true,
      modalOpen: false,
      currentModal: null,
      theme: 'light',

      // Auth actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Category actions
      fetchCategories: async () => {
        try {
          set({ categoryLoading: true });
          const response = await api.get('/categories');
          set({ categories: response.data.data, categoryLoading: false, categoryError: null });
        } catch (error) {
          set({ 
            categoryError: error.response?.data?.message || 'Failed to fetch categories',
            categoryLoading: false 
          });
        }
      },

      addCategory: async (categoryData) => {
        try {
          set({ categoryLoading: true });
          const response = await api.post('/categories', categoryData);
          set(state => ({ 
            categories: [...state.categories, response.data.data],
            categoryLoading: false,
            categoryError: null
          }));
          return response.data.data;
        } catch (error) {
          set({ 
            categoryError: error.response?.data?.message || 'Failed to add category',
            categoryLoading: false 
          });
          throw error;
        }
      },

      updateCategory: async (id, categoryData) => {
        try {
          set({ categoryLoading: true });
          const response = await api.put(`/categories/${id}`, categoryData);
          set(state => ({
            categories: state.categories.map(cat => 
              cat._id === id ? response.data.data : cat
            ),
            categoryLoading: false,
            categoryError: null
          }));
          return response.data.data;
        } catch (error) {
          set({ 
            categoryError: error.response?.data?.message || 'Failed to update category',
            categoryLoading: false 
          });
          throw error;
        }
      },

      deleteCategory: async (id) => {
        try {
          set({ categoryLoading: true });
          await api.delete(`/categories/${id}`);
          set(state => ({
            categories: state.categories.filter(cat => cat._id !== id),
            categoryLoading: false,
            categoryError: null
          }));
        } catch (error) {
          set({ 
            categoryError: error.response?.data?.message || 'Failed to delete category',
            categoryLoading: false 
          });
          throw error;
        }
      },

      // Transaction actions
      fetchTransactions: async (filters = {}) => {
        try {
          set({ transactionLoading: true });
          const queryString = new URLSearchParams(filters).toString();
          const response = await api.get(`/transactions?${queryString}`);
          set({ 
            transactions: response.data.data,
            transactionLoading: false,
            transactionError: null
          });
        } catch (error) {
          set({ 
            transactionError: error.response?.data?.message || 'Failed to fetch transactions',
            transactionLoading: false 
          });
        }
      },

      addTransaction: async (transactionData) => {
        try {
          set({ transactionLoading: true });
          const response = await api.post('/transactions', transactionData);
          set(state => ({ 
            transactions: [...state.transactions, response.data.data],
            transactionLoading: false,
            transactionError: null
          }));
          return response.data.data;
        } catch (error) {
          set({ 
            transactionError: error.response?.data?.message || 'Failed to add transaction',
            transactionLoading: false 
          });
          throw error;
        }
      },

      // UI actions
      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
      setModalOpen: (isOpen, modalType = null) => 
        set({ modalOpen: isOpen, currentModal: modalType }),
      toggleTheme: () => 
        set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setDateRange: (range) => set({ dateRange: range }),
    }),
    {
      name: 'expense-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
      }),
    }
  )
);

export default useStore; 