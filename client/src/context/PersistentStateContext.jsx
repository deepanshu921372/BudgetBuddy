import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PersistentStateContext = createContext();

export const usePersistentState = () => {
  const context = useContext(PersistentStateContext);
  if (!context) {
    throw new Error('usePersistentState must be used within a PersistentStateProvider');
  }
  return context;
};

export const PersistentStateProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state from localStorage or default values
  const [persistentState, setPersistentState] = useState(() => {
    const savedState = localStorage.getItem('persistentState');
    return savedState ? JSON.parse(savedState) : {
      lastPath: '/',
      settings: {
        currency: 'USD',
        notifications: {
          weeklyReport: true,
          budgetAlerts: true,
          emailUpdates: false,
          pushNotifications: true
        },
        language: 'en'
      },
      dashboard: {
        selectedTimeRange: 'month',
        selectedChartType: 'bar'
      },
      transactions: {
        currentPage: 1,
        filterType: 'all',
        sortBy: 'date',
        sortOrder: 'desc'
      },
      categories: {
        selectedTab: 'expense'
      }
    };
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('persistentState', JSON.stringify(persistentState));
  }, [persistentState]);

  // Update lastPath whenever location changes
  useEffect(() => {
    if (location.pathname !== persistentState.lastPath) {
      setPersistentState(prev => ({
        ...prev,
        lastPath: location.pathname
      }));
    }
  }, [location.pathname]);

  // Restore last path on initial load
  useEffect(() => {
    const savedState = localStorage.getItem('persistentState');
    if (savedState) {
      const { lastPath } = JSON.parse(savedState);
      if (location.pathname === '/' && lastPath !== '/') {
        navigate(lastPath);
      }
    }
  }, []);

  const updateSettings = (newSettings) => {
    setPersistentState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  const updateDashboardState = (newState) => {
    setPersistentState(prev => ({
      ...prev,
      dashboard: {
        ...prev.dashboard,
        ...newState
      }
    }));
  };

  const updateTransactionsState = (newState) => {
    setPersistentState(prev => ({
      ...prev,
      transactions: {
        ...prev.transactions,
        ...newState
      }
    }));
  };

  const updateCategoriesState = (newState) => {
    setPersistentState(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        ...newState
      }
    }));
  };

  return (
    <PersistentStateContext.Provider
      value={{
        persistentState,
        updateSettings,
        updateDashboardState,
        updateTransactionsState,
        updateCategoriesState
      }}
    >
      {children}
    </PersistentStateContext.Provider>
  );
}; 