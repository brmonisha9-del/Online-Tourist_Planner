// ========================================================
// WanderLust Tourist Planner - Form Validation Utilities
// ========================================================

export const validateEmail = (email) => {
  if (!email) return 'Email is required.';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) {
    return 'Please enter a valid email address.';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required.';
  if (phone.trim().length < 8) {
    return 'Please enter a valid phone number (at least 8 digits).';
  }
  return null;
};

export const validateDates = (startDate, endDate) => {
  if (!startDate) return 'Start date is required.';
  if (!endDate) return 'End date is required.';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) {
    return 'Start date cannot be in the past.';
  }
  if (end <= start) {
    return 'End date must be after the start date.';
  }
  return null;
};

export const validateTravelers = (count) => {
  const num = Number(count);
  if (!num || num < 1) return 'Must have at least 1 traveler.';
  if (num > 30) return 'For groups over 30, please contact our VIP desk.';
  return null;
};

export const validateCard = (cardNumber, expiry, cvv) => {
  const cardClean = (cardNumber || '').replace(/\s+/g, '');
  if (!cardClean || cardClean.length < 15) {
    return 'Please enter a valid 16-digit card number.';
  }
  if (!expiry || !expiry.includes('/')) {
    return 'Please enter valid expiry date (MM/YY).';
  }
  if (!cvv || cvv.length < 3) {
    return 'Please enter a valid 3 or 4-digit CVV.';
  }
  return null;
};
