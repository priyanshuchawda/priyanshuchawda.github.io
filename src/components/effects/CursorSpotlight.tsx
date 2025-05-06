import React, { useEffect, useRef } from 'react';

interface CursorSpotlightProps {
  opacity?: number;
  size?: number;
  color?: string;
}

const CursorSpotlight: React.FC<CursorSpotlightProps> = ({ 
  opacity = 0.15,
  size = 400,
  color = "rgba(59, 130, 246, 0.5)" // blue-500 with opacity
}) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!spotlightRef.current) return;
      
      const { clientX, clientY } = event;
      spotlightRef.current.style.background = `radial-gradient(
        circle ${size}px at ${clientX}px ${clientY}px,
        ${color},
        transparent
      )`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color, size]);
  
  return (
    <div 
      ref={spotlightRef} 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity }}
    />
  );
};

export default CursorSpotlight;
