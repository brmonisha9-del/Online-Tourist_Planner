import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Mail, Lock, LogIn, Sparkles, Shield, User } from 'lucide-react';
import { validateEmail } from '../utils/formValidation';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginAsDemoTraveler, loginAsDemoAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailErr = validateEmail(email);
    if (emailErr) {
      setError(emailErr);
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoTraveler = () => {
    loginAsDemoTraveler();
    navigate('/');
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-icon" style={{ margin: '0 auto 1rem auto' }}>
            <Compass size={24} />
          </div>
          <h2>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Sign in to access your itinerary, tickets, and bookings
          </p>
        </div>

        {error && (
          <div style={{ background: 'var(--rose-light)', color: '#9f1239', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="name@example.com"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: '0.5rem' }}>
            <LogIn size={18} />
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* 1-Click Quick Demo Sign In */}
        <div className="demo-account-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            <Sparkles size={14} color="var(--accent)" /> Quick 1-Click Demo Logins
          </div>
          <div className="demo-buttons">
            <button onClick={handleDemoTraveler} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              <User size={14} /> Traveler Demo
            </button>
            <button onClick={handleDemoAdmin} className="btn btn-secondary btn-sm" style={{ flex: 1, borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              <Shield size={14} /> Admin Demo
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create one now
          </Link>
        </div>
      </div>
    </div>
  );
};
