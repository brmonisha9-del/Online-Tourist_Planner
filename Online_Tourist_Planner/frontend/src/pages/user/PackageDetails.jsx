import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { 
  MapPin, Clock, Calendar, Star, CheckCircle, XCircle, 
  Car, ShieldCheck, ArrowRight, ChevronRight, Share2, Heart, Users 
} from 'lucide-react';

export const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [travelers, setTravelers] = useState(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  useEffect(() => {
    loadPackage();
  }, [id]);

  const loadPackage = async () => {
    setLoading(true);
    const [foundPkg, allVehicles] = await Promise.all([
      api.getPackageById(id),
      api.getVehicles()
    ]);
    setPkg(foundPkg);
    setVehicles(allVehicles);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Loading package details...</h2>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Package not found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>The requested travel package could not be located.</p>
        <Link to="/" className="btn btn-primary">Return to Explore</Link>
      </div>
    );
  }

  const selectedVehicle = vehicles.find(v => String(v.id) === String(selectedVehicleId));
  const packageTotal = (pkg.price || 0) * travelers;
  const vehicleTotal = selectedVehicle ? (selectedVehicle.pricePerDay * (pkg.durationDays || 5)) : 0;
  const grandTotal = packageTotal + vehicleTotal;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>Packages</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{pkg.title}</span>
      </div>

      {/* Hero Banner with Title & Quick Meta */}
      <div className="detail-hero">
        <img src={pkg.imageUrl} alt={pkg.title} />
        <div className="detail-hero-overlay">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="card-badge-category" style={{ position: 'static' }}>{pkg.category} Expedition</span>
            <span className="badge badge-success">Verified Itinerary</span>
          </div>
          <h1 style={{ fontSize: '2.75rem', color: '#fff', marginBottom: '0.75rem' }}>{pkg.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={16} color="#38bdf8" /> {pkg.destination}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={16} color="#38bdf8" /> {pkg.durationDays} Days / {pkg.durationNights || pkg.durationDays - 1} Nights
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Star size={16} fill="#f59e0b" color="#f59e0b" /> {pkg.rating || 4.9} ({pkg.reviewCount || 90}+ reviews)
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sticky Booking Grid */}
      <div className="booking-grid">
        {/* Left Column: Details, Highlights, Itinerary, Vehicle Addons */}
        <div>
          {/* Overview */}
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Trip Overview</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#334155' }}>
              {pkg.description}
            </p>
          </section>

          {/* Key Highlights */}
          {pkg.highlights && pkg.highlights.length > 0 && (
            <section style={{ marginBottom: '3rem', background: '#fff', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Expedition Highlights</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {pkg.highlights.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.35rem', borderRadius: '8px' }}>
                      <CheckCircle size={16} />
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interactive Day-by-Day Itinerary */}
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>Day-by-Day Experience</h2>
            {pkg.itinerary && pkg.itinerary.length > 0 ? (
              pkg.itinerary.map((dayItem) => (
                <div key={dayItem.day} className="itinerary-day-card">
                  <div className="day-badge">Day {dayItem.day}</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>{dayItem.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                      {dayItem.desc}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Detailed itinerary will be provided upon booking confirmation.</p>
            )}
          </section>

          {/* Included & Excluded */}
          <section style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} /> What's Included
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                {(pkg.included || ['5-Star Luxury Accommodations', 'Airport VIP Chauffeur Transfers', 'Professional English-Speaking Guide', 'Daily Gourmet Breakfast']).map((inc, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={14} color="var(--emerald)" /> {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--rose)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <XCircle size={18} /> What's Excluded
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                {(pkg.excluded || ['International Flights', 'Travel Insurance', 'Personal Expenses']).map((exc, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <XCircle size={14} color="var(--rose)" /> {exc}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div>
          <div className="booking-summary-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Price per traveler</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                  ${pkg.price}
                </div>
              </div>
              <div className="badge badge-success">Instant Confirmation</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Users size={14} /> Number of Travelers
              </label>
              <select
                className="form-control"
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Car size={14} /> Optional Dedicated Vehicle Add-on
              </label>
              <select
                className="form-control"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
              >
                <option value="">No Vehicle (Standard transfers only)</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} (+${v.pricePerDay * pkg.durationDays} for {pkg.durationDays} days)
                  </option>
                ))}
              </select>
            </div>

            {/* Breakdown */}
            <div style={{ margin: '1.5rem 0', padding: '1rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Package (${pkg.price} × {travelers})</span>
                <span style={{ fontWeight: 600 }}>${packageTotal}</span>
              </div>
              {selectedVehicle && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{selectedVehicle.name}</span>
                  <span style={{ fontWeight: 600 }}>+${vehicleTotal}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)', fontSize: '1.1rem', fontWeight: 800 }}>
                <span>Estimated Total</span>
                <span style={{ color: 'var(--primary)' }}>${grandTotal}</span>
              </div>
            </div>

            <Link
              to={`/book/${pkg.id}?travelers=${travelers}${selectedVehicleId ? `&vehicleId=${selectedVehicleId}` : ''}`}
              className="btn btn-primary btn-block btn-lg"
            >
              <span>Proceed to Booking</span>
              <ArrowRight size={18} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--emerald)" /> Secure 256-bit SSL Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
