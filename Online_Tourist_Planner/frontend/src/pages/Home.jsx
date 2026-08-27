import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { PackageCard } from '../components/PackageCard';
import { Search, MapPin, Sparkles, Filter, ShieldCheck, Users, Globe2, Star, Car, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [packages, setPackages] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter States
  const [searchDestination, setSearchDestination] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = ['All', 'Mountain', 'Beach', 'Cultural', 'Wildlife', 'Luxury', 'Adventure'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [pkgs, vehs] = await Promise.all([
      api.getPackages(),
      api.getVehicles()
    ]);
    setPackages(pkgs);
    setVehicles(vehs);
    setLoading(false);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const filtered = await api.getPackages({
      destination: searchDestination,
      category: selectedCategory,
      maxPrice: maxPrice ? Number(maxPrice) : undefined
    });
    setPackages(filtered);
    setLoading(false);
  };

  const handleCategoryChange = async (cat) => {
    setSelectedCategory(cat);
    setLoading(true);
    const filtered = await api.getPackages({
      destination: searchDestination,
      category: cat,
      maxPrice: maxPrice ? Number(maxPrice) : undefined
    });
    setPackages(filtered);
    setLoading(false);
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={16} />
            <span>Discover Unforgettable Expeditions Worldwide</span>
          </div>

          <h1 className="hero-title">
            Plan, Explore & Book Your <span>Dream Vacation</span>
          </h1>

          <p className="hero-subtitle">
            Curated international itineraries, all-terrain luxury vehicle fleets, 5-star alpine chalets, and private concierge for effortless travel.
          </p>

          {/* Interactive Search Bar */}
          <form className="search-filter-box" onSubmit={handleSearchSubmit}>
            <div className="search-field">
              <label className="search-label">
                <MapPin size={14} /> Destination
              </label>
              <input
                type="text"
                placeholder="Where to? (e.g. Switzerland, Bali...)"
                className="search-input"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label className="search-label">
                <Filter size={14} /> Category
              </label>
              <select
                className="search-select"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c} Tours</option>
                ))}
              </select>
            </div>

            <div className="search-field">
              <label className="search-label">
                <span>$</span> Max Budget
              </label>
              <input
                type="number"
                placeholder="Up to ($ USD)"
                className="search-input"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <Search size={18} />
              <span>Search Trips</span>
            </button>
          </form>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>12,800+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Happy Global Travelers</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)', fontFamily: 'var(--font-heading)' }}>48+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Destination Countries</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>99.4%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>5-Star Verified Reviews</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--emerald)', fontFamily: 'var(--font-heading)' }}>24/7</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Live Concierge Assistance</div>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="section" id="packages">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Handcrafted Packages</span>
            <h2 className="section-title">Trending Global Destinations</h2>
            <p className="section-desc">
              All-inclusive travel packages including 5-star accommodations, daily guided adventures, gourmet culinary experiences, and VIP tickets.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Packages Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <h3>Loading curated packages...</h3>
            </div>
          ) : packages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>No packages match your search criteria.</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try clearing filters or adjusting your budget.</p>
              <button onClick={() => { setSearchDestination(''); setSelectedCategory('All'); setMaxPrice(''); loadData(); }} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* VEHICLES FLEET SECTION */}
      <section className="section" id="vehicles" style={{ background: '#f1f5f9' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
              Private Chauffeur & Self-Drive
            </span>
            <h2 className="section-title">Premium Vehicle Fleet</h2>
            <p className="section-desc">
              Elevate your vacation with luxury SUVs, off-road 4x4s, and executive VIP vans equipped for ultimate comfort and scenic driving.
            </p>
          </div>

          <div className="grid-3">
            {vehicles.map((v) => (
              <div key={v.id} className="vehicle-card">
                <div className="vehicle-img-wrap">
                  <img src={v.imageUrl} alt={v.name} />
                  <span className="badge badge-success" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    {v.status}
                  </span>
                </div>
                <div className="vehicle-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase' }}>{v.type}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 700 }}>
                      <Star size={14} fill="#f59e0b" color="#f59e0b" /> {v.rating}
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{v.name}</h3>

                  <div className="vehicle-specs">
                    <span>👥 {v.capacity} Passengers</span>
                    <span>⚙️ {v.transmission}</span>
                    <span>⛽ {v.fuelType}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', margin: '0.75rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {Array.isArray(v.features) && v.features.slice(0, 2).map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CheckCircle2 size={13} color="var(--emerald)" /> {f}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <div>
                      <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>${v.pricePerDay}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}> /day</span>
                    </div>
                    <Link to="/#packages" className="btn btn-secondary btn-sm">
                      Bundle with Tour
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The WanderLust Standard</span>
            <h2 className="section-title">Why Travel With Us?</h2>
          </div>

          <div className="grid-3">
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Zero-Stress Protection</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Free cancellation up to 48 hours before departure, trip protection insurance, and verified local guides for full peace of mind.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '12px', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Globe2 size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Tailor-Made Add-ons</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Customize any itinerary with private vehicle rentals, helicopter flyovers, private chefs, and custom photography packages.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Dedicated Concierge</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Your personal travel specialist is available on WhatsApp / Phone 24/7 during your trip to handle restaurant reservations and VIP requests.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
