'use client';
import React, { useEffect, useRef } from 'react';

export default function BackgroundEffect({ children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateTransform = () => {
      el.style.transform = `translateY(${lastScrollY * 0.5}px)`;
      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full min-h-screen mt-5 overflow-hidden pb-10 pt-36 font-light text-white antialiased md:pb-16 md:pt-20"
      style={{
        background: 'linear-gradient(135deg, #0a0613 0%, #150d27 25%, #1a0f2e 50%, #0a0613 75%, #150d27 100%)',
        backgroundSize: '400% 400%',
        willChange: 'transform'
      }}
    >
      {/* Optional Background Gradient (static) */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 opacity-60"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.2) 0%, rgba(155, 135, 245, 0.1) 30%, rgba(13, 10, 25, 0) 70%)',
        }}
      />
      <div
        className="absolute left-0 top-0 h-full w-1/2 -scale-x-100 opacity-60"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.2) 0%, rgba(155, 135, 245, 0.1) 30%, rgba(13, 10, 25, 0) 70%)',
        }}
      />

      {/* Main content */}
      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        {children}
      </div>
    </section>
  );
}
