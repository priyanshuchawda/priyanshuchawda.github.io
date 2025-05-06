import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AnimationProviderProps {
  children: React.ReactNode;
}

const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
      mirror: true,
      offset: 100,
    });
  }, []);

  return <>{children}</>;
};

export default AnimationProvider;
