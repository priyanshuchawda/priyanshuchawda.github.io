import React from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  title?: string;
  className?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const variantStyles = {
  info: 'bg-primary-50 text-primary-800 border-primary-200 dark:bg-primary-900/30 dark:text-primary-200 dark:border-primary-800',
  success: 'bg-success-50 text-success-800 border-success-200 dark:bg-success-900/30 dark:text-success-200 dark:border-success-800',
  warning: 'bg-accent-50 text-accent-800 border-accent-200 dark:bg-accent-900/30 dark:text-accent-200 dark:border-accent-800',
  error: 'bg-error-50 text-error-800 border-error-200 dark:bg-error-900/30 dark:text-error-200 dark:border-error-800',
};

const iconVariants = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  className = '',
  icon,
  onClose,
}) => {
  return (
    <div className={`border rounded-lg p-4 ${variantStyles[variant]} ${className}`}>
      <div className="flex">
        {(icon || iconVariants[variant]) && (
          <div className="flex-shrink-0 mr-3">
            {icon || iconVariants[variant]}
          </div>
        )}
        <div className="flex-grow">
          {title && (
            <h3 className="font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button 
            type="button" 
            className="flex-shrink-0 ml-3 -mt-1 -mr-1 rounded-full p-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
            onClick={onClose}
            aria-label="Close alert"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
