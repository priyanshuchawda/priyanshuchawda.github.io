import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import SEO from './SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO 
        title="Page Not Found | Priyanshu Chawda" 
        description="The page you're looking for doesn't exist. Let's get you back on track."
        canonicalUrl="/404"
        type="website"
        noIndex={true}
      />
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center px-4 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-labelledby="error-title"
        role="alert"
      >
        <div className="relative mb-8">
          <motion.div 
            className="absolute inset-0 blur-3xl bg-blue-400/20 dark:bg-blue-700/20 rounded-full"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            aria-hidden="true"
          />
          <motion.h1 
            id="error-title"
            className="relative text-8xl md:text-9xl font-extrabold text-blue-600 dark:text-blue-400 mb-2"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            404
          </motion.h1>
        </div>
        <motion.h2 
          className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
        >
          Page Not Found
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 max-w-md mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
        >
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >            <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Return to homepage"
          >
            <Home size={20} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Go back to previous page"
          >
            <Home className="rotate-180" size={20} aria-hidden="true" />
            <span>Go Back</span>
          </button>
        </motion.div>
        
        {/* Additional helpful information */}
        <motion.div
          className="mt-12 max-w-md text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="mb-2">Here are some helpful links:</p>          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2">
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm">Home</Link>
            <Link to="/projects" className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm">Projects</Link>
            <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-sm">Blog</Link>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFound;
