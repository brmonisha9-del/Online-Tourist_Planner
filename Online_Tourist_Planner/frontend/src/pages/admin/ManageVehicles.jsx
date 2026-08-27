import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, Car, Users, Fuel, Settings } from 'lucide-react';

export const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [name, setName] = useState('');
  const [type, setType] = useState('SUV');
  const [capacity, setCapacity] = useState(5);
  const [pricePerDay, setPricePerDay] = useState(120);
  const [transmission, setTransmission] = useState('Automatic');
  const [fuelType, setFuelType] = useState('Hybrid');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('AVAILABLE');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    const data = await api.getVehicles();
    setVehicles(data);
    setLoading(false);
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setName('');
    setType('SUV');
    setCapacity(5);
    setPricePerDay(120);
    setTransmission('Automatic');
    setFuelType('Hybrid');
    setImageUrl('https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80');
    setStatus('AVAILABLE');
    setModalOpen(true);
  };

  const handleOpenEditModal = (v) => {
    setEditingId(v.id);
    setName(v.name);
    setType(v.type);
    setCapacity(v.capacity);
    setPricePerDay(v.pricePerDay);
    setTransmission(v.transmission);
    setFuelType(v.fuelType);
    setImageUrl(v.imageUrl);
    setStatus(v.status);
    setModalOpen(true);
  };

  const handleSaveVehicle = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      type,
      capacity: Number(capacity),
      pricePerDay: Number(pricePerDay),
      transmission,
      fuelType,
      imageUrl,
      status,
      features: ['All-Terrain Navigation', 'Air Conditioning', 'Luggage Space']
    };

    if (editingId) {
      await api.updateVehicle(editingId, payload);
    } else {
      await api.createVehicle(payload);
    }

    setModalOpen(false);
    loadVehicles();
  };

  const handleDeleteVehicle = async (id) => {
    if (window.confirm('Delete this vehicle from fleet?')) {
      await api.deleteVehicle(id);
      loadVehicles();
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-tag" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>Fleet Management</span>
            <h1 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>Fleet & Dedicated Transport</h1>
          </div>
          <button onClick={handleOpenCreateModal} className="btn btn-primary">
            <Plus size={16} /> Add New Vehicle
          </button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid-3">
          {vehicles.map((v) => (
            <div key={v.id} className="vehicle-card" style={{ background: '#fff' }}>
              <div className="vehicle-img-wrap">
                <img src={v.imageUrl} alt={v.name} />
                <span className={`badge ${v.status === 'AVAILABLE' ? 'badge-success' : 'badge-warning'}`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                  {v.status}
                </span>
              </div>
              <div className="vehicle-info">
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase' }}>
                  {v.type}
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: '0.25rem 0 0.5rem 0' }}>{v.name}</h3>

                <div className="vehicle-specs">
                  <span><Users size={13} style={{ display: 'inline' }} /> {v.capacity} Seats</span>
                  <span><Settings size={13} style={{ display: 'inline' }} /> {v.transmission}</span>
                  <span><Fuel size={13} style={{ display: 'inline' }} /> {v.fuelType}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>${v.pricePerDay}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/day</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => handleOpenEditModal(v)} className="btn btn-secondary btn-sm">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDeleteVehicle(v.id)} className="btn btn-danger btn-sm">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>{editingId ? 'Edit Fleet Vehicle' : 'Add Vehicle to Fleet'}</h3>
              <button onClick={() => setModalOpen(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <form onSubmit={handleSaveVehicle}>
              <div className="form-group">
                <label className="form-label">Vehicle Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Range Rover Velar"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Vehicle Category</label>
                  <select
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {['SUV', 'Sedan', 'Van', 'Luxury Coach', '4x4 Offroad'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Passenger Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Price per Day ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Operational Status</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="BOOKED">BOOKED</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Vehicle Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Save Vehicle' : 'Add to Fleet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
