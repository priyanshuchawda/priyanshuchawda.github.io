import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  helperText,
  error,
  fullWidth = false,
  rows = 4,
  className = '',
  disabled = false,
  ...rest
}) => {
  const baseClasses = 'border rounded-md bg-white dark:bg-gray-800 p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';
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
      
      <textarea
        id={id}
        rows={rows}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...rest}
      />
      
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

export default Textarea;
