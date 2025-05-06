import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  padding?: boolean;
  centered?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
  none: ''
};

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = true,
  centered = true
}) => {
  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';
  const centeringClasses = centered ? 'mx-auto' : '';
  
  return (
    <div className={`${maxWidthClasses[maxWidth]} ${paddingClasses} ${centeringClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
