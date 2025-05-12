import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

const TermsOfService = () => {
  const sections = [
    {
      title: "Agreement to Terms",
      content: "These Terms of Service constitute a legally binding agreement made between you and BudgetBuddy ('we,' 'us,' or 'our'), concerning your access to and use of the BudgetBuddy website and mobile application. You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, you are prohibited from using the site and must discontinue use immediately."
    },
    {
      title: "Intellectual Property Rights",
      content: "Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and their selection and arrangement are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights."
    },
    {
      title: "User Representations",
      content: "By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation."
    },
    {
      title: "User Registration",
      content: "You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable."
    },
    {
      title: "Prohibited Activities",
      content: "You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to: (1) systematically retrieve data to create a collection or database; (2) trick, defraud, or mislead us and other users; (3) circumvent, disable, or interfere with security features of the Site; (4) use the Site or content for any revenue-generating endeavor; (5) use the Site to advertise or offer to sell goods and services."
    },
    {
      title: "User Generated Contributions",
      content: "The Site may invite you to chat, contribute to, or participate in blogs, message boards, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site. All contributions will be treated as non-confidential and non-proprietary."
    },
    {
      title: "Contribution License",
      content: "By posting your Contributions to any part of the Site, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, and distribute your Contributions in any form, medium, or technology now known or later developed for any purpose."
    },
    {
      title: "Mobile Application License",
      content: "Use License: If you access the Site via a mobile application, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the mobile application on wireless electronic devices owned or controlled by you, and to access and use the mobile application on such devices strictly in accordance with the terms and conditions of this license."
    },
    {
      title: "Term and Termination",
      content: "These Terms of Service shall remain in full force and effect while you use the Site. Without limiting any other provision of these terms, we reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the site to any person for any reason or for no reason, including without limitation for breach of any representation, warranty, or covenant contained in these Terms of Service or of any applicable law or regulation."
    },
    {
      title: "Modifications and Interruptions",
      content: "We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Site."
    },
    {
      title: "Governing Law",
      content: "These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of the state where BudgetBuddy's principle place of business is located, without regard to its conflict of law principles."
    },
    {
      title: "Dispute Resolution",
      content: "Any legal action of whatever nature brought by either you or us shall be commenced or prosecuted in the state and federal courts located where our principle place of business is located, and you and we hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such courts."
    },
    {
      title: "Corrections",
      content: "There may be information on the Site that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/30">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ml-2">
                Service
              </span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Last Updated: May 10, 2025
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8 mb-8"
          >
            <p className="text-gray-600 leading-relaxed">
              Welcome to BudgetBuddy! These Terms of Service govern your use of our website and mobile application operated by BudgetBuddy, Inc. Our Services are designed to help you track and manage your personal finances.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Table of Contents
            </h2>
            <ul className="list-decimal list-inside space-y-2 text-gray-600">
              {sections.map((section, index) => (
                <li key={index} className="hover:text-purple-600 transition-colors">
                  <a href={`#section-${index}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                id={`section-${index}`}
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.05) }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8"
              >
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8 mt-8"
          >
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4">
              <p className="text-gray-700 font-medium">BudgetBuddy</p>
              <p className="text-gray-600">Email: budgettbuddy@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService; 