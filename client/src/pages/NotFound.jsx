import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-8 flex items-center justify-center">
          <span className="text-white text-5xl font-bold">?</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button as={Link} to="/" variant="primary" size="lg" className="mx-auto">
          Go Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;