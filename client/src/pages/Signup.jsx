import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SignupForm from "../components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/30">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <SignupForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;