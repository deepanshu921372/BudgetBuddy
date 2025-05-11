import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import googleIcon from "../assets/icons/google.svg";
import githubIcon from "../assets/icons/github.svg";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithGithub, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      // Navigation will be handled by the useEffect hook
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.code === "auth/invalid-credential"
          ? "Invalid email or password. Please check your credentials and try again."
          : err.code === "auth/too-many-requests"
          ? "Too many failed login attempts. Please try again later."
          : "Failed to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      // Navigation will be handled by the useEffect hook
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(
        err.code === "auth/popup-closed-by-user"
          ? "Login cancelled. Please try again."
          : "Failed to sign in with Google. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGithub();
      // Navigation will be handled by the useEffect hook
    } catch (err) {
      console.error("GitHub Login Error:", err);
      setError(
        err.code === "auth/popup-closed-by-user"
          ? "Login cancelled. Please try again."
          : "Failed to sign in with GitHub. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim()
    }));
    setError(""); // Clear error when user types
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/30">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100/20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mt-2">
                Log in to manage your expenses and track your budget
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-100 rounded"
                    disabled={loading}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 transition-colors duration-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="flex cursor-pointer items-center justify-center px-4 py-3 border border-purple-100 rounded-lg hover:bg-purple-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img src={googleIcon} alt="Google" className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleGithubLogin}
                  disabled={loading}
                  className="flex cursor-pointer items-center justify-center px-4 py-3 border border-purple-100 rounded-lg hover:bg-purple-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <img src={githubIcon} alt="GitHub" className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium text-gray-700">GitHub</span>
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-8">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-300">
                  Sign up for free
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;