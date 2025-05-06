import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { Icon: Github, url: 'https://github.com/priyanshuchawda', label: 'GitHub' },
  { Icon: Linkedin, url: 'https://linkedin.com/in/priyanshuchawda', label: 'LinkedIn' },
  { Icon: Twitter, url: 'https://twitter.com/priyanshu_tech4', label: 'Twitter' },
];

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Resume', href: '/resume.pdf', external: true },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding & Bio */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-3">
              Priyanshu Chawda
            </h3>
            <p className="mb-4 max-w-md leading-relaxed">
              Passionate Full-Stack Developer building user-friendly, performant
              web applications with modern tools and clean code. Always eager to
              learn and share.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(({ name, href, external }) => (
                <li key={name}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors duration-200"
                    >
                      {name}
                    </a>
                  ) : (
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.querySelector(href);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-blue-400 transition-colors duration-200"
                    >
                      {name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Location Info */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Location</h4>
            <p>📍 Pune, India</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm">
            &copy; {currentYear} <strong>Priyanshu Chawda</strong>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
