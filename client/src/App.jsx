import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import { PersistentStateProvider } from "./context/PersistentStateContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import MicButton from "./components/ui/MicButton";
import AddTransactionModal from "./components/modals/AddTransactionModal";
import { useTransactions } from "./hooks/useTransactions";

const App = () => {
  const [isGlobalAddModalOpen, setIsGlobalAddModalOpen] = useState(false);
  const [addModalInitialData, setAddModalInitialData] = useState({});

  const { addTransaction } = useTransactions();

  useEffect(() => {
    const openModal = (e) => {
      if (e.detail && typeof e.detail === 'object') {
        setAddModalInitialData(e.detail);
      }
      setIsGlobalAddModalOpen(true);
    };
    window.addEventListener("openAddTransactionModal", openModal);
    return () => window.removeEventListener("openAddTransactionModal", openModal);
  }, []);

  const handleAddTransaction = (transactionData) => {
    console.log("handleAddTransaction", transactionData);
    addTransaction(transactionData);
    setIsGlobalAddModalOpen(false);
    setAddModalInitialData({});
  };

  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <PersistentStateProvider>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/transactions/income"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/transactions/expenses"
                element={
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories" 
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <MicButton />
            <AddTransactionModal
              isOpen={isGlobalAddModalOpen}
              onClose={() => { setIsGlobalAddModalOpen(false); setAddModalInitialData({}); }}
              onSubmit={handleAddTransaction}
              initialData={addModalInitialData}
            />
          </PersistentStateProvider>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
};

export default App;