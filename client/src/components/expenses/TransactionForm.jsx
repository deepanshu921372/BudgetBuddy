import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../ui/Input";
import Button from "../ui/Button";

const categories = [
  { id: "food", name: "Food" },
  { id: "transport", name: "Transport" },
  { id: "entertainment", name: "Entertainment" },
  { id: "utilities", name: "Utilities" },
  { id: "education", name: "Education" },
  { id: "health", name: "Health" },
  { id: "other", name: "Other" },
];

const incomeCategories = [
  { id: "salary", name: "Salary" },
  { id: "freelance", name: "Freelance" },
  { id: "gift", name: "Gift" },
  { id: "investment", name: "Investment" },
  { id: "other", name: "Other" },
];

const TransactionForm = ({ type = "expense", onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    description: initialData.description || "",
    amount: initialData.amount || "",
    category: initialData.category || (type === "expense" ? "food" : "salary"),
    date: initialData.date ? new Date(initialData.date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
    notes: initialData.notes || "",
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const submittedData = {
      ...formData,
      amount: parseFloat(formData.amount),
      type,
    };
    
    onSubmit(submittedData);
  };

  const catOptions = type === "expense" ? categories : incomeCategories;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder={`Enter ${type} description`}
        error={errors.description}
        required
      />

      <Input
        type="number"
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="0.00"
        error={errors.amount}
        required
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <motion.select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition-all duration-200 ease-in-out"
          whileFocus={{ scale: 1.01 }}
        >
          {catOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </motion.select>
      </div>

      <Input
        type="date"
        label="Date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <motion.textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition-all duration-200 ease-in-out"
          placeholder="Add any additional notes here..."
          whileFocus={{ scale: 1.01 }}
        />
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onCancel} fullWidth>
          Cancel
        </Button>
        <Button type="submit" variant={type === "expense" ? "danger" : "success"} fullWidth>
          {initialData._id ? "Update" : "Add"} {type === "expense" ? "Expense" : "Income"}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;