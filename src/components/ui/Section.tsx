import React from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  customTitle?: React.ReactNode;
  noPadding?: boolean;
  background?: 'default' | 'light' | 'dark' | 'primary' | 'gradient';
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  fullWidth = false,
  customTitle,
  noPadding = false,
  background = 'default'
}) => {
  const backgroundClasses = {
    default: 'bg-white dark:bg-gray-900',
    light: 'bg-gray-50 dark:bg-gray-800',
    dark: 'bg-gray-900 dark:bg-black text-white',
    primary: 'bg-primary-50 dark:bg-primary-900/20',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20'
  };

  const paddingClasses = noPadding ? '' : 'py-16 md:py-24';
  
  return (
    <section 
      id={id} 
      className={`${backgroundClasses[background]} ${paddingClasses} ${className}`}
    >
      <div className={`${!fullWidth ? 'container mx-auto px-4 md:px-6' : ''}`}>
        {(title || customTitle) && (
          <div className="mb-12 text-center">
            {customTitle || (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                {subtitle && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </>
            )}
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Section;
