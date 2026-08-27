import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { Download, FileSpreadsheet, BarChart2, PieChart, TrendingUp, Calendar } from 'lucide-react';

export const Reports = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await api.getBookings();
    setBookings(data);
    setLoading(false);
  };

  const totalRevenue = bookings
    .filter(b => b.bookingStatus === 'CONFIRMED')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const vehicleRevenue = bookings
    .filter(b => b.bookingStatus === 'CONFIRMED')
    .reduce((sum, b) => sum + (Number(b.vehiclePrice) || 0), 0);

  const confirmedCount = bookings.filter(b => b.bookingStatus === 'CONFIRMED').length;
  const avgOrderValue = confirmedCount > 0 ? Math.round(totalRevenue / confirmedCount) : 0;

  const handleExportCSV = () => {
    const headers = 'ID,BookingRef,Traveler,Email,Package,TotalAmount,Status\n';
    const rows = bookings.map(b => 
      `${b.id},"${b.bookingReference}","${b.userName}","${b.userEmail}","${b.tourPackage?.title || ''}",${b.totalAmount},${b.bookingStatus}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WanderLust_Financial_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-tag" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>Executive Insights</span>
            <h1 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>Financial & Booking Reports</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleExportCSV} className="btn btn-secondary">
              <FileSpreadsheet size={16} /> Export CSV
            </button>
            <button onClick={() => window.print()} className="btn btn-primary">
              <Download size={16} /> Print Report
            </button>
          </div>
        </div>

        {/* Analytics Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'var(--emerald-light)', color: 'var(--emerald)' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confirmed Revenue</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>${totalRevenue.toLocaleString()}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <BarChart2 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Booking Value</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>${avgOrderValue.toLocaleString()}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
              <PieChart size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vehicle Add-on Revenue</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>${vehicleRevenue.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Breakdown Visuals */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Top Revenue Destinations</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                  <span>Swiss Alps Majestic Expedition</span>
                  <strong>$4,680 (64%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '64%', height: '100%', background: 'var(--primary)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                  <span>Bali Tropical Paradise</span>
                  <strong>$1,780 (24%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '24%', height: '100%', background: 'var(--secondary)' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                  <span>Kyoto & Tokyo Blossom</span>
                  <strong>$860 (12%)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '12%', height: '100%', background: 'var(--accent)' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Booking Status Breakdown</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontWeight: 600 }}>Confirmed Bookings</span>
                <span className="badge badge-success">{confirmedCount} Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontWeight: 600 }}>Completed Trips</span>
                <span className="badge badge-info">12 Archived</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px' }}>
                <span style={{ fontWeight: 600 }}>Refunded / Cancelled</span>
                <span className="badge badge-danger">1 Cancelled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
