import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, ArrowRight } from 'lucide-react';

export const PackageCard = ({ pkg }) => {
  return (
    <div className="package-card">
      <div className="card-image-wrap">
        <img src={pkg.imageUrl} alt={pkg.title} className="card-image" />
        <span className="card-badge-category">{pkg.category}</span>
        <div className="card-rating-badge">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>{pkg.rating || 4.9}</span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({pkg.reviewCount || 40}+)</span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-destination">
          <MapPin size={14} />
          <span>{pkg.destination}</span>
        </div>
        <h3 className="card-title">{pkg.title}</h3>
        <p className="card-desc">{pkg.description}</p>

        <div className="card-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} />
            <span>{pkg.durationDays} Days / {pkg.durationNights || pkg.durationDays - 1} Nights</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} />
            <span>Flexible Dates</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="card-price-block">
            <span className="price-label">Starting From</span>
            <span className="price-amount">${pkg.price} <small style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>/person</small></span>
          </div>
          <Link to={`/package/${pkg.id}`} className="btn btn-primary btn-sm">
            <span>Explore</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
