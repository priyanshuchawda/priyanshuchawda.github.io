import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import Container from '../ui/Container';

interface MainLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, fullWidth = false }) => {
  const location = useLocation();
  const activeSection = location.hash.replace('#', '') || 'home';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">      <Header activeSection={activeSection} />
      <main id="main" className="flex-grow" tabIndex={-1} role="main">
        {fullWidth ? children : <Container>{children}</Container>}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
