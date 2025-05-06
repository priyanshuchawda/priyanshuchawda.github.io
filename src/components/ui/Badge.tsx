import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  pill?: boolean;
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
  secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
  accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200',
  success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
  error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-base px-3 py-1',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  pill = false,
}) => {
  const roundedStyle = pill ? 'rounded-full' : 'rounded-md';
  
  return (
    <span 
      className={`inline-flex items-center font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyle} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
