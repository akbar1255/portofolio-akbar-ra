export default function EducationSection({ education = [] }) {
  return (
    <section id="education" className="education-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Riwayat Pendidikan</span>
          <h2 className="section-title">Pendidikan</h2>
          <div className="section-underline"></div>
        </div>

        <div className="timeline">
          {education.map((edu, idx) => (
            <div key={edu.id || idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">{edu.period}</div>
              <div className="timeline-content">
                <h3>{edu.title}</h3>
                <span className="company">{edu.institution}</span>
                <p>{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
