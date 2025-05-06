import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Blog from './components/sections/Blog';
import SEO from './components/SEO';
import MainLayout from './components/layouts/MainLayout';
import CursorSpotlight from './components/effects/CursorSpotlight';
import ScrollToTopButton from './components/effects/ScrollToTopButton';
import { initGA, pageview } from './utils/analytics';

/**
 * Utility function to debounce function calls
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => unknown>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    
    // Track page view with title
    pageview(
      window.location.pathname, 
      document.title,
      document.referrer
    );
    
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000);
    
    // Track route changes
    const handleRouteChange = () => {
      pageview(
        window.location.pathname,
        document.title
      );
    };
    
    // Set up scroll depth tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.floor((scrollTop / docHeight) * 100);
      
      import('./utils/analytics').then(({ trackScrollDepth }) => {
        trackScrollDepth(scrollPercentage, window.location.pathname);
      });
    };
    
    // Set up time on page tracking
    const startTime = new Date().getTime();
    const trackTimeInterval = setInterval(() => {
      const timeSpent = Math.floor((new Date().getTime() - startTime) / 1000);
      
      import('./utils/analytics').then(({ trackTimeOnPage }) => {
        trackTimeOnPage(timeSpent, window.location.pathname);
      });
    }, 10000); // Check every 10 seconds
    
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('scroll', debounce(handleScroll, 500));
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(trackTimeInterval);
    };
  }, []);

  return (
    <>
      <SEO canonicalUrl="/" />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <MainLayout>
            {/* Cursor spotlight effect */}
            <CursorSpotlight opacity={0.1} size={300} />
            
            {/* Scroll to top button */}
            <ScrollToTopButton />
            
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Blog />
            </motion.div>
          </MainLayout>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;