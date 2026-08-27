import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { 
  DollarSign, Luggage, Package, Car, TrendingUp, 
  Users, CheckCircle2, AlertCircle, Clock 
} from 'lucide-react';

export const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const [allBookings, allPackages, allVehicles] = await Promise.all([
      api.getBookings(),
      api.getPackages(),
      api.getVehicles()
    ]);
    setBookings(allBookings);
    setPackages(allPackages);
    setVehicles(allVehicles);
    setLoading(false);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    await api.updateBookingStatus(bookingId, newStatus);
    loadDashboardData();
  };

  const totalRevenue = bookings
    .filter(b => b.bookingStatus === 'CONFIRMED')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const activeBookingsCount = bookings.filter(b => b.bookingStatus === 'CONFIRMED').length;

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span className="section-tag" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>Control Center</span>
            <h1 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>Executive Dashboard</h1>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Real-time analytics & booking management
          </div>
        </div>

        {/* KPI Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'var(--emerald-light)', color: 'var(--emerald)' }}>
              <DollarSign size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Gross Revenue</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>${totalRevenue.toLocaleString()}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Luggage size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Bookings</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{activeBookingsCount}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
              <Package size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tour Packages</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{packages.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
              <Car size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Fleet Vehicles</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{vehicles.length}</div>
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Recent Trip Bookings</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Showing {bookings.length} reservations</span>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ref #</th>
                  <th>Traveler</th>
                  <th>Package</th>
                  <th>Dates</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)' }}>
                      {b.bookingReference}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.userName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.userEmail}</div>
                    </td>
                    <td>{b.tourPackage?.title || 'Tour Package'}</td>
                    <td>{b.startDate}</td>
                    <td style={{ fontWeight: 700 }}>${b.totalAmount}</td>
                    <td>
                      <span className={`badge ${b.bookingStatus === 'CONFIRMED' ? 'badge-success' : 'badge-danger'}`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        style={{ padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                        value={b.bookingStatus}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
