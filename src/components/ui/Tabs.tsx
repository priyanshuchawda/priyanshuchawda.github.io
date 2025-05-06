import React, { useState } from 'react';

interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  className = '',
  variant = 'default',
  fullWidth = false,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs.length > 0 ? tabs[0].id : ''));

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (onChange) {
      onChange(id);
    }
  };

  const variantClasses = {
    default: {
      container: 'border-b border-gray-200 dark:border-gray-700',
      tab: 'py-3 px-4 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      activeTab: 'border-primary-500 text-primary-600 dark:text-primary-400',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    pills: {
      container: 'mb-4',
      tab: 'py-2 px-4 rounded-full font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      activeTab: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    underline: {
      container: 'space-x-8 border-b border-gray-200 dark:border-gray-700',
      tab: 'py-3 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      activeTab: 'border-primary-500 text-gray-900 dark:text-white',
      disabled: 'opacity-50 cursor-not-allowed',
    },
  };

  const tabWidthClass = fullWidth ? 'flex-1 text-center' : '';

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex ${variant === 'underline' ? 'overflow-x-auto' : 'flex-wrap'} ${variantClasses[variant].container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            className={`${variantClasses[variant].tab} ${
              activeTab === tab.id ? variantClasses[variant].activeTab : ''
            } ${tab.disabled ? variantClasses[variant].disabled : ''} ${tabWidthClass}`}
            disabled={tab.disabled}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
