import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Car, BarChart3, Home, ShieldCheck } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Manage Packages', path: '/admin/packages', icon: Package },
    { label: 'Manage Vehicles', path: '/admin/vehicles', icon: Car },
    { label: 'Analytics & Reports', path: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <aside className="admin-sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
        <ShieldCheck size={20} color="var(--primary)" />
        <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
          Administration
        </span>
      </div>

      <ul className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link to={item.path} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: 'auto', paddingTop: '3rem' }}>
        <Link to="/" className="sidebar-link" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
          <Home size={18} />
          <span>Back to Live Website</span>
        </Link>
      </div>
    </aside>
  );
};
