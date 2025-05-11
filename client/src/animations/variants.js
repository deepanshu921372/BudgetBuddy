export const fadeIn = (direction = "up", delay = 0) => {
  // Ensure delay is a finite number
  const safeDelay = typeof delay === 'number' && isFinite(delay) ? delay : 0;
  
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.6,
        delay: safeDelay,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const scaleIn = (delay = 0) => {
  return {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        delay,
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const cardHover = {
  rest: { scale: 1, boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)" },
  hover: { 
    scale: 1.03, 
    boxShadow: "0 15px 30px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    }
  },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1,
    }
  },
};