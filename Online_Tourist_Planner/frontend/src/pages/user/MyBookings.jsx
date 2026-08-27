import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Luggage, Calendar, MapPin, Users, Car, CheckCircle, 
  XCircle, Clock, AlertTriangle, FileText, ArrowRight 
} from 'lucide-react';

export const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = async () => {
    setLoading(true);
    const data = await api.getBookings(user?.email);
    setBookings(data);
    setLoading(false);
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking? A 100% refund will be processed.')) {
      await api.cancelBooking(id);
      loadBookings();
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === 'ALL') return true;
    return b.bookingStatus === filter;
  });

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem 1.5rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="section-tag">Traveler Hub</span>
          <h1 style={{ fontSize: '2.25rem', marginTop: '0.35rem' }}>My Trips & Reservations</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage upcoming itineraries, travel tickets, and past vacation records
          </p>
        </div>
        <Link to="/#packages" className="btn btn-primary">
          <Luggage size={16} /> Plan New Trip
        </Link>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {['ALL', 'CONFIRMED', 'CANCELLED'].map((status) => (
          <button
            key={status}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <h3>Loading your travel bookings...</h3>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <Luggage size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
          <h3>No bookings found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            You have no travel reservations matching this filter.
          </p>
          <Link to="/#packages" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Explore Featured Packages
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredBookings.map((b) => (
            <div key={b.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--primary)' }}>
                    #{b.bookingReference}
                  </span>
                  <span className={`badge ${b.bookingStatus === 'CONFIRMED' ? 'badge-success' : 'badge-danger'}`}>
                    {b.bookingStatus}
                  </span>
                  <span className="badge badge-info">
                    {b.paymentStatus}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                  {b.tourPackage?.title || 'Custom Travel Expedition'}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={15} /> {b.startDate} to {b.endDate}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Users size={15} /> {b.travelersCount} Travelers
                  </div>
                  {b.vehicle && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--secondary)' }}>
                      <Car size={15} /> {b.vehicle.name}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ${b.totalAmount}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setSelectedBooking(b)} 
                    className="btn btn-secondary btn-sm"
                  >
                    <FileText size={14} /> View Voucher
                  </button>
                  {b.bookingStatus === 'CONFIRMED' && (
                    <button 
                      onClick={() => handleCancelBooking(b.id)} 
                      className="btn btn-danger btn-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Voucher Modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Travel Itinerary & Booking Voucher</h3>
              <button onClick={() => setSelectedBooking(null)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Booking Reference</span>
                <strong style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>{selectedBooking.bookingReference}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Primary Traveler</span>
                <strong>{selectedBooking.userName} ({selectedBooking.userEmail})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Travel Dates</span>
                <strong>{selectedBooking.startDate} — {selectedBooking.endDate}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Package</span>
                <strong>{selectedBooking.tourPackage?.title}</strong>
              </div>
              {selectedBooking.vehicle && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Add-on Vehicle</span>
                  <strong>{selectedBooking.vehicle.name}</strong>
                </div>
              )}
              {selectedBooking.specialRequests && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Special Requests: </span>
                  <span style={{ fontSize: '0.85rem' }}>{selectedBooking.specialRequests}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => window.print()} className="btn btn-secondary">Print Voucher</button>
              <button onClick={() => setSelectedBooking(null)} className="btn btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
