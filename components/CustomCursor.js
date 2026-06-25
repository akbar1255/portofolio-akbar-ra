'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Add custom cursor class to body
    document.body.classList.add('portfolio-body-cursor-active');

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    const handleMouseOver = (e) => {
      const isHoverable = e.target.closest('a, button, select, input, textarea, .btn, .proj-link-icon, .back-to-top, [role="button"]');
      if (isHoverable) {
        document.body.classList.add('custom-cursor-hovering');
      } else {
        document.body.classList.remove('custom-cursor-hovering');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('portfolio-body-cursor-active');
      document.body.classList.remove('custom-cursor-hovering');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="custom-cursor-dot" style={{ left: 'var(--cursor-x)', top: 'var(--cursor-y)' }}></div>
      <div className="custom-cursor-ring" style={{ left: 'var(--cursor-x)', top: 'var(--cursor-y)' }}></div>
    </>
  );
}
