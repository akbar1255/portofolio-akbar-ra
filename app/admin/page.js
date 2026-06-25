'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    profile: {},
    skills: [],
    projects: [],
    education: [],
    experiences: []
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // Modal states for CRUD items
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'skills', 'projects', 'education', 'experiences'
  const [modalAction, setModalAction] = useState(''); // 'add', 'edit'
  const [editIndex, setEditIndex] = useState(-1);
  const [formData, setFormData] = useState({});

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (!storedToken) {
      router.push('/admin/login');
    } else {
      setToken(storedToken);
      fetchData(storedToken);
    }
  }, [router]);

  const fetchData = async (authToken) => {
    try {
      const res = await fetch('/api/admin/content', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }
      const resData = await res.json();
      setData(resData.data);
      setMessages(resData.messages || []);
    } catch (e) {
      console.error(e);
      alert('Gagal mengambil data dari server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const handleProfileChange = (e) => {
    setData({
      ...data,
      profile: {
        ...data.profile,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubtitleRolesChange = (e) => {
    const rolesArray = e.target.value.split(',').map(r => r.trim());
    setData({
      ...data,
      profile: {
        ...data.profile,
        subtitle_roles: rolesArray
      }
    });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      const resData = await res.json();

      if (res.ok) {
        setData({
          ...data,
          profile: {
            ...data.profile,
            avatar: resData.url
          }
        });
        alert('Avatar berhasil diupload!');
      } else {
        alert(resData.error || 'Gagal mengupload avatar');
      }
    } catch (err) {
      console.error('Avatar upload error:', err);
      alert('Terjadi kesalahan koneksi saat upload');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaveStatus('Menyimpan...');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        setSaveStatus('Berhasil disimpan!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        const errData = await res.json();
        setSaveStatus(`Gagal: ${errData.error}`);
      }
    } catch (e) {
      console.error(e);
      setSaveStatus('Gagal menyimpan (Kesalahan Jaringan)');
    }
  };

  const openModal = (type, action, index = -1) => {
    setModalType(type);
    setModalAction(action);
    setEditIndex(index);

    if (action === 'edit' && index > -1) {
      const item = data[type][index];
      if (type === 'projects') {
        setFormData({
          ...item,
          tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(', ') : item.tech_stack
        });
      } else if (type === 'experiences') {
        setFormData({
          ...item,
          tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(', ') : item.tech_stack
        });
      } else {
        setFormData(item);
      }
    } else {
      setFormData({});
    }

    setShowModal(true);
  };

  const handleModalChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveModalData = () => {
    const list = [...data[modalType]];
    let newItem = { ...formData };

    if (modalType === 'projects' || modalType === 'experiences') {
      newItem.tech_stack = formData.tech_stack
        ? formData.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    }

    if (modalAction === 'edit') {
      list[editIndex] = { ...list[editIndex], ...newItem };
    } else {
      newItem.id = Date.now();
      list.push(newItem);
    }

    setData({
      ...data,
      [modalType]: list
    });

    setShowModal(false);
  };

  const deleteItem = (type, index) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      const list = [...data[type]];
      list.splice(index, 1);
      setData({
        ...data,
        [type]: list
      });
    }
  };

  if (loading) {
    return (
      <div className="admin-login-page">
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>
          <i className="fa-solid fa-spinner fa-spin"></i> Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div>
            <div className="admin-logo">
              <span className="logo-icon">&lt;/&gt;</span> Akbar Admin
            </div>
            <nav className="admin-nav">
              <button
                className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <i className="fa-solid fa-user"></i> Profile
              </button>
              <button
                className={`admin-nav-item ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <i className="fa-solid fa-graduation-cap"></i> Skills
              </button>
              <button
                className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <i className="fa-solid fa-folder-open"></i> Projects
              </button>
              <button
                className={`admin-nav-item ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <i className="fa-solid fa-book"></i> Pendidikan
              </button>
              <button
                className={`admin-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <i className="fa-solid fa-briefcase"></i> Pengalaman/Proyek
              </button>
              <button
                className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveTab('messages')}
              >
                <i className="fa-solid fa-envelope"></i> Pesan ({messages.length})
              </button>
            </nav>
          </div>

          <button onClick={handleLogout} className="admin-nav-item admin-btn-logout">
            <i className="fa-solid fa-right-from-bracket"></i> Keluar
          </button>
        </aside>

        {/* Content Area */}
        <main className="admin-content">
          <div className="admin-content-header">
            <h1>Kelola {activeTab.toUpperCase()}</h1>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {saveStatus && <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{saveStatus}</span>}
              <button onClick={handleSaveAll} className="btn btn-primary btn-admin-action">
                <i className="fa-solid fa-floppy-disk"></i> Simpan Perubahan
              </button>
            </div>
          </div>

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="admin-card">
              <h2 className="admin-card-title">Profil Utama</h2>
              <form className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="upload-preview-container">
                  <img
                    src={data.profile?.avatar || '/assets/avatar.png'}
                    alt="Profile Avatar"
                    className="upload-preview"
                  />
                  <div className="upload-btn-wrapper">
                    <button type="button" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                      {uploading ? 'Mengupload...' : 'Upload Foto Baru'}
                    </button>
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      value={data.profile?.name || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Peran / Role</label>
                    <input
                      type="text"
                      name="role"
                      value={data.profile?.role || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subtitle Roles (pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={data.profile?.subtitle_roles ? data.profile.subtitle_roles.join(', ') : ''}
                    onChange={handleSubtitleRolesChange}
                    placeholder="e.g. UI/UX Designer, Front-End Developer"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Lokasi</label>
                    <input
                      type="text"
                      name="location"
                      value={data.profile?.location || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Kontak</label>
                    <input
                      type="email"
                      name="email"
                      value={data.profile?.email || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>No. HP / WhatsApp</label>
                    <input
                      type="text"
                      name="phone"
                      value={data.profile?.phone || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>URL GitHub</label>
                    <input
                      type="text"
                      name="github"
                      value={data.profile?.github || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>URL LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={data.profile?.linkedin || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Filosofi Kerja</label>
                    <input
                      type="text"
                      name="about_philosophy"
                      value={data.profile?.about_philosophy || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Lead Text Tentang Saya</label>
                  <input
                    type="text"
                    name="about_lead"
                    value={data.profile?.about_lead || ''}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Deskripsi Tentang Saya (Paragraf 1)</label>
                  <textarea
                    name="about_text"
                    rows="3"
                    value={data.profile?.about_text || ''}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Deskripsi Tentang Saya (Paragraf 2)</label>
                  <textarea
                    name="about_text2"
                    rows="3"
                    value={data.profile?.about_text2 || ''}
                    onChange={handleProfileChange}
                  />
                </div>

                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', marginTop: '20px' }}>
                  Statistik Tentang Saya
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stat 1 Value</label>
                    <input
                      type="text"
                      name="stat_college_year"
                      value={data.profile?.stat_college_year || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stat 1 Label</label>
                    <input
                      type="text"
                      name="stat_college_year_label"
                      value={data.profile?.stat_college_year_label || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stat 2 Value</label>
                    <input
                      type="text"
                      name="stat_projects"
                      value={data.profile?.stat_projects || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stat 2 Label</label>
                    <input
                      type="text"
                      name="stat_projects_label"
                      value={data.profile?.stat_projects_label || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stat 3 Value</label>
                    <input
                      type="text"
                      name="stat_skills"
                      value={data.profile?.stat_skills || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stat 3 Label</label>
                    <input
                      type="text"
                      name="stat_skills_label"
                      value={data.profile?.stat_skills_label || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 className="admin-card-title" style={{ margin: 0, border: 'none' }}>Daftar Keahlian</h2>
                <button onClick={() => openModal('skills', 'add')} className="btn btn-primary btn-admin-action">
                  <i className="fa-solid fa-plus"></i> Tambah Skill
                </button>
              </div>
              <div className="crud-list">
                {data.skills?.map((skill, index) => (
                  <div key={index} className="crud-item">
                    <div className="crud-item-info">
                      <span className="crud-item-title">{skill.name}</span>
                      <span className="crud-item-meta">Kategori: {skill.category}</span>
                    </div>
                    <div className="crud-actions">
                      <button onClick={() => openModal('skills', 'edit', index)} className="btn-icon" title="Edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={() => deleteItem('skills', index)} className="btn-icon btn-icon-danger" title="Hapus">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 className="admin-card-title" style={{ margin: 0, border: 'none' }}>Daftar Proyek Unggulan</h2>
                <button onClick={() => openModal('projects', 'add')} className="btn btn-primary btn-admin-action">
                  <i className="fa-solid fa-plus"></i> Tambah Proyek
                </button>
              </div>
              <div className="crud-list">
                {data.projects?.map((project, index) => (
                  <div key={index} className="crud-item">
                    <div className="crud-item-info">
                      <span className="crud-item-title">{project.title}</span>
                      <span className="crud-item-meta">
                        Kategori: {project.category} | Tech: {Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : project.tech_stack}
                      </span>
                    </div>
                    <div className="crud-actions">
                      <button onClick={() => openModal('projects', 'edit', index)} className="btn-icon" title="Edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={() => deleteItem('projects', index)} className="btn-icon btn-icon-danger" title="Hapus">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === 'education' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 className="admin-card-title" style={{ margin: 0, border: 'none' }}>Daftar Riwayat Pendidikan</h2>
                <button onClick={() => openModal('education', 'add')} className="btn btn-primary btn-admin-action">
                  <i className="fa-solid fa-plus"></i> Tambah Pendidikan
                </button>
              </div>
              <div className="crud-list">
                {data.education?.map((edu, index) => (
                  <div key={index} className="crud-item">
                    <div className="crud-item-info">
                      <span className="crud-item-title">{edu.title}</span>
                      <span className="crud-item-meta">{edu.institution} ({edu.period})</span>
                    </div>
                    <div className="crud-actions">
                      <button onClick={() => openModal('education', 'edit', index)} className="btn-icon" title="Edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={() => deleteItem('education', index)} className="btn-icon btn-icon-danger" title="Hapus">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 className="admin-card-title" style={{ margin: 0, border: 'none' }}>Daftar Proyek Timeline</h2>
                <button onClick={() => openModal('experiences', 'add')} className="btn btn-primary btn-admin-action">
                  <i className="fa-solid fa-plus"></i> Tambah Proyek Timeline
                </button>
              </div>
              <div className="crud-list">
                {data.experiences?.map((exp, index) => (
                  <div key={index} className="crud-item">
                    <div className="crud-item-info">
                      <span className="crud-item-title">{exp.title}</span>
                      <span className="crud-item-meta">
                        Tech: {Array.isArray(exp.tech_stack) ? exp.tech_stack.join(', ') : exp.tech_stack}
                      </span>
                    </div>
                    <div className="crud-actions">
                      <button onClick={() => openModal('experiences', 'edit', index)} className="btn-icon" title="Edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={() => deleteItem('experiences', index)} className="btn-icon btn-icon-danger" title="Hapus">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="admin-card">
              <h2 className="admin-card-title">Pesan Hubungi Saya</h2>
              <div className="message-list">
                {messages.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>Belum ada pesan masuk.</p>
                ) : (
                  [...messages].reverse().map((msg, index) => (
                    <div key={msg.id || index} className="message-item">
                      <div className="message-header">
                        <div className="message-sender">
                          <span className="message-sender-name">{msg.name}</span>
                          <span className="message-sender-email">{msg.email}</span>
                        </div>
                        <span className="message-date">
                          {new Date(msg.created_at).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <div className="message-subject">Subjek: {msg.subject}</div>
                      </div>
                      <div className="message-body" style={{ marginTop: '8px' }}>{msg.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CRUD MODAL */}
      {showModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>
                {modalAction === 'add' ? 'Tambah' : 'Edit'}{' '}
                {modalType === 'skills' ? 'Skill' : modalType === 'projects' ? 'Proyek' : modalType === 'education' ? 'Pendidikan' : 'Proyek Timeline'}
              </h3>
              <button onClick={() => setShowModal(false)} className="btn-icon" style={{ border: 'none' }}>
                <i className="fa-solid fa-xmark" style={{ fontSize: '1.2rem' }}></i>
              </button>
            </div>
            <div className="admin-modal-body">
              
              {/* Skills Fields */}
              {modalType === 'skills' && (
                <>
                  <div className="form-group">
                    <label>Nama Skill</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleModalChange}
                      placeholder="e.g. Next.js"
                    />
                  </div>
                  <div className="form-group">
                    <label>Kategori</label>
                    <select
                      name="category"
                      value={formData.category || ''}
                      onChange={handleModalChange}
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)',
                        padding: '12px',
                        borderRadius: '6px'
                      }}
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="Design & Creative">Design & Creative</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Soft Skills">Soft Skills</option>
                      <option value="Languages">Languages</option>
                    </select>
                  </div>
                </>
              )}

              {/* Projects Fields */}
              {modalType === 'projects' && (
                <>
                  <div className="form-group">
                    <label>Judul Proyek</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleModalChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea
                      name="description"
                      rows="3"
                      value={formData.description || ''}
                      onChange={handleModalChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Kategori</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleModalChange}
                        placeholder="e.g. Dashboard / Web App"
                      />
                    </div>
                    <div className="form-group">
                      <label>Tech Stack (pisahkan dengan koma)</label>
                      <input
                        type="text"
                        name="tech_stack"
                        value={formData.tech_stack || ''}
                        onChange={handleModalChange}
                        placeholder="e.g. Next.js, React, Node.js"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>GitHub URL</label>
                      <input
                        type="text"
                        name="github_url"
                        value={formData.github_url || ''}
                        onChange={handleModalChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Demo URL (isi # jika belum ada)</label>
                      <input
                        type="text"
                        name="demo_url"
                        value={formData.demo_url || ''}
                        onChange={handleModalChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Icon Class (FontAwesome)</label>
                      <input
                        type="text"
                        name="icon_class"
                        value={formData.icon_class || 'fa-code'}
                        onChange={handleModalChange}
                        placeholder="e.g. fa-gamepad"
                      />
                    </div>
                    <div className="form-group">
                      <label>Gradient Class</label>
                      <select
                        name="gradient_class"
                        value={formData.gradient_class || 'p-glow-1'}
                        onChange={handleModalChange}
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-primary)',
                          padding: '12px',
                          borderRadius: '6px'
                        }}
                      >
                        <option value="p-glow-1">Glow Hijau Tua 1</option>
                        <option value="p-glow-2">Glow Hijau Sedang 2</option>
                        <option value="p-glow-3">Glow Hijau Terang 3</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Education Fields */}
              {modalType === 'education' && (
                <>
                  <div className="form-group">
                    <label>Gelar / Tingkat Pendidikan</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleModalChange}
                      placeholder="e.g. S1 Teknik Informatika"
                    />
                  </div>
                  <div className="form-group">
                    <label>Institusi</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution || ''}
                      onChange={handleModalChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Periode Waktu</label>
                    <input
                      type="text"
                      name="period"
                      value={formData.period || ''}
                      onChange={handleModalChange}
                      placeholder="e.g. 2023 - Sekarang"
                    />
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea
                      name="description"
                      rows="3"
                      value={formData.description || ''}
                      onChange={handleModalChange}
                    />
                  </div>
                </>
              )}

              {/* Experiences Fields */}
              {modalType === 'experiences' && (
                <>
                  <div className="form-group">
                    <label>Judul Proyek Timeline</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleModalChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea
                      name="description"
                      rows="3"
                      value={formData.description || ''}
                      onChange={handleModalChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tech Stack (pisahkan dengan koma)</label>
                    <input
                      type="text"
                      name="tech_stack"
                      value={formData.tech_stack || ''}
                      onChange={handleModalChange}
                      placeholder="e.g. HTML5, CSS3, JavaScript"
                    />
                  </div>
                </>
              )}

            </div>
            <div className="admin-modal-footer">
              <button onClick={() => setShowModal(false)} className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                Batal
              </button>
              <button onClick={saveModalData} className="btn btn-primary btn-admin-action">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
