import React from 'react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray';
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading content...', 
  fullScreen = false,
  size = 'md',
  color = 'blue',
  className = '',
}) => {
  // Define size values
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };
  
  // Define color values
  const colorMap = {
    blue: 'border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent',
    gray: 'border-gray-600 border-t-transparent dark:border-gray-400 dark:border-t-transparent',
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  const containerClass = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50" 
    : `w-full py-12 flex flex-col items-center justify-center ${className}`;

  // Spinner animation
  const spinnerAnimation = {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity,
    }
  };
  
  // Use the selected size and color
  const spinnerClasses = `rounded-full ${sizeMap[size]} ${colorMap[color]} animate-spin`;

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <motion.div 
        className="flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Loading Indicator Type: Dots */}
        <motion.div 
          className="flex space-x-2 mb-4"
          variants={container}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 md:w-4 md:h-4 bg-blue-600 dark:bg-blue-400 rounded-full"
              variants={item}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "loop",
                delay: index * 0.2,
              }}
              aria-hidden="true"
            />
          ))}
        </motion.div>
          {/* Spinner (Alternative Loading Style) */}
        <div className="relative hidden">
          <div className={spinnerClasses}></div>
        </div>
        
        {/* Message */}
        <motion.p 
          variants={item} 
          className="text-gray-600 dark:text-gray-300 font-medium"
        >
          {message}
        </motion.p>
        
        {/* Accessible text for screen readers */}
        <span className="sr-only">Loading content, please wait</span>
      </motion.div>
    </div>
  );
};

export default LoadingState;
