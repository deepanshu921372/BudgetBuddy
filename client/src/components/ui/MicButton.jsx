import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdMic } from "react-icons/md";

const ListeningWaves = () => (
  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <motion.span
      className="absolute rounded-full border-2 border-violet-300"
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{ scale: 1.4, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
      style={{ width: 56, height: 56 }}
    />
    <motion.span
      className="absolute rounded-full border-2 border-pink-300"
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{ scale: 1.8, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop", delay: 0.3 }}
      style={{ width: 56, height: 56 }}
    />
  </span>
);

const MicButton = () => {
  const [listening, setListening] = useState(false);

  const handleToggle = () => {
    setListening((prev) => !prev);
  };

  return (
    <div className="fixed z-50 bottom-3 right-3 sm:bottom-5 sm:right-5 flex items-end">
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mr-3 mb-2 px-4 py-2 rounded-lg bg-white shadow text-violet-700 font-semibold text-sm border border-violet-100"
          >
            Listening...
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={handleToggle}
        aria-label={listening ? "Stop Listening" : "Start Listening"}
        className={`relative focus:outline-none rounded-full shadow-lg transition-all duration-300 border-4 border-white p-0.5 ${
          listening
            ? "bg-gradient-to-br from-violet-600 to-pink-500 border-violet-300 animate-pulse"
            : "bg-gradient-to-br from-violet-500 to-purple-500 border-violet-200 hover:scale-105"
        }`}
        style={{ width: 64, height: 64 }}
      >
        {listening && <ListeningWaves />}
        <span className="flex cursor-pointer items-center justify-center w-full h-full relative z-10">
          <MdMic className={`w-8 h-8 text-white transition-all duration-300 ${listening ? "opacity-80" : "opacity-100"}`} />
        </span>
      </button>
    </div>
  );
};

export default MicButton; 