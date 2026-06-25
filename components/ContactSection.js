'use client';
import { useState } from 'react';

export default function ContactSection({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: 'success',
          text: `Terima kasih, ${formData.name}! Pesan Anda telah berhasil dikirim. Saya akan menghubungi Anda kembali sesegera mungkin.`
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          text: data.error || 'Gagal mengirim pesan. Silakan coba lagi.'
        });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus({
        type: 'error',
        text: 'Terjadi kesalahan jaringan. Silakan coba lagi.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section scroll-reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Hubungi Saya</span>
          <h2 className="section-title">Mari Berkolaborasi</h2>
          <div className="section-underline"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-info-panel">
            <h3>Ada Proyek Menarik?</h3>
            <p>Saya selalu tertarik untuk mendengar tentang proyek atau ide baru. Silakan hubungi saya melalui salah satu saluran berikut atau gunakan formulir kontak.</p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="detail-icon"><i className="fa-solid fa-envelope"></i></div>
                <div className="detail-text">
                  <span>Kirim Email</span>
                  <strong>{profile?.email || 'aarifin@student.umrah.ac.id'}</strong>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="detail-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="detail-text">
                  <span>Lokasi</span>
                  <strong>{profile?.location || 'Tanjung Pinang, Riau Islands'}</strong>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="detail-icon"><i className="fa-solid fa-phone"></i></div>
                <div className="detail-text">
                  <span>WhatsApp/Telepon</span>
                  <strong>{profile?.phone || '+62 812-7038-8388'}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Alamat Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subjek</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Topik pembicaraan"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Pesan Anda</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan detail proyek atau pertanyaan Anda di sini..."
                ></textarea>
              </div>
              
              <button type="submit" disabled={loading} className="btn btn-primary btn-submit">
                <span>{loading ? 'Mengirim...' : 'Kirim Pesan'}</span>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
              </button>
              
              {status.text && (
                <div className={`form-status ${status.type}`} style={{ display: 'block' }}>
                  {status.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
