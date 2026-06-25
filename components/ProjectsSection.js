'use client';

export default function ProjectsSection({ projects = [] }) {
  const handleDemoClick = (e, url) => {
    if (url === '#' || !url) {
      e.preventDefault();
      alert('Fitur Demo Live sedang dipersiapkan. Ini adalah placeholder tautan eksternal untuk proyek Anda!');
    }
  };

  return (
    <section id="projects" className="projects-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Karya Terkini</span>
          <h2 className="section-title">Proyek Unggulan</h2>
          <div className="section-underline"></div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const techList = Array.isArray(project.tech_stack)
              ? project.tech_stack
              : project.tech_stack
              ? project.tech_stack.split(',').map((t) => t.trim())
              : [];

            const gradientClass = project.gradient_class || `p-glow-${(index % 3) + 1}`;
            const iconClass = project.icon_class || 'fa-code';

            return (
              <div key={project.id || index} className="project-card">
                <div className="project-image">
                  <div className={`project-visual-placeholder ${gradientClass}`}>
                    <div className="placeholder-icon">
                      <i className={`fa-solid ${iconClass}`}></i>
                    </div>
                  </div>
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-link-icon"
                          aria-label="GitHub Repo"
                        >
                          <i className="fa-brands fa-github"></i>
                        </a>
                      )}
                      <a
                        href={project.demo_url || '#'}
                        onClick={(e) => handleDemoClick(e, project.demo_url)}
                        target={project.demo_url && project.demo_url !== '#' ? '_blank' : undefined}
                        rel={project.demo_url && project.demo_url !== '#' ? 'noopener noreferrer' : undefined}
                        className="proj-link-icon"
                        aria-label="Live Demo"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <span className="project-tag-item">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {techList.map((tech, tIdx) => (
                      <span key={tIdx}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
