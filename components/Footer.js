export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="logo-icon">&lt;/&gt;</span> Akbar<span>.</span>
        </div>
        <p className="copyright">&copy; {new Date().getFullYear()} {profile?.name || 'Akbar Rahmat Arifin'}. Hak Cipta Dilindungi Undang-Undang.</p>
        <div className="footer-socials">
          <a href={profile?.github || 'https://github.com'} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href={profile?.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
