import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I add a new expense?",
      answer: "You can add a new expense by navigating to the Transactions page and clicking on the 'Add Expense' button. Fill in the required details like amount, category, date, and description, then click 'Save'."
    },
    {
      question: "How do I create a budget?",
      answer: "To create a budget, go to the Dashboard page and find the Budget section. Click on 'Create Budget', select a category, set your budget amount, and choose the time period. Click 'Save' to create your budget."
    },
    {
      question: "Can I export my transaction data?",
      answer: "Yes! Go to the Analytics page and look for the 'Export Data' button. You can export your data in CSV or PDF format for your records or further analysis."
    },
    {
      question: "How do I reset my password?",
      answer: "On the login page, click 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password."
    },
    {
      question: "How do I customize expense categories?",
      answer: "Navigate to the Categories page where you can view all your existing categories. Click 'Add Category' to create a new one or edit existing ones to better suit your financial tracking needs."
    },
    {
      question: "Is my financial data secure?",
      answer: "Absolutely! We use industry-standard encryption to protect your data. We never share your personal information with third parties without your explicit consent."
    }
  ];

  const supportOptions = [
    {
      title: "Email Support",
      description: "Get in touch with our support team directly via email.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: "support@budgetbuddy.com"
    },
    {
      title: "Knowledge Base",
      description: "Browse through our extensive knowledge base for detailed guides.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.776-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      action: "Browse Articles"
    },
    {
      title: "Community Forum",
      description: "Join our community to get help from other users and share tips.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      action: "Join Forum"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/30">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Can We
              <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                Help You Today?
              </span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions or reach out to our support team for assistance.
            </p>
          </motion.div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8 hover:shadow-xl hover:shadow-purple-100/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-200/50">
                  {option.icon}
                </div>
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {option.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {option.description}
                </p>
                <div className="text-purple-600 font-medium">
                  {option.title === "Email Support" ? (
                    <a href={`mailto:${option.action}`} className="hover:text-purple-700">{option.action}</a>
                  ) : (
                    <button className="hover:text-purple-700">{option.action}</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-purple-100 pb-6 last:border-b-0 last:pb-0"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Still Need Help?
            </h2>
            <form className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 rounded-lg border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your issue in detail..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 cursor-pointer bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300"
              >
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter; 