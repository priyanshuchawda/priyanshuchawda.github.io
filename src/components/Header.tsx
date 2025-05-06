import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';

interface HeaderProps {
  activeSection: string;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
];

const socialLinks = [
  { Icon: Github, url: 'https://github.com/priyanshuchawda', label: 'GitHub' },
  { Icon: Linkedin, url: 'https://linkedin.com/in/priyanshuchawda', label: 'LinkedIn' },
  { Icon: Twitter, url: 'https://twitter.com/priyanshu_tech4', label: 'Twitter' },
];

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium"
        onClick={(e) => { e.preventDefault(); scrollToSection('main'); }}
      >
        Skip to content
      </a>
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
            aria-label="Priyanshu Chawda Portfolio"
          >
            PriyanshuChawda()
          </a>

          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                className={`text-base font-medium transition-colors duration-200 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm ${
                  activeSection === id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map(({ Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </a>
            ))}
            <ThemeToggle variant="icon" size="md" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`md:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-40 transform transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
          }`}
        >
          <div className="pt-20 px-6 pb-6 flex flex-col space-y-6">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                className={`text-xl font-medium p-3 transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  activeSection === id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 flex space-x-4">
              {socialLinks.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;