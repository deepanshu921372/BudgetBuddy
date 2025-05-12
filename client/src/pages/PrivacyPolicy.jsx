import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use."
    },
    {
      title: "How We Use Your Information",
      content: "We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We use the information we collect or receive to provide you with the services you've requested, to facilitate account creation and authentication, and to manage user accounts."
    },
    {
      title: "Will Your Information Be Shared With Anyone?",
      content: "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data based on the following legal basis: consent, legitimate interests, performance of a contract, legal obligations, and vital interests."
    },
    {
      title: "Do We Use Cookies And Other Tracking Technologies?",
      content: "We may use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy. We use cookies to keep you logged in, remember your preferences, and provide information for future development of the app."
    },
    {
      title: "How Long Do We Keep Your Information?",
      content: "We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law. No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us."
    },
    {
      title: "How Do We Keep Your Information Safe?",
      content: "We aim to protect your personal information through a system of organizational and technical security measures. We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure."
    },
    {
      title: "Do We Collect Information From Minors?",
      content: "We do not knowingly collect data from or market to children under 18 years of age. By using the website, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the website."
    },
    {
      title: "Your Privacy Rights",
      content: "You have rights related to your personal information. Depending on your location, you may have the right to request access to your personal data, to request correction of inaccurate data, to request erasure of your data, to object to processing, and to request restrictions on processing. You may also have rights to data portability and to lodge a complaint with a supervisory authority."
    },
    {
      title: "Controls For Do-Not-Track Features",
      content: "Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. We respond to DNT browser signals by honoring user preferences."
    },
    {
      title: "Updates To This Policy",
      content: "We may update this privacy policy from time to time. The updated version will be indicated by an updated 'Revised' date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification."
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
              Privacy
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ml-2">
                Policy
              </span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Last Updated: May 15, 2025
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
              At BudgetBuddy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.05) }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8"
              >
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {section.title}
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
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20 p-8 mt-8"
          >
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy; 