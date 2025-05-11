import { useState } from 'react';
import { useAuth } from './useAuth';
import api from '../utils/api';
import { toast } from 'react-toastify';

export const useProfile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put('/users/profile', profileData);
      
      if (response.data) {
        setCurrentUser(response.data);
        toast.success('Profile updated successfully!');
        return response.data;
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/users/me');
      
      if (response.data) {
        setCurrentUser(response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    loading,
    error,
    updateProfile,
    fetchProfile
  };
};

export default useProfile; 