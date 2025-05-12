import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdMic, MdMicOff } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const aboutText = `BudgetBuddy was created with college students in mind. We understand the challenge of managing your pocket money while juggling classes, activities, and social life. Our mission is to provide a simple yet powerful tool that helps students track their expenses, plan their budgets, and develop healthy financial habits that will benefit them throughout life.`;

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
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // For dashboard/transactions modal control
  const dashboardModalRef = useRef();
  const transactionsModalRef = useRef();

  // Helper: Speak text
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.pitch = 1;
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utter);
    }
  };

  // Helper: Stop speaking
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Helper: Ask for mic permission
  const requestMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (e) {
      setResponse("Microphone permission denied. Please allow access.");
      speak("Microphone permission denied. Please allow access.");
      return false;
    }
  };

  // Command parser
  const handleCommand = async (transcript) => {
    const text = transcript.toLowerCase();
    // Add Transaction Modal field filling
    const fieldMap = [
      { key: 'type', match: /type (should be |is |to be )?(income|expense)/ },
      { key: 'amount', match: /amount (should be |is |to be )?(\d+(?:\.\d+)?)/ },
      { key: 'description', match: /description (should be |is |to be )?([\w\s]+)/ },
      { key: 'category', match: /category (should be |is |to be )?([\w\s]+)/ },
      { key: 'date', match: /date (should be |is |to be )?(today|\d{4}-\d{2}-\d{2})/ },
    ];
    let fieldFilled = false;
    for (const { key, match } of fieldMap) {
      const m = text.match(match);
      if (m) {
        let value = m[2]?.trim() || m[1]?.trim();
        if (key === 'date' && value === 'today') {
          value = new Date().toISOString().split('T')[0];
        }
        window.dispatchEvent(new CustomEvent('fillAddTransactionField', { detail: { field: key, value } }));
        speak(`Set ${key} to ${value}`);
        setResponse(`Set ${key} to ${value}`);
        fieldFilled = true;
        break;
      }
    }
    if (fieldFilled) return;
    if (text.match(/submit/)) {
      window.dispatchEvent(new CustomEvent('submitAddTransactionForm'));
      speak('Adding transaction.');
      setResponse('Adding transaction.');
      return;
    }
    // Navigation
    if (text.includes("home")) {
      speak("Okay, navigating to home page.");
      setResponse("Okay, navigating to home page.");
      navigate("/");
      return;
    }
    if (text.includes("login")) {
      speak("Okay, navigating to login page.");
      setResponse("Okay, navigating to login page.");
      navigate("/login");
      return;
    }
    if (text.includes("signup")) {
      speak("Okay, navigating to signup page.");
      setResponse("Okay, navigating to signup page.");
      navigate("/signup");
      return;
    }
    
    if (text.includes("dashboard")) {
      speak("Okay, navigating to dashboard page.");
      setResponse("Okay, navigating to dashboard page.");
      navigate("/dashboard");
      return;
    }
    if (text.includes("transactions") || text.includes("transaction page") || text.includes("go to transactions")) {
      speak("Navigating to transactions page.");
      setResponse("Navigating to transactions page.");
      navigate("/transactions");
      return;
    }
    if (text.includes("transaction") && text.includes("add")) {
      speak("Opening add transaction form.");
      setResponse("Opening add transaction form.");
      setTimeout(() => {
        const event = new CustomEvent("openAddTransactionModal");
        window.dispatchEvent(event);
      }, 500);
      return;
    }
    if (text.includes("analytics")) {
      speak("Navigating to analytics page.");
      setResponse("Navigating to analytics page.");
      navigate("/analytics");
      return;
    }
    if (text.includes("category") || text.includes("categories")) {
      speak("Navigating to categories page.");
      setResponse("Navigating to categories page.");
      navigate("/categories");
      return;
    }
    if (text.includes("settings")) {
      speak("Navigating to settings page.");
      setResponse("Navigating to settings page.");
      navigate("/settings");
      return;
    }
    if (text.includes("profile")) {
      speak("Navigating to profile page.");
      setResponse("Navigating to profile page.");
      navigate("/profile");
      return;
    }
    if (text.includes("help")) {
      speak("Navigating to help center.");
      setResponse("Navigating to help center.");
      navigate("/help-center");
      return;
    }
    if (text.includes("about") || text.includes("who are you")) {
      speak(aboutText);
      setResponse(aboutText);
      return;
    }
    if (text.includes("logout") || text.includes("log out")) {
      speak("Logging you out.");
      setResponse("Logging you out.");
      window.location.href = "/login";
      return;
    }
    if (text.includes("download transactions") || text.includes("download all transactions") || text.includes("export all")) {
      speak("Downloading all transactions as Excel.");
      setResponse("Downloading all transactions as Excel.");
      window.dispatchEvent(new CustomEvent("downloadTransactions"));
      return;
    }
    speak("Sorry, I didn't understand that. Please try again.");
    setResponse("Sorry, I didn't understand that. Please try again.");
  };

  // Listen for custom event to open modals
  React.useEffect(() => {
    const openModal = () => {
      if (location.pathname === "/dashboard") {
        const dashboardModalBtn = document.querySelector(
          'button[class*="Add Transaction"]'
        );
        if (dashboardModalBtn) dashboardModalBtn.click();
      } else if (location.pathname.startsWith("/transactions")) {
        const transactionsModalBtn = document.querySelector(
          'button[class*="Add Your First Transaction"],button[class*="Add Transaction"]'
        );
        if (transactionsModalBtn) transactionsModalBtn.click();
      }
    };
    window.addEventListener("openAddTransactionModal", openModal);
    return () => window.removeEventListener("openAddTransactionModal", openModal);
  }, [location.pathname]);

  // Start/stop recognition
  const handleToggle = async () => {
    if (listening) {
      setListening(false);
      if (recognitionRef.current) recognitionRef.current.stop();
      stopSpeaking(); // Stop any ongoing speech
      return;
    }
    stopSpeaking(); // Stop any ongoing speech before starting
    const hasPermission = await requestMicPermission();
    if (!hasPermission) return;
    setListening(true);
    setResponse("");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setResponse("Speech recognition is not supported in this browser.");
      speak("Speech recognition is not supported in this browser.");
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      setResponse(`You said: ${transcript}`);
      handleCommand(transcript);
    };
    recognition.onerror = (event) => {
      setListening(false);
      setResponse("Error: " + event.error);
      speak("Sorry, there was an error with speech recognition.");
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  // Hide response after 2 seconds if not listening or speaking
  React.useEffect(() => {
    if (!listening && !isSpeaking && response) {
      const timer = setTimeout(() => setResponse("") , 2000);
      return () => clearTimeout(timer);
    }
  }, [response, listening, isSpeaking]);

  return (
    <div className="fixed z-50 bottom-3 right-3 sm:bottom-5 sm:right-5 flex items-end">
      <div className="flex flex-row-reverse items-end">
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
            {isSpeaking ? (
              <MdMicOff className={`w-8 h-8 text-white transition-all duration-300 opacity-100`} />
            ) : (
              <MdMic className={`w-8 h-8 text-white transition-all duration-300 ${listening ? "opacity-80" : "opacity-100"}`} />
            )}
          </span>
        </button>
        <div className="flex flex-col items-end">
          <AnimatePresence>
            {listening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mr-3 mb-2 px-4 py-2 rounded-lg bg-white shadow text-violet-700 font-semibold text-sm border border-violet-100"
                style={{ maxWidth: 320 }}
              >
                Listening...
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {response && !listening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mr-3 mb-2 px-4 py-2 rounded-lg bg-white shadow text-violet-700 font-semibold text-sm border border-violet-100"
                style={{ maxWidth: 320 }}
              >
                {response}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MicButton; 