// Animation utility for Framer Motion
import { Variants } from 'framer-motion';

// Fade in animation variants
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay: number = 0): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };
};

// Staggered children animation
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };
};

// Scale animation
export const scaleVariants = (delay: number = 0): Variants => {
  return {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.5,
        delay
      }
    }
  };
};

// Bounce animation
export const bounceVariants = (delay: number = 0): Variants => {
  return {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
        delay
      }
    }
  };
};

// Rotate and scale animation
export const rotateVariants = (delay: number = 0): Variants => {
  return {
    hidden: { rotate: -15, scale: 0.9, opacity: 0 },
    show: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
        delay
      }
    }
  };
};

// Text animation for sequential reveal
export const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15
    }
  }
};

// Text animation for character by character reveal
export const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: 'easeInOut'
    }
  })
};

// Container for the letter animation
export const textContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2
    }
  }
};

// Hover animation for cards
export const hoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Infinite floating animation
export const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 2,
    ease: 'easeInOut',
    repeat: Infinity
  }
};

// Pulse animation
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    ease: 'easeInOut',
    repeat: Infinity
  }
};
