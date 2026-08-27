import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, Search, Star, MapPin, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('Mountain');
  const [durationDays, setDurationDays] = useState(7);
  const [price, setPrice] = useState(1500);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    const data = await api.getPackages();
    setPackages(data);
    setLoading(false);
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setDestination('');
    setCategory('Mountain');
    setDurationDays(7);
    setPrice(1200);
    setImageUrl('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80');
    setDescription('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (pkg) => {
    setEditingId(pkg.id);
    setTitle(pkg.title);
    setDestination(pkg.destination);
    setCategory(pkg.category);
    setDurationDays(pkg.durationDays);
    setPrice(pkg.price);
    setImageUrl(pkg.imageUrl);
    setDescription(pkg.description);
    setModalOpen(true);
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    const pkgPayload = {
      title,
      destination,
      category,
      durationDays: Number(durationDays),
      durationNights: Number(durationDays) - 1,
      price: Number(price),
      imageUrl,
      description,
      featured: true,
      highlights: ['5-Star Luxury Accommodations', 'Private Guided Tour', 'Daily Breakfast Included']
    };

    if (editingId) {
      await api.updatePackage(editingId, pkgPayload);
    } else {
      await api.createPackage(pkgPayload);
    }

    setModalOpen(false);
    loadPackages();
  };

  const handleDeletePackage = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this package?')) {
      await api.deletePackage(id);
      loadPackages();
    }
  };

  const filteredPackages = packages.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-tag">Catalogue Management</span>
            <h1 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>Manage Tour Packages</h1>
          </div>
          <button onClick={handleOpenCreateModal} className="btn btn-primary">
            <Plus size={16} /> Add New Package
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--border-color)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', maxWidth: '400px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Filter packages..."
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Packages Table */}
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Price / Person</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={pkg.imageUrl} alt={pkg.title} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>{pkg.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} /> {pkg.destination}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="card-badge-category" style={{ position: 'static', display: 'inline-block' }}>
                      {pkg.category}
                    </span>
                  </td>
                  <td>{pkg.durationDays} Days</td>
                  <td style={{ fontWeight: 800 }}>${pkg.price}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={14} fill="#f59e0b" color="#f59e0b" /> {pkg.rating || 4.9}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/package/${pkg.id}`} className="btn btn-secondary btn-sm" title="Preview Public Page">
                        <Eye size={14} />
                      </Link>
                      <button onClick={() => handleOpenEditModal(pkg)} className="btn btn-secondary btn-sm" title="Edit Package">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDeletePackage(pkg.id)} className="btn btn-danger btn-sm" title="Delete Package">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>{editingId ? 'Edit Tour Package' : 'Create New Tour Package'}</h3>
              <button onClick={() => setModalOpen(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <form onSubmit={handleSavePackage}>
              <div className="form-group">
                <label className="form-label">Package Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Swiss Alps Explorer"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Zermatt, Switzerland"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {['Mountain', 'Beach', 'Cultural', 'Wildlife', 'Luxury', 'Adventure'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Duration (Days)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={durationDays}
                    onChange={(e) => setDurationDays(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price per Person ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description & Itinerary Summary</label>
                <textarea
                  rows={4}
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the adventure, accommodations, and unique highlights..."
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
