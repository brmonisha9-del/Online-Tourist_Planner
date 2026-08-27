import React from 'react';
import { Compass, Mail, Phone, MapPin, Heart, ShieldCheck, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Trust Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3rem',
          marginBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(2,132,199,0.2)', color: '#38bdf8', padding: '0.75rem', borderRadius: '12px' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>100% Secure Booking</h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Encrypted SSL & verified travel partners</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', padding: '0.75rem', borderRadius: '12px' }}>
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>Best Price Guarantee</h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Direct hotel & expedition rates</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24', padding: '0.75rem', borderRadius: '12px' }}>
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>24/7 Global Concierge</h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Dedicated support throughout your trip</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ color: '#fff', marginBottom: '1rem' }}>
              <div className="brand-icon">
                <Compass size={22} />
              </div>
              <span>Wander<strong style={{ color: '#38bdf8' }}>Lust</strong></span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', color: '#94a3b8' }}>
              Crafting bespoke global expeditions, luxury vacations, and self-drive adventures for travelers around the world since 2018.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#38bdf8" /> 742 Evergreen Terrace, Zurich / San Francisco
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#38bdf8" /> +1 (800) 555-WANDER
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#38bdf8" /> concierge@wanderlust.travel
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Top Destinations</h4>
            <ul className="footer-links">
              <li><a href="/#packages">Swiss Alps, Switzerland</a></li>
              <li><a href="/#packages">Bali & Nusa Penida</a></li>
              <li><a href="/#packages">Kyoto & Tokyo, Japan</a></li>
              <li><a href="/#packages">Serengeti Safari, Tanzania</a></li>
              <li><a href="/#packages">Amalfi Coast, Italy</a></li>
              <li><a href="/#packages">Patagonia Glaciers, Chile</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home & Search</Link></li>
              <li><a href="/#packages">Explore Packages</a></li>
              <li><a href="/#vehicles">Vehicle Fleet</a></li>
              <li><Link to="/my-bookings">Manage Bookings</Link></li>
              <li><Link to="/login">Sign In / Register</Link></li>
              <li><Link to="/admin">Admin Management</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Newsletter & Perks</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', color: '#94a3b8' }}>
              Subscribe to get secret deals and up to 20% discount on early booking packages.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to WanderLust Weekly Travel Dispatch!'); }} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                style={{
                  flex: 1,
                  padding: '0.6rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.85rem'
                }} 
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2026 WanderLust Tourist Planner Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
