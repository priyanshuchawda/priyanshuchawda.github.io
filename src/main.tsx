import React, { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import AnimationProvider from './context/AnimationProvider';
import { blogPosts } from './data/blog';
import './index.css';

// Lazy load components for better code splitting
const App = lazy(() => import('./App'));
const NotFound = lazy(() => import('./components/NotFound'));
const ProjectsPage = lazy(() => import('./components/pages/Projects'));
const ProjectDetail = lazy(() => import('./components/pages/ProjectDetail'));
const DesignSystem = lazy(() => import('./components/pages/DesignSystem'));
const BlogPage = lazy(() => import('./components/pages/Blog'));
const BlogPostDetail = lazy(() => import('./components/pages/BlogPostDetail'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>        <ThemeProvider>
          <AnimationProvider>            {/* Use basename for GitHub Pages deployment */}
            <BrowserRouter basename="/">
              {/* With custom domain, we use root path */}
              <Suspense fallback={<LoadingFallback />}>
                {/* Handle redirects from 404.html */}
                <Routes>
                  <Route path="/" element={
                    // Handle redirects from the 404.html page
                    <React.Fragment>
                      {typeof window !== 'undefined' && (() => {
                        const redirectPath = new URLSearchParams(window.location.search).get('redirect');
                        if (redirectPath) {
                          window.history.replaceState(null, '', redirectPath);
                        }
                        return null;
                      })()}
                      <App />
                    </React.Fragment>
                  } />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/blog" element={<BlogPage posts={blogPosts} />} />
                  <Route path="/blog/:slug" element={<BlogPostDetail posts={blogPosts} />} />
                  <Route path="/design-system" element={<DesignSystem />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AnimationProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
