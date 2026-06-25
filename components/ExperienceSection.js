export default function ExperienceSection({ experiences = [] }) {
  return (
    <section id="experience" className="experience-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Proyek</span>
          <h2 className="section-title">Proyek yang Telah Dibuat</h2>
          <div className="section-underline"></div>
        </div>

        <div className="timeline">
          {experiences.map((exp, idx) => {
            const techList = Array.isArray(exp.tech_stack)
              ? exp.tech_stack
              : exp.tech_stack
              ? exp.tech_stack.split(',').map((t) => t.trim())
              : [];

            return (
              <div key={exp.id || idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{exp.title}</h3>
                  <p>{exp.description}</p>
                  {techList.length > 0 && (
                    <div className="project-tech" style={{ marginTop: '12px' }}>
                      {techList.map((tech, tIdx) => (
                        <span key={tIdx}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
