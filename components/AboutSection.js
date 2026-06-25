export default function AboutSection({ profile }) {
  return (
    <section id="about" className="about-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Tentang Saya</span>
          <h2 className="section-title">Di Balik Layar Kode</h2>
          <div className="section-underline"></div>
        </div>
        
        <div className="about-grid">
          <div className="about-info">
            <p className="lead-text">
              {profile?.about_lead || 'Saya adalah mahasiswa aktif Teknik Informatika di Universitas Maritim Raja Ali Haji (UMRAH) angkatan 2023.'}
            </p>
            <p>
              {profile?.about_text || 'Ketertarikan saya yang kuat pada teknologi digital mendorong saya untuk terus belajar dan mendalami UI/UX design, pengembangan web dasar, editing video/gambar, serta manajemen dokumen digital.'}
            </p>
            <p>
              {profile?.about_text2 || 'Saya memiliki antusiasme tinggi untuk terus berkembang, cepat beradaptasi dengan teknologi baru, serta bersemangat untuk memberikan kontribusi nyata dalam proyek inovatif.'}
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">{profile?.stat_college_year || '2023'}</span>
                <span className="stat-label">{profile?.stat_college_year_label || 'Tahun Masuk Kuliah'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.stat_projects || '3'}</span>
                <span className="stat-label">{profile?.stat_projects_label || 'Proyek Akademik'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{profile?.stat_skills || '5+'}</span>
                <span className="stat-label">{profile?.stat_skills_label || 'Kategori Keahlian'}</span>
              </div>
            </div>
          </div>
          <div className="about-skills-highlight">
            <div className="profile-image-container">
              <img src={profile?.avatar || '/assets/avatar.png'} alt={profile?.name || 'Akbar Rahmat Arifin'} className="profile-photo" />
              <div className="profile-glow"></div>
            </div>
            <div className="highlight-box">
              <div className="highlight-icon">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3>Filosofi Kerja Saya</h3>
              <p>
                {profile?.about_philosophy || '"Menulis kode yang bersih, terdokumentasi dengan baik, dan mudah dipelihara adalah bentuk tanggung jawab moral seorang developer kepada masa depan produk."'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
