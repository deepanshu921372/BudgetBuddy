import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Computer Science Student",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "BudgetBuddy has completely transformed how I manage my finances as a student. I now know exactly where my money goes and can save for things that matter.",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Business Major",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content:
      "As a business student, I appreciate how BudgetBuddy helps me apply financial principles to my own life. The visualization tools are especially helpful!",
  },
  {
    id: 3,
    name: "Mike Torres",
    role: "Engineering Student",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    content:
      "Before BudgetBuddy, I was always running out of money midway through the month. Now I can plan ahead and even save a little each month.",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join thousands of students who are taking control of their finances with BudgetBuddy.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-10">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-purple-100/20 text-gray-700 hover:bg-purple-50 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[current].id}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex flex-col justify-center p-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100/20"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-purple-100 shadow-lg">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-xl text-center text-gray-700 mb-8 italic">
                    "{testimonials[current].content}"
                  </p>

                  <div className="text-center">
                    <h4 className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{testimonials[current].name}</h4>
                    <p className="text-gray-500">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-10">
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/80 cursor-pointer backdrop-blur-sm shadow-lg border border-purple-100/20 text-gray-700 hover:bg-purple-50 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 cursor-pointer rounded-full transition-all duration-300 ${
                  current === index 
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 scale-125" 
                    : "bg-gray-300 hover:bg-purple-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;