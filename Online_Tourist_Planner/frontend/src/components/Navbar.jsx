import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, MapPin, Calendar, User, LogOut, Shield, Luggage, Menu } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <Compass size={24} />
          </div>
          <span>Wander<strong style={{ color: 'var(--primary)' }}>Lust</strong></span>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Explore
              </Link>
            </li>
            <li>
              <a href="/#packages" className="nav-link">
                Packages
              </a>
            </li>
            <li>
              <a href="/#vehicles" className="nav-link">
                Fleet & Rentals
              </a>
            </li>
            <li>
              <a href="/#about" className="nav-link">
                Why Us
              </a>
            </li>
            {isAuthenticated && !isAdmin && (
              <li>
                <Link to="/my-bookings" className={`nav-link ${location.pathname === '/my-bookings' ? 'active' : ''}`}>
                  <Luggage size={16} /> My Bookings
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link to="/admin" className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  <Shield size={16} /> Admin Portal
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* User Account / Auth Actions */}
        <div className="nav-actions">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="user-badge-menu">
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {isAdmin ? 'Administrator' : 'Traveler'}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleLogout} 
                className="btn btn-secondary btn-sm" 
                title="Sign Out"
                style={{ padding: '0.5rem' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Join Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
