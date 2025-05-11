import React, { createContext, useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../config/firebase";
import api from "../utils/api";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing token and user data
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    // Set persistence to SESSION instead of LOCAL to avoid persistence issues
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const token = await user.getIdToken();
              const { displayName, email, uid, providerData } = user;
              const provider = providerData[0]?.providerId?.replace('.com', '') || 'password';

              // Sync with backend
              const response = await api.post('/auth/firebase', {
                name: displayName || email?.split('@')[0] || 'User',
                email,
                firebaseUid: uid,
                provider
              });

              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              
              setCurrentUser(response.data.user);
              setIsAuthenticated(true);
            } catch (error) {
              console.error('Auth sync error:', error);
              await signOut(auth);
              setCurrentUser(null);
              setIsAuthenticated(false);
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          } else {
            setCurrentUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error('Error setting persistence:', error);
        setLoading(false);
      });
  }, []);

  const handleAuthError = (error) => {
    let errorMessage = 'An error occurred during authentication.';
    
    console.error('Auth Error Details:', {
      code: error.code,
      message: error.message,
      fullError: error
    });
    
    switch (error.code) {
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email. Please sign up first.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'An account already exists with this email. Please log in instead.';
        break;
      case 'auth/popup-closed-by-user':
        errorMessage = 'Authentication cancelled. Please try again.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address format.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'This login method is not enabled. Please contact support.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later.';
        break;
      default:
        errorMessage = error.message || errorMessage;
    }
    
    toast.error(errorMessage);
    return errorMessage;
  };

  const handleAuthSuccess = async (firebaseUser) => {
    try {
      if (!firebaseUser) {
        throw new Error('No user data received after authentication');
      }

      const token = await firebaseUser.getIdToken();
      if (!token) {
        throw new Error('Failed to get authentication token');
      }

      const { displayName, email, uid, providerData } = firebaseUser;
      const provider = providerData[0]?.providerId?.replace('.com', '') || 'password';

      console.log('Auth Success - User Data:', {
        name: displayName || email?.split('@')[0],
        email,
        uid,
        provider
      });

      // Sync with backend
      const response = await api.post('/auth/firebase', {
        name: displayName || email?.split('@')[0] || 'User',
        email,
        firebaseUid: uid,
        provider,
        token
      });

      if (!response.data || !response.data.token) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setCurrentUser(response.data.user);
      setIsAuthenticated(true);
      
      toast.success('Successfully logged in!');
      return response.data;
    } catch (error) {
      console.error('Auth Success Handler Error:', error);
      await signOut(auth);
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login for email:', email);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (!result || !result.user) {
        throw new Error('No user data received after login');
      }

      return handleAuthSuccess(result.user);
    } catch (error) {
      console.error('Login Error:', error);
      handleAuthError(error);
      throw error;
    }
  };

  const signup = async (email, password, fullName) => {
    try {
      if (!email || !password || !fullName) {
        throw new Error('Email, password, and full name are required');
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (!result || !result.user) {
        throw new Error('No user data received after signup');
      }

      // Update the user's display name using the new API
      await updateProfile(result.user, {
        displayName: fullName
      });

      return handleAuthSuccess(result.user);
    } catch (error) {
      console.error('Signup Error:', error);
      handleAuthError(error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return handleAuthSuccess(result.user);
    } catch (error) {
      console.error('Google Login Error:', error);
      handleAuthError(error);
      throw error;
    }
  };

  const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      return handleAuthSuccess(result.user);
    } catch (error) {
      console.error('Github Login Error:', error);
      handleAuthError(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success('Successfully logged out!');
    } catch (error) {
      console.error('Logout Error:', error);
      toast.error('Error logging out. Please try again.');
      throw error;
    }
  };

  const updateUserData = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    currentUser,
    setCurrentUser: updateUserData,
    loading,
    isAuthenticated,
    login,
    signup,
    loginWithGoogle,
    loginWithGithub,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;