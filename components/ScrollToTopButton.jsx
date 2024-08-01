"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';



const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4  p-1 rounded-full shadow-lg bg-purple-300"
        >
          <Image
          src="/assets/images/arrowToTop.png" alt="onTop" width={50} height={50} >
          </Image>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
