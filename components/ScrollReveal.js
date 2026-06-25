'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px' // offset timing slightly for screen entrance
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // only reveal once
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    return () => {
      revealElements.forEach(element => {
        revealObserver.unobserve(element);
      });
    };
  }, []);

  return null;
}
