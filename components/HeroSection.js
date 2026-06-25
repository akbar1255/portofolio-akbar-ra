'use client';
import { useState, useEffect } from 'react';

export default function HeroSection({ profile }) {
  const [typingText, setTypingText] = useState('');
  const words = profile?.subtitle_roles || [
    "Informatics Engineering Student",
    "UI/UX Designer",
    "Front-End Developer",
    "Creative Designer"
  ];

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timeoutId;

    function type() {
      if (words.length === 0) return;
      const currentWord = words[wordIndex] || "";
      
      if (isDeleting) {
        setTypingText(currentWord.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50;
      } else {
        setTypingText(currentWord.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }

      timeoutId = setTimeout(type, typingSpeed);
    }

    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId);
  }, [words]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge-status">
            <span className="pulse-dot"></span> Tersedia untuk Proyek Baru
          </div>
          <h1 className="hero-title">
            Halo, Saya <span className="highlight-text">{profile?.name || 'Akbar R. Arifin'}</span>
          </h1>
          <h2 className="hero-subtitle">
            Saya seorang <span>{typingText}</span><span className="cursor-blink">|</span>
          </h2>
          <p className="hero-description">
            {profile?.about_lead || 'Saya adalah mahasiswa aktif Teknik Informatika di Universitas Maritim Raja Ali Haji (UMRAH) angkatan 2023. Ketertarikan saya yang kuat pada teknologi digital mendorong saya untuk terus belajar.'}
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Lihat Karya Saya <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#contact" className="btn btn-outline">
              Hubungi Saya
            </a>
          </div>
          <div className="social-links">
            <a href={profile?.github || 'https://github.com'} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href={profile?.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="profile-card-wrapper">
            <div className="profile-card">
              <div className="profile-header">
                <div className="dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="tab-title">akbar_arifin.js</div>
              </div>
              <div className="profile-body">
                <pre>
                  <code className="language-javascript">
                    <span className="keyword">const</span> <span className="variable">developer</span> <span className="operator">=</span> {`{`}
                    {`\n  `}
                    <span className="property">nama</span>: <span className="string">'{profile?.name || 'Akbar Rahmat Arifin'}'</span>,
                    {`\n  `}
                    <span className="property">peran</span>: <span className="string">'{profile?.role || 'Informatics Engineering Student'}'</span>,
                    {`\n  `}
                    <span className="property">lokasi</span>: <span className="string">'{profile?.location || 'Tanjung Pinang, Kepri'}'</span>,
                    {`\n  `}
                    <span className="property">keahlianUtama</span>: [
                    {`\n    `}
                    <span className="string">'UI/UX Design'</span>,
                    {`\n    `}
                    <span className="string">'Web Development'</span>,
                    {`\n    `}
                    <span className="string">'Adobe Photoshop'</span>,
                    {`\n    `}
                    <span className="string">'Video Editing'</span>
                    {`\n  `}],
                    {`\n  `}
                    <span className="property">sukaDesain</span>: <span className="boolean">true</span>,
                    {`\n  `}
                    <span className="property">selaluBelajar</span>: <span className="boolean">true</span>
                    {`\n`}{'}'};
                  </code>
                </pre>
              </div>
            </div>
            <div className="glow-box"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
