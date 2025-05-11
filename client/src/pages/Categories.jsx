import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import Sidebar from "../components/layout/Sidebar";
import Modal from "../components/common/Modal";
import useStore from "../store/useStore";
import { toast } from "react-toastify";

const CategoryForm = ({ onSubmit, initialData = null, onClose }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    icon: initialData?.icon || "🏷️",
    color: initialData?.color || "bg-blue-100 text-blue-600",
    type: initialData?.type || "expense"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const colors = [
    { bg: "bg-blue-100", text: "text-blue-600" },
    { bg: "bg-green-100", text: "text-green-600" },
    { bg: "bg-red-100", text: "text-red-600" },
    { bg: "bg-yellow-100", text: "text-yellow-600" },
    { bg: "bg-purple-100", text: "text-purple-600" },
    { bg: "bg-pink-100", text: "text-pink-600" },
    { bg: "bg-indigo-100", text: "text-indigo-600" },
    { bg: "bg-orange-100", text: "text-orange-600" },
  ];

  const icons = ["🏷️", "🛍️", "🚗", "🏠", "🍽️", "💊", "📚", "✈️", "🎮", "💰", "💳", "📱"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Icon</label>
        <div className="mt-1 grid grid-cols-6 gap-2">
          {icons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => setFormData({ ...formData, icon })}
              className={`p-2 text-xl rounded-md ${
                formData.icon === icon ? "bg-primary-100 ring-2 ring-primary-500" : "hover:bg-gray-100"
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <div className="mt-1 grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color.bg}
              type="button"
              onClick={() => setFormData({ ...formData, color: `${color.bg} ${color.text}` })}
              className={`p-2 rounded-md ${color.bg} ${color.text} ${
                formData.color === `${color.bg} ${color.text}` ? "ring-2 ring-primary-500" : ""
              }`}
            >
              Sample
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

const Categories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { 
    categories, 
    categoryLoading, 
    fetchCategories, 
    addCategory, 
    updateCategory, 
    deleteCategory 
  } = useStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddCategory = async (formData) => {
    try {
      await addCategory(formData);
      setModalOpen(false);
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateCategory = async (formData) => {
    try {
      await updateCategory(selectedCategory._id, formData);
      setModalOpen(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(selectedCategory._id);
      setDeleteConfirmOpen(false);
      setSelectedCategory(null);
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                  Categories
                </h1>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Category
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-6 lg:px-8">
          {categoryLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="p-4 pb-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-[3rem]`}>
                              {category.icon}
                            </div>
                            <div>
                              <h3 className="text-[1.1rem] font-semibold text-gray-800">{category.name}</h3>
                              <p className="text-sm text-gray-500 capitalize">{category.type}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedCategory(category);
                                setModalOpen(true);
                              }}
                              className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                            >
                              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCategory(category);
                                setDeleteConfirmOpen(true);
                              }}
                              className="text-gray-400 cursor-pointer hover:text-red-600 transition-colors duration-200"
                            >
                              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        title={selectedCategory ? "Edit Category" : "Add Category"}
      >
        <CategoryForm
          onSubmit={selectedCategory ? handleUpdateCategory : handleAddCategory}
          initialData={selectedCategory}
          onClose={() => {
            setModalOpen(false);
            setSelectedCategory(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setSelectedCategory(null);
        }}
        title="Delete Category"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-500">
            Are you sure you want to delete this category? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setDeleteConfirmOpen(false);
                setSelectedCategory(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCategory}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories; 