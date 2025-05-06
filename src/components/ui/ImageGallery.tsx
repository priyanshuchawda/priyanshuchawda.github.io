import React, { useState, useRef, useEffect, useCallback } from 'react';
import OptimizedImage from '../common/OptimizedImage';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className = '' }) => {
  const [activeImage, setActiveImage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mainImageRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) {
    return null;
  }

  // Handle swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Minimum distance for swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left (next image)
        setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        // Swipe right (previous image)
        setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }
  };

  return (
    <div className={`${className}`}>
      {/* Main Image */}
      <div 
        ref={mainImageRef}
        className="relative mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <OptimizedImage 
          src={images[activeImage].src} 
          alt={images[activeImage].alt} 
          className="w-full h-auto aspect-video object-cover" 
        />
        {images[activeImage].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 px-4 text-sm">
            {images[activeImage].caption}
          </div>
        )}
        
        {/* Navigation indicators for mobile */}
        {images.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2 pointer-events-none">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
              }} 
              className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm pointer-events-auto"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
              }} 
              className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm pointer-events-auto"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div 
              key={index}
              onClick={() => setActiveImage(index)}
              className={`
                flex-shrink-0 cursor-pointer rounded-md overflow-hidden w-20 h-20 border-2
                ${activeImage === index 
                  ? 'border-primary-500 dark:border-primary-400' 
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }
                transition-all duration-200
              `}
            >
              <OptimizedImage 
                src={image.src} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface LightboxProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const ImageLightbox: React.FC<LightboxProps> = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);
  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);
  
  if (!isOpen || images.length === 0) {
    return null;
  }
  // Touch handlers for mobile swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    const swipeThreshold = 75; // Minimum distance for swipe
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left (next image)
        handleNext();
      } else {
        // Swipe right (previous image)
        handlePrevious();
      }
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div 
        className="relative w-full h-full flex flex-col justify-center items-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          aria-label="Close lightbox"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons */}
        <button 
          onClick={handlePrevious}
          className="absolute left-4 text-white hover:text-gray-300 z-10"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-4 text-white hover:text-gray-300 z-10"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image container */}
        <div className="w-full max-w-5xl h-auto max-h-[80vh] relative">
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt}
            className="object-contain w-full h-full" 
          />
          
          {images[currentIndex].caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-center">
              {images[currentIndex].caption}
            </div>
          )}
        </div>

        {/* Counter */}
        <div className="text-white text-sm mt-4">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
