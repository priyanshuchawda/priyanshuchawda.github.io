import React, { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const sizeClasses = {
  sm: 'py-1 px-2 text-sm',
  md: 'py-2 px-3 text-base',
  lg: 'py-3 px-4 text-lg',
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  helperText,
  error,
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  ...rest
}) => {
  const baseClasses = 'border rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';
  const widthClasses = fullWidth ? 'w-full' : '';
  const stateClasses = error 
    ? 'border-error-500 text-error-900 dark:text-error-200 placeholder-error-300' 
    : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100';
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700' : '';
  
  return (
    <div className={`mb-4 ${widthClasses}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          id={id}
          className={`
            ${baseClasses} 
            ${sizeClasses[size]} 
            ${stateClasses} 
            ${disabledClasses} 
            ${leftIcon ? 'pl-10' : ''} 
            ${rightIcon ? 'pr-10' : ''} 
            ${className}
          `}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...rest}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      
      {helperText && !error && (
        <p id={`${id}-helper`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
      
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-error-600 dark:text-error-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
