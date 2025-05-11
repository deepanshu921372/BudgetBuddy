import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async (type) => {
    try {
      setLoading(true);
      const queryParams = type ? `?type=${type}` : '';
      const response = await api.get(`/categories${queryParams}`);
      setCategories(response.data.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch categories');
      toast.error(error.response?.data?.error || 'Failed to fetch categories', {
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

  const addCategory = async (categoryData) => {
    try {
      setLoading(true);
      const response = await api.post('/categories', categoryData);
      setCategories(prev => [...prev, response.data.data]);
      toast.success('Category added successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add category';
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

  const updateCategory = async (id, categoryData) => {
    try {
      setLoading(true);
      const response = await api.put(`/categories/${id}`, categoryData);
      setCategories(prev =>
        prev.map(category =>
          category._id === id ? response.data.data : category
        )
      );
      toast.success('Category updated successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update category', {
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

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/categories/${id}`);
      setCategories(prev => prev.filter(category => category._id !== id));
      toast.success('Category deleted successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete category', {
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

  const getCategoriesByType = useCallback((type) => {
    return categories.filter(category => category.type === type);
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByType
  };
}; 