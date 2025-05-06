import React, { useState, useRef, useEffect } from 'react';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  className?: string;
  contentClassName?: string;
  delay?: number;
  arrow?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  className = '',
  contentClassName = '',
  delay = 300,
  arrow = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const placementClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2',
  };

  const arrowClasses = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-gray-800 dark:border-t-white border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-gray-800 dark:border-b-white border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-l-gray-800 dark:border-l-white border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-r-gray-800 dark:border-r-white border-t-transparent border-b-transparent border-l-transparent',
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`inline-block relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      ref={childRef}
    >
      {children}
      {isVisible && (
        <div
          className={`z-50 absolute pointer-events-none whitespace-nowrap px-3 py-2 bg-gray-800 dark:bg-white text-white dark:text-gray-800 text-sm rounded-md shadow-lg ${
            placementClasses[placement]
          } ${contentClassName}`}
          ref={tooltipRef}
        >
          {content}
          {arrow && (
            <div
              className={`absolute w-0 h-0 border-4 ${arrowClasses[placement]}`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
