'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (localStorage.getItem('admin_token')) {
      router.push('/admin');
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch (err) {
      console.error('Login submit error:', err);
      setError('Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="logo-icon" style={{ fontSize: '2rem' }}>&lt;/&gt;</span>
          <h2>Admin Login</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Masuk untuk mengelola isi portofolio</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="form-status error" style={{ display: 'block', margin: 0 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
          >
            <span>{loading ? 'Memverifikasi...' : 'Masuk Dashboard'}</span>
            <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-right-to-bracket'}`}></i>
          </button>
        </form>
      </div>
    </div>
  );
}
