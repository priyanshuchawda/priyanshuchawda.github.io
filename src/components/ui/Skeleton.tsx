import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = 'md',
  animate = true,
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 ${roundedClasses[rounded]} ${
        animate ? 'animate-pulse' : ''
      } ${className}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
};

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
  lastLineWidth = '70%',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height="0.75rem"
          width={index === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
};

export const SkeletonAvatar: React.FC<{ size?: string; className?: string }> = ({
  size = '3rem',
  className = '',
}) => {
  return <Skeleton height={size} width={size} rounded="full" className={className} />;
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md ${className}`}>
      <Skeleton height="12rem" rounded="none" />
      <div className="p-4 space-y-4">
        <Skeleton height="1.5rem" width="80%" />
        <SkeletonText lines={2} />
        <div className="flex space-x-2 pt-2">
          <Skeleton height="1.25rem" width="4rem" rounded="full" />
          <Skeleton height="1.25rem" width="4rem" rounded="full" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
