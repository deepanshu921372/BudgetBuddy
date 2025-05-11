import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import heroImage from "../../assets/images/hero.jpg";
import { useAuth } from "../../hooks/useAuth";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left mb-12 lg:mb-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Smart Budget Tracking for
              <span className="block pb-2 mt-2 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                College Students
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0">
              Take control of your pocket money with our easy-to-use expense tracker. Visualize spending, set budgets, and save more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                as="link"
                to={isAuthenticated ? "/dashboard" : "/signup"}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 cursor-pointer bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                {isAuthenticated ? "Let's Start" : "Get Started - It's Free"}
              </Button>
              
              <Button
                as="link"
                to="/features"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 cursor-pointer border-2 border-purple-500 text-purple-600 hover:bg-purple-50 transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
              <div className="flex items-center">
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="ml-2 text-sm sm:text-base text-gray-700">1000+ Active Users</p>
              </div>
              
              <div className="flex items-center">
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2 text-sm sm:text-base text-gray-700">Easy to Use</p>
              </div>
              
              <div className="flex items-center">
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2 text-sm sm:text-base text-gray-700">Secure & Private</p>
              </div>
            </div>
          </motion.div>

          {/* App Demo/Screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:pl-10"
          >
            <div className="relative mx-auto max-w-[320px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]">
              <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl rotate-2 shadow-xl relative overflow-hidden">
                <div className="absolute inset-1 bg-white/90 backdrop-blur-sm rounded-xl p-2">
                  <img
                    src={heroImage}
                    alt="Budget App Demo"
                    className="w-full h-full object-cover rounded-lg shadow-inner"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-12 w-32 sm:w-40 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 sm:p-3 border border-purple-100"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-success-100 rounded-full flex items-center justify-center text-success-600">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Savings</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-800">+24%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 sm:-top-6 -right-4 sm:-right-8 w-28 sm:w-36 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 sm:p-3 border border-purple-100"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-danger-100 rounded-full flex items-center justify-center text-danger-600">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expenses</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-800">-15%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;