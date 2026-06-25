export default function SkillsSection({ skills = [] }) {
  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Category to Icon mapping helper
  const categoryIcons = {
    'Design & Creative': 'fa-palette',
    'Web Development': 'fa-code',
    'Productivity': 'fa-list-check',
    'Soft Skills': 'fa-users',
    'Languages': 'fa-language'
  };

  return (
    <section id="skills" className="skills-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Keahlian Teknis</span>
          <h2 className="section-title">Skills</h2>
          <div className="section-underline"></div>
        </div>

        <div className="skills-grid">
          {Object.entries(categories).map(([categoryName, categorySkills]) => {
            const icon = categoryIcons[categoryName] || 'fa-code';
            return (
              <div key={categoryName} className="skill-card">
                <div className="skill-card-header">
                  <i className={`fa-solid ${icon} skill-icon`}></i>
                  <h3>{categoryName}</h3>
                </div>
                <div className="skill-list">
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="skill-item-plain">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
