import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  className = '',
  children,
  hoverable = false,
  bordered = true,
}) => {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden';
  const borderStyles = bordered ? 'border border-gray-200 dark:border-gray-700' : '';
  const hoverStyles = hoverable ? 'transform-gpu transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : '';
  
  return (
    <div className={`${baseStyles} ${borderStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 pt-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardMedia: React.FC<{ 
  className?: string; 
  src: string; 
  alt: string;
  aspectRatio?: 'auto' | 'square' | 'video' | '4/3';
}> = ({ 
  className = '', 
  src, 
  alt,
  aspectRatio = 'auto'
}) => {
  const aspectRatioClasses = {
    'auto': '',
    'square': 'aspect-square',
    'video': 'aspect-video',
    '4/3': 'aspect-4/3'
  };

  return (
    <div className={`${aspectRatioClasses[aspectRatio]} overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const CardBody: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 pb-6 pt-2 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
