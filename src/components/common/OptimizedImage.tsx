import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholderColor?: string;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  blur?: boolean;
  lazyload?: boolean;
  sizes?: string;
  fetchpriority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  useWebP?: boolean;
  caption?: string;
  className2x?: string;
}

/**
 * OptimizedImage component with advanced image optimization features
 * - Handles different image paths formats
 * - Supports lazy loading
 * - Provides responsive images
 * - Adds placeholders and error handling
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholderColor = '#f3f4f6', // Default light gray placeholder
  quality = 80, // Default quality for images
  objectFit = 'cover',
  blur = false,
  lazyload = true,
  sizes,
  fetchpriority = 'auto',
  loading,
  decoding = 'async',
  useWebP = true,
  caption,
  className2x = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    
    // Use Intersection Observer for lazy loading if not priority
    if (!priority && lazyload && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && imgRef.current) {
              const img = imgRef.current;
              if (img.dataset.src) {
                img.src = img.dataset.src;
              }
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
              }
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: '200px 0px' }
      );
      
      if (imgRef.current) {
        observer.observe(imgRef.current);
      }
      
      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [src, priority, lazyload]);

  // Handle image loading
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  /**
   * Fix image path for various path formats
   * - Handles /public/ paths
   * - Ensures paths start with / if they're local
   * - Preserves remote URLs
   */
  const fixImagePath = (path: string): string => {
    // If it's an empty path, return a placeholder
    if (!path) return '/images/placeholder.jpg';
    
    // If it's already a URL, return as is
    if (path.startsWith('http')) return path;
    
    // If the path starts with /public, remove it
    if (path.startsWith('/public/')) {
      return path.slice(7); // Remove /public
    }
    
    // If the path already starts with /, return as is (it's a root-based path)
    if (path.startsWith('/')) {
      return path;
    }
    
    // Otherwise, ensure it starts with /
    return `/${path}`;
  };
  
  // Fix the source path
  const optimizedSrc = fixImagePath(src);
  
  // Generate srcSet for responsive images if width is provided
  const generateSrcSet = () => {
    if (!width || optimizedSrc.startsWith('http') || !optimizedSrc.match(/\.(jpe?g|png|webp)$/i)) {
      return undefined;
    }

    // Generate 1x, 2x sizes for srcset
    const basePath = optimizedSrc.split('.').slice(0, -1).join('.');
    const ext = optimizedSrc.split('.').pop();
    
    return `${basePath}.${ext} 1x, ${basePath}@2x.${ext} 2x`;
  };

  // Define loading strategy
  const loadingStrategy = loading || (priority ? 'eager' : 'lazy');

  // Determine which src to use
  const finalSrc = error ? fixImagePath('/images/placeholder.jpg') : optimizedSrc;
  
  return (
    <figure className={`image-wrapper ${className}`} style={{ position: 'relative' }}>
      <div 
        className="image-background" 
        style={{ 
          background: placeholderColor,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: isLoaded ? -1 : 1,
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {blur && !isLoaded && (
        <div 
          className="blur-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: 'blur(20px)',
            backgroundImage: `url(${optimizedSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: 0.7
          }}
        />
      )}
      
      <img
        ref={imgRef}
        src={finalSrc}
        alt={alt}
        className={`${className} ${className2x} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        width={width}
        height={height}
        decoding={decoding}
        loading={loadingStrategy}
        fetchPriority={fetchpriority}
        sizes={sizes}
        srcSet={generateSrcSet()}
        style={{
          objectFit,
          transition: 'opacity 0.3s ease-in-out',
          position: 'relative',
          zIndex: 2
        }}
        onLoad={handleImageLoaded}
        onError={handleImageError}
      />
      
      {caption && (
        <figcaption className="text-center mt-2 text-sm text-gray-500 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default OptimizedImage;
