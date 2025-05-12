import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/logo2.png";
import logoText from "../../assets/images/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const { isAuthenticated } = useAuth();

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;

    const formData = {
      name: 'Newsletter Subscriber',
      email: email,
      subject: 'Newsletter Subscription',
      message: 'Please subscribe me to the newsletter.',
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'There was an error sending your subscription request.');
      }

      toast.success('Subscription request sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'There was an error sending your subscription request.');
    }
  };

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-purple-100/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img src={logo} alt="BudgetBuddy" className="h-10 rounded-full w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                <img src={logoText} alt="BudgetBuddy" className="h-10 w-auto" />
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Smart financial management for students. Track expenses, plan
              budgets, and achieve your financial goals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                      onClick={handleLinkClick}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/features"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Profile
                    </Link>
                  </li>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                      onClick={handleLinkClick}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/help-center"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                  onClick={handleLinkClick}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                  onClick={handleLinkClick}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                  onClick={handleLinkClick}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for tips and updates.
            </p>
            <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 cursor-pointer bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-100/20">
          <p className="text-center text-gray-600">
            © 2025 BudgetBuddy. All rights reserved.
          </p>
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
