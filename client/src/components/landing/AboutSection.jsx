import React from "react";
import { motion } from "framer-motion";
import { fadeIn, cardHover } from "../../animations/variants";
import aboutImage from "../../assets/images/about.jpg";

const AboutSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50/80 to-pink-50/80 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          {/* 3D Image Side */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative mb-16 lg:mb-0"
          >
            <div className="relative">
              {/* Main Image Container with 3D Effect */}
              <div className="w-full h-[500px] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-2xl transform rotate-6 transition-transform hover:rotate-8">
                <div className="absolute inset-[2px] bg-white rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50/50"></div>
                  <img
                    src={aboutImage}
                    alt="Financial Management"
                    className="h-full w-full object-cover opacity-90"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 w-40 bg-white rounded-xl shadow-xl p-4 backdrop-blur-sm border border-purple-100/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Users</p>
                    <p className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      1000+
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content Side */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:pl-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                BudgetBuddy
              </span>
            </h2>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              BudgetBuddy was created with college students in mind. We
              understand the challenge of managing your pocket money while
              juggling classes, activities, and social life.
            </p>

            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Our mission is to provide a simple yet powerful tool that helps
              students track their expenses, plan their budgets, and develop
              healthy financial habits that will benefit them throughout life.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-200/50 transform -rotate-6">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Secure & Private
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Your financial data is encrypted and stays private. We don't
                  sell your information.
                </p>
              </motion.div>

              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-200/50 transform rotate-6">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Highly Customizable
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Tailor the app to your needs with custom categories and
                  personalized budgets.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
