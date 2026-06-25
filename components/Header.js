'use client';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll spy
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Beranda', id: 'home' },
    { href: '#about', label: 'Tentang', id: 'about' },
    { href: '#skills', label: 'Keahlian', id: 'skills' },
    { href: '#projects', label: 'Proyek', id: 'projects' },
    { href: '#education', label: 'Pendidikan', id: 'education' },
    { href: '#experience', label: 'Pengalaman', id: 'experience' },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar">
        <a href="#home" className="logo">
          <span className="logo-icon">&lt;/&gt;</span> Akbar<span>.</span>
        </a>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`} id="nav-menu">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`nav-link btn-contact-nav ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Kontak
          </a>
        </nav>

        <button
          className={`nav-toggle ${isOpen ? 'active' : ''}`}
          id="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
}
