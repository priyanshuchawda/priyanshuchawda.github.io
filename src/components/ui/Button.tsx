import React, { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  isRouterLink?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500',
  accent: 'bg-accent-500 hover:bg-accent-600 text-white focus:ring-accent-500',
  outline: 'bg-transparent hover:bg-gray-100 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 focus:ring-gray-500',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-800 dark:text-gray-200 dark:hover:bg-gray-800 focus:ring-gray-500',
};

const sizeStyles = {
  sm: 'text-xs px-2.5 py-1.5 rounded',
  md: 'text-sm px-4 py-2 rounded-md',
  lg: 'text-base px-5 py-2.5 rounded-md',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  isRouterLink = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  ...rest
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900';
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`;
  
  // If it's an external link
  if (href && isExternal) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </a>
    );
  }
  
  // If it's a router link
  if (href && isRouterLink) {
    return (
      <Link 
        to={href}
        className={combinedClassName}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Link>
    );
  }
  
  // Default button
  return (
    <button 
      className={combinedClassName}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
