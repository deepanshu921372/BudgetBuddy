import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import { Listbox } from '@headlessui/react';
import { usePersistentState } from "../context/PersistentStateContext";
import { toast } from 'react-toastify';
import api from '../utils/api';
import { IoMdLock } from "react-icons/io";


const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const { persistentState, updateSettings } = usePersistentState();
  const [activePage, setActivePage] = useState(() => {
    const savedState = localStorage.getItem('settingsActivePage');
    return savedState || 'general';
  });

  // Password state
  const [hasPassword, setHasPassword] = useState(null);
  const [isLoadingPasswordStatus, setIsLoadingPasswordStatus] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const formattedDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fetch password status
  useEffect(() => {
    const checkPasswordStatus = async () => {
      try {
        const response = await api.get('/auth/has-password');
        setHasPassword(response.data.hasPassword);
      } catch (error) {
        console.error('Error checking password status:', error);
        toast.error('Failed to check password status');
      } finally {
        setIsLoadingPasswordStatus(false);
      }
    };

    checkPasswordStatus();
  }, []);

  // Password set handler
  const handlePasswordAction = async (e) => {
    e.preventDefault();
    
    if (!passwordData.newPassword) {
      toast.error('Please enter new password');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await api.put('/auth/set-password', {
        newPassword: passwordData.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Password set response:', response.data);

      if (response.data?.success) {
        // Update token if returned
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Clear form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });

        // Update hasPassword status
        setHasPassword(true);

        toast.success('Password set successfully');
      } else {
        throw new Error(response.data?.error || 'Failed to set password');
      }
    } catch (error) {
      console.error('Password set error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to set password';
      toast.error(errorMessage);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  React.useEffect(() => {
    localStorage.setItem('settingsActivePage', activePage);
  }, [activePage]);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSettingChange = (category, setting, value) => {
    if (setting) {
      updateSettings({
        [category]: {
          ...persistentState.settings[category],
          [setting]: value
        }
      });
    } else {
      updateSettings({
        [category]: value
      });
    }
  };

  const currencies = [
    { id: 'USD', name: 'US Dollar', symbol: '$' },
    { id: 'EUR', name: 'Euro', symbol: '€' },
    { id: 'GBP', name: 'British Pound', symbol: '£' },
    { id: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { id: 'JPY', name: 'Japanese Yen', symbol: '¥' }
  ];

  const dateFormats = [
    { id: 'MM/DD/YYYY', name: 'MM/DD/YYYY', example: '12/31/2024' },
    { id: 'DD/MM/YYYY', name: 'DD/MM/YYYY', example: '31/12/2024' },
    { id: 'YYYY/MM/DD', name: 'YYYY/MM/DD', example: '2024/12/31' }
  ];

  const CustomSelect = ({ options, value, onChange, label, description }) => {
    const selectedOption = options.find(option => option.id === value);
    
    return (
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Label className="block text-sm font-medium text-gray-700 mb-2">{label}</Listbox.Label>
          {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
          <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-white rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm">
            <span className="block truncate">
              {selectedOption?.symbol && (
                <span className="mr-2 text-gray-500">{selectedOption.symbol}</span>
              )}
              {selectedOption?.name}
              {selectedOption?.example && (
                <span className="ml-2 text-gray-400">({selectedOption.example})</span>
              )}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option.id}
                className={({ active }) =>
                  `${active ? 'text-white bg-violet-600' : 'text-gray-900'}
                  cursor-pointer select-none relative py-3 pl-4 pr-4 transition-colors duration-150`
                }
              >
                {({ selected, active }) => (
                  <div className="flex items-center">
                    {option.symbol && (
                      <span className={`mr-2 ${active ? 'text-white' : 'text-gray-500'}`}>
                        {option.symbol}
                      </span>
                    )}
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                      {option.name}
                    </span>
                    {option.example && (
                      <span className={`ml-2 ${active ? 'text-white opacity-80' : 'text-gray-400'}`}>
                        ({option.example})
                      </span>
                    )}
                    {selected && (
                      <span className={`absolute inset-y-0 right-0 flex items-center pr-3 ${active ? 'text-white' : 'text-violet-600'}`}>
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    );
  };

  const SettingToggle = ({ label, description, enabled, onChange }) => (
    <div className="flex items-center justify-between py-4 hover:bg-gray-50 px-4 -mx-4 rounded-lg transition-colors duration-200">
      <div className="flex-1 pr-4">
        <h4 className="text-sm font-medium text-gray-900">{label}</h4>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? 'bg-violet-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  const settingsPages = {
    general: {
      title: "General Settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Currency Preferences
            </h3>
            <div className="space-y-6">
              <CustomSelect
                options={currencies}
                value={persistentState.settings.currency}
                onChange={(value) => handleSettingChange('currency', null, value)}
                label="Default Currency"
                description="Select your preferred currency for transactions"
              />
            </div>
          </div>
        </motion.div>
      )
    },
    notifications: {
      title: "Notifications",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Notifications
            </h3>
            <div className="space-y-2 divide-y divide-gray-100">
              <SettingToggle
                label="Weekly Report"
                description="Receive a weekly summary of your expenses"
                enabled={persistentState.settings.notifications.weeklyReport}
                onChange={(value) => handleSettingChange('notifications', 'weeklyReport', value)}
              />
              <SettingToggle
                label="Budget Alerts"
                description="Get notified when you're close to your budget limit"
                enabled={persistentState.settings.notifications.budgetAlerts}
                onChange={(value) => handleSettingChange('notifications', 'budgetAlerts', value)}
              />
              <SettingToggle
                label="Email Updates"
                description="Receive important account updates via email"
                enabled={persistentState.settings.notifications.emailUpdates}
                onChange={(value) => handleSettingChange('notifications', 'emailUpdates', value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Push Notifications
            </h3>
            <div className="space-y-2">
              <SettingToggle
                label="Push Notifications"
                description="Receive notifications on your device"
                enabled={persistentState.settings.notifications.pushNotifications}
                onChange={(value) => handleSettingChange('notifications', 'pushNotifications', value)}
              />
            </div>
          </div>
        </motion.div>
      )
    },
    ...((!hasPassword || isLoadingPasswordStatus) && {
      security: {
        title: "Security",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
        content: (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Set Up Password
              </h3>
              {isLoadingPasswordStatus ? (
                <div className="flex justify-center py-4">
                  <svg className="animate-spin h-6 w-6 text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : !hasPassword ? (
                <form onSubmit={handlePasswordAction} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.newPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow duration-200"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('newPassword')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.newPassword ? (
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow duration-200"
                        placeholder="Confirm password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.confirmPassword ? (
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className={`w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                      isUpdatingPassword ? 'bg-violet-400' : 'bg-violet-600 hover:bg-violet-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-200`}
                  >
                    {isUpdatingPassword ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isUpdatingPassword ? 'Setting Password...' : 'Set Password'}
                  </button>
                </form>
              ) : null}
            </div>
          </motion.div>
        )
      }
    })
  };

  useEffect(() => {
    if (hasPassword && !isLoadingPasswordStatus && activePage === 'security') {
      setActivePage('general');
    }
  }, [hasPassword, isLoadingPasswordStatus, activePage]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
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
                  Settings
                </h1>
              </div>
              <div className="text-sm font-medium text-gray-600">
                {formattedDate}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Settings Navigation */}
              <div className="w-full md:w-64 flex-shrink-0">
                <nav className="bg-white rounded-xl shadow-sm border border-gray-100">
                  {Object.entries(settingsPages).map(([key, { title, icon }]) => {
                    const isLocked = key === 'notifications';
                    return (
                      <button
                        key={key}
                        onClick={() => setActivePage(key)}
                        className={`w-full flex cursor-pointer items-center px-4 py-3 text-sm font-medium transition-colors duration-200
                          ${activePage === key && !isLocked ? 'text-violet-600 bg-violet-50 border-l-4 border-violet-600' : ''}
                          ${isLocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:text-violet-600 hover:bg-violet-50'}
                        `}
                        disabled={isLocked}
                      >
                        <span className={`mr-3 ${activePage === key && !isLocked ? 'text-violet-600' : 'text-gray-400'}`}>
                          {icon}
                        </span>
                        {title}
                        {isLocked && (
                          <span className="ml-auto flex items-center">
                            <IoMdLock className="text-red-500 text-xl" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Settings Content */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {settingsPages[activePage]?.content || (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                      <p className="text-gray-500">This section is not available.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings; 