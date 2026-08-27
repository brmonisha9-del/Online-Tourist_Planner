import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, Calendar, Users, Car, CreditCard, ShieldCheck, 
  ArrowLeft, ArrowRight, Sparkles, Download, Luggage 
} from 'lucide-react';
import { validateDates, validateCard } from '../../utils/formValidation';

export const BookPackage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pkg, setPkg] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [error, setError] = useState('');

  // Form Fields
  const [travelersCount, setTravelersCount] = useState(Number(searchParams.get('travelers')) || 2);
  const [selectedVehicleId, setSelectedVehicleId] = useState(searchParams.get('vehicleId') || '');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState('');
  const [userName, setUserName] = useState(user?.name || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [userPhone, setUserPhone] = useState(user?.phone || '+1 (555) 019-2834');
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment Form Fields
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('742');
  const [cardHolder, setCardHolder] = useState(user?.name || 'Alex Morgan');

  useEffect(() => {
    loadData();
  }, [id]);

  useEffect(() => {
    if (pkg && startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + (pkg.durationDays || 5));
      setEndDate(end.toISOString().split('T')[0]);
    }
  }, [pkg, startDate]);

  const loadData = async () => {
    setLoading(true);
    const [foundPkg, allVehicles] = await Promise.all([
      api.getPackageById(id),
      api.getVehicles()
    ]);
    setPkg(foundPkg);
    setVehicles(allVehicles);
    setLoading(false);
  };

  const selectedVehicle = vehicles.find(v => String(v.id) === String(selectedVehicleId));
  const packageTotal = (pkg?.price || 0) * travelersCount;
  const vehicleTotal = selectedVehicle ? (selectedVehicle.pricePerDay * (pkg?.durationDays || 5)) : 0;
  const grandTotal = packageTotal + vehicleTotal;

  const handleNextToPayment = (e) => {
    e.preventDefault();
    setError('');
    const dateErr = validateDates(startDate, endDate);
    if (dateErr) {
      setError(dateErr);
      return;
    }
    setStep(2);
  };

  const handleCompleteBooking = async (e) => {
    e.preventDefault();
    setError('');

    const cardErr = validateCard(cardNumber, cardExpiry, cardCvv);
    if (cardErr) {
      setError(cardErr);
      return;
    }

    setLoading(true);
    try {
      const newBooking = await api.createBooking({
        userId: user?.id || null,
        userName: userName || user?.name || 'Traveler',
        userEmail: userEmail || user?.email || 'traveler@tourist.com',
        userPhone: userPhone || '+1 (555) 000-0000',
        packageId: pkg.id,
        tourPackage: pkg,
        vehicleId: selectedVehicle ? selectedVehicle.id : null,
        vehicle: selectedVehicle || null,
        startDate,
        endDate,
        travelersCount,
        packagePrice: packageTotal,
        vehiclePrice: vehicleTotal,
        totalAmount: grandTotal,
        paymentMethod: 'Credit Card (Visa/Master)',
        specialRequests
      });

      setConfirmedBooking(newBooking);
      setStep(3);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    } catch (err) {
      setError('Booking processing encountered an error.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !pkg) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Loading reservation portal...</h2>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Package not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Packages</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem', maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-tag">Express Checkout</span>
        <h1 style={{ fontSize: '2.25rem', marginTop: '0.5rem' }}>{pkg.title}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Complete your trip reservation in a few simple steps</p>
      </div>

      {/* Progress Steps Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: step >= 1 ? 'var(--primary)' : 'var(--text-muted)' }}>
          <span style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: step >= 1 ? 'var(--primary)' : '#e2e8f0', color: step >= 1 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
          <span>Trip Details</span>
        </div>
        <div style={{ width: '40px', height: '2px', background: step >= 2 ? 'var(--primary)' : '#e2e8f0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: step >= 2 ? 'var(--primary)' : 'var(--text-muted)' }}>
          <span style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: step >= 2 ? 'var(--primary)' : '#e2e8f0', color: step >= 2 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
          <span>Payment</span>
        </div>
        <div style={{ width: '40px', height: '2px', background: step === 3 ? 'var(--primary)' : '#e2e8f0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: step === 3 ? 'var(--primary)' : 'var(--text-muted)' }}>
          <span style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: step === 3 ? 'var(--emerald)' : '#e2e8f0', color: step === 3 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          <span>Confirmed</span>
        </div>
      </div>

      {error && (
        <div style={{ background: 'var(--rose-light)', color: '#9f1239', padding: '0.85rem 1.25rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {/* STEP 1: Traveler Details & Dates */}
      {step === 1 && (
        <form onSubmit={handleNextToPayment} style={{ background: '#fff', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>1. Traveler & Schedule Information</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address (for vouchers)</label>
              <input
                type="email"
                className="form-control"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Travelers</label>
              <select
                className="form-control"
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Add Dedicated Fleet Vehicle (Optional)</label>
            <select
              className="form-control"
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
            >
              <option value="">No Additional Dedicated Vehicle</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.type}) - ${v.pricePerDay}/day (+${v.pricePerDay * pkg.durationDays} for entire trip)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Special Requests / Dietary Needs</label>
            <textarea
              rows={3}
              placeholder="e.g. Vegetarian diet, honeymoon setup, airport booster seat..."
              className="form-control"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>

          {/* Summary Box */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700 }}>Total Trip Cost ({pkg.durationDays} Days, {travelersCount} Travelers)</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Includes accommodations, activities, taxes and fees</div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
              ${grandTotal}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to={`/package/${pkg.id}`} className="btn btn-secondary">
              <ArrowLeft size={16} /> Back to Overview
            </Link>
            <button type="submit" className="btn btn-primary btn-lg">
              <span>Continue to Payment</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Secure Payment */}
      {step === 2 && (
        <form onSubmit={handleCompleteBooking} style={{ background: '#fff', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem' }}>2. Payment & Confirmation</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--emerald)', fontSize: '0.85rem', fontWeight: 700 }}>
              <ShieldCheck size={16} /> 256-Bit Encrypted
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Name on Card</label>
            <input
              type="text"
              className="form-control"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className="form-control"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="form-group">
              <label className="form-label">Expiration (MM/YY)</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="form-control"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">CVV / CVC</label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                className="form-control"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Amount Box */}
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span>{pkg.title} ({travelersCount} travelers)</span>
              <span>${packageTotal}</span>
            </div>
            {selectedVehicle && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>{selectedVehicle.name} ({pkg.durationDays} days)</span>
                <span>+${vehicleTotal}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '1.3rem', fontWeight: 800 }}>
              <span>Total To Charge</span>
              <span style={{ color: 'var(--primary)' }}>${grandTotal}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
              <ArrowLeft size={16} /> Back to Details
            </button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              <CreditCard size={18} />
              <span>{loading ? 'Processing Payment...' : `Pay $${grandTotal} & Confirm`}</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Confirmed & Voucher */}
      {step === 3 && confirmedBooking && (
        <div style={{ background: '#fff', padding: '3rem 2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-xl)', textAlign: 'center' }}>
          <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%', background: 'var(--emerald-light)', color: 'var(--emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <CheckCircle size={40} />
          </div>

          <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Reservation Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
            A confirmation voucher and receipt have been dispatched to <strong>{confirmedBooking.userEmail}</strong>.
          </p>

          <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '16px', border: '1px dashed var(--border-color)', maxWidth: '500px', margin: '0 auto 2.5rem auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Booking Reference:</span>
              <strong style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '1.1rem' }}>{confirmedBooking.bookingReference}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Expedition:</span>
              <strong>{pkg.title}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Travel Dates:</span>
              <strong>{confirmedBooking.startDate} to {confirmedBooking.endDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Travelers:</span>
              <strong>{confirmedBooking.travelersCount} Persons</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Amount Paid:</span>
              <strong style={{ color: 'var(--emerald)', fontSize: '1.15rem' }}>${confirmedBooking.totalAmount}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => alert(`Downloading official PDF travel voucher for ${confirmedBooking.bookingReference}...`)} 
              className="btn btn-secondary"
            >
              <Download size={16} /> Download Travel Voucher (PDF)
            </button>
            <Link to="/my-bookings" className="btn btn-primary">
              <Luggage size={16} /> View in My Bookings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
