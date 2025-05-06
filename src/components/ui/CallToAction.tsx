import React from 'react';
import Button from './Button';

interface CallToActionProps {
  title: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  isExternal?: boolean;
  isRouterLink?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right';
  background?: 'light' | 'dark' | 'gradient';
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonHref,
  secondaryButtonHref,
  isExternal = false,
  isRouterLink = false,
  className = '',
  align = 'center',
  background = 'light',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const backgroundClasses = {
    light: 'bg-gray-50 dark:bg-gray-800',
    dark: 'bg-gray-800 dark:bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white',
  };

  return (
    <div 
      className={`${backgroundClasses[background]} px-6 py-12 sm:py-16 md:py-20 rounded-2xl ${alignClasses[align]} ${className}`}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
        
        {description && (
          <p className="mb-8 text-lg opacity-90">{description}</p>
        )}
        
        <div className={`flex gap-4 flex-wrap ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}>
          {primaryButtonText && (
            <Button
              variant="primary"
              onClick={onPrimaryClick}
              href={primaryButtonHref}
              isExternal={isExternal}
              isRouterLink={isRouterLink}
              className={background === 'gradient' ? 'bg-white text-primary-600 hover:bg-gray-100 hover:text-primary-700' : ''}
            >
              {primaryButtonText}
            </Button>
          )}
          
          {secondaryButtonText && (
            <Button
              variant={background === 'gradient' ? 'outline' : 'secondary'} 
              onClick={onSecondaryClick}
              href={secondaryButtonHref}
              isExternal={isExternal}
              isRouterLink={isRouterLink}
              className={background === 'gradient' ? 'border-white text-white hover:bg-white/10' : ''}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
