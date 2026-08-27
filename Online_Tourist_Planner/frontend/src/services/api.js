// ========================================================
// WanderLust Tourist Planner - API & Data Service
// Seamless dual-mode: Real Spring Boot Backend or Local Storage Fallback
// ========================================================

const API_BASE_URL = 'http://localhost:8080/api';

// Initial Mock Packages
const INITIAL_PACKAGES = [
  {
    id: 1,
    title: 'Swiss Alps Majestic Expedition',
    destination: 'Interlaken & Zermatt, Switzerland',
    category: 'Mountain',
    durationDays: 7,
    durationNights: 6,
    price: 1850,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience the crown jewel of Europe with panoramic alpine train rides, cable cars across glacial peaks, luxury chalet stays, and guided scenic hikes across the Matterhorn and Jungfraujoch.',
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Scenic Train to Interlaken', desc: 'Welcome dinner overlooking Lake Brienz and luxury hotel check-in.' },
      { day: 2, title: 'Top of Europe - Jungfraujoch Excursion', desc: 'Ascend the cogwheel railway through Eiger mountain to Europe’s highest railway station.' },
      { day: 3, title: 'Lauterbrunnen Valley & 72 Waterfalls Hike', desc: 'Stroll through the fairytale valley with traditional Swiss fondue lunch.' },
      { day: 4, title: 'Glacier Express to Zermatt', desc: 'Iconic panoramic train ride across high mountain passes.' },
      { day: 5, title: 'Matterhorn Sunrise & Gornergrat Summit', desc: 'Spectacular 360-degree views of 29 four-thousand-meter peaks.' },
      { day: 6, title: 'Alpine Spa & Wine Tasting in Valais', desc: 'Relaxing thermal spring baths and cellar tasting.' },
      { day: 7, title: 'Farewell Zurich & Departure', desc: 'Souvenir shopping and private airport transfer.' }
    ],
    highlights: [
      'Jungfraujoch Glacier Train Included',
      '5-Star Alpine Chalet Accommodation',
      'Daily Gourmet Swiss Breakfast & Dinners',
      'Matterhorn View Balcony Suite'
    ],
    included: [
      'All Airport & Inter-city Transfers',
      '5-Star Boutique Hotels with Mountain Views',
      'VIP Mountain Passes & Cable Car Access',
      'Professional Mountain Guide',
      'Breakfast & 4 Premium Dinners'
    ],
    excluded: [
      'International Flights',
      'Personal Travel Insurance',
      'Alcoholic Beverages outside tastings'
    ]
  },
  {
    id: 2,
    title: 'Bali Tropical Paradise & Culture Oasis',
    destination: 'Ubud & Nusa Penida, Indonesia',
    category: 'Beach',
    durationDays: 6,
    durationNights: 5,
    price: 890,
    rating: 4.8,
    reviewCount: 94,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immerse in emerald rice terraces, sacred water temples, world-class yoga retreats, and private catamaran cruises to turquoise Nusa Penida cliffs.',
    itinerary: [
      { day: 1, title: 'Arrival in Denpasar & Private Transfer to Ubud', desc: 'Check-in to jungle pool villa with traditional Balinese welcome blessing.' },
      { day: 2, title: 'Tegallalang Rice Terraces & Sacred Monkey Forest', desc: 'Guided walk, jungle swing photo session, and organic coffee plantation tour.' },
      { day: 3, title: 'Mount Batur Sunrise Trek & Hot Springs', desc: 'Early morning volcano climb followed by mineral volcanic soak.' },
      { day: 4, title: 'Speedboat to Nusa Penida Island', desc: 'Visit Kelingking T-Rex cliff, Angel Billabong, and swim with Manta Rays.' },
      { day: 5, title: 'Seminyak Beach Club & Sunset Seafood Feast', desc: 'Relaxing beach day in beachfront cabana with sunset dining in Jimbaran.' },
      { day: 6, title: 'Artisan Markets & Departure Transfer', desc: 'Handicrafts shopping and departure.' }
    ],
    highlights: [
      'Private Luxury Jungle Pool Villa',
      'Nusa Penida Manta Ray Snorkeling',
      'Mount Batur Sunrise Experience',
      'Balinese Spa Treatment Included'
    ],
    included: [
      'Private Air-Conditioned SUV throughout',
      'Private Pool Villa Stay',
      'All Ferry & Island Entry Tickets',
      'Daily Breakfast & Beach Club Vouchers'
    ],
    excluded: [
      'Flight Tickets',
      'Optional Water Sports',
      'Tipping'
    ]
  },
  {
    id: 3,
    title: 'Kyoto & Tokyo Blossom Wonderland',
    destination: 'Kyoto, Mt. Fuji & Tokyo, Japan',
    category: 'Cultural',
    durationDays: 8,
    durationNights: 7,
    price: 2150,
    rating: 4.95,
    reviewCount: 160,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Blend ancient imperial shrines and tranquil bamboo groves with Shinkansen bullet trains, neon Tokyo skyline, and private onsen ryokan overlooking Mount Fuji.',
    itinerary: [
      { day: 1, title: 'Tokyo Arrival & Shinjuku Neon Night Tour', desc: 'Private transfer to Tokyo Grand Hotel and Izakaya welcome tour.' },
      { day: 2, title: 'Asakusa Sensoji & Shibuya Sky Observation', desc: 'Historic temple visit followed by 360-degree glass skydeck.' },
      { day: 3, title: 'Bullet Train to Hakone & Mount Fuji Onsen', desc: 'Cruise Lake Ashi with views of Fuji, stay at authentic Ryokan with Kaiseki banquet.' },
      { day: 4, title: 'Bullet Train to Kyoto & Gion Geisha District', desc: 'Evening lantern walking tour of preserved ancient alleys.' },
      { day: 5, title: 'Fushimi Inari 10,000 Torii & Arashiyama Bamboo', desc: 'Photographic morning hike and traditional tea ceremony.' },
      { day: 6, title: 'Nara Deer Park & Todai-ji Great Buddha', desc: 'Feed gentle sacred deer and explore the largest wooden temple.' },
      { day: 7, title: 'Osaka Dotonbori Street Food Extravaganza', desc: 'Culinary tour of Takoyaki, Wagyu, and vibrant entertainment.' },
      { day: 8, title: 'Kansai Departure', desc: 'Private bullet train transfer to airport.' }
    ],
    highlights: [
      '7-Day Unlimited Japan Rail Pass included',
      'Traditional Ryokan with Private Onsen',
      'Tea Ceremony & Kimono Experience',
      'Kaiseki Multi-Course Dinner'
    ],
    included: [
      '7-Day High-Speed Shinkansen Pass',
      '4-Star Hotels & 1 Night Onsen Ryokan',
      'English Speaking Certified Master Guide',
      'Breakfast Daily + 2 Signature Dinners'
    ],
    excluded: [
      'International Airfare',
      'Personal expenses'
    ]
  },
  {
    id: 4,
    title: 'Serengeti & Masai Mara Wildlife Safari',
    destination: 'Serengeti, Tanzania & Kenya',
    category: 'Wildlife',
    durationDays: 7,
    durationNights: 6,
    price: 2450,
    rating: 4.9,
    reviewCount: 78,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80'],
    description: 'Witness the Great Migration, the Big Five, and sleep under millions of stars in luxury tented camps with bush dinners and hot air balloon sunrise rides.',
    itinerary: [
      { day: 1, title: 'Arusha Arrival & Briefing', desc: 'Meet your safari naturalist and transfer to luxury lodge.' },
      { day: 2, title: 'Tarangire National Park Elephant Safari', desc: 'Game drive among ancient baobab trees and giant elephant herds.' },
      { day: 3, title: 'Ngorongoro Crater UNESCO Wonder', desc: 'Descend into the volcanic caldera for dense predator sightings.' },
      { day: 4, title: 'Serengeti Central Plains Game Drives', desc: 'Lions, leopards, and cheetah tracking in custom 4x4 pop-up roof safari land cruisers.' },
      { day: 5, title: 'Hot Air Balloon Safari over Endless Plains', desc: 'Floating sunrise flight with champagne bush breakfast.' },
      { day: 6, title: 'Masai Cultural Village & Mara River', desc: 'Traditional tribal dance and hippo / crocodile viewing.' },
      { day: 7, title: 'Bush Flight to Kilimanjaro Airport', desc: 'Scenic light aircraft flight and international departure.' }
    ],
    highlights: ['Hot Air Balloon Sunrise Included', 'Luxury Glamping under African Skies', 'Big 5 Guaranteed Sightings'],
    included: ['All 4x4 Land Cruiser Game Drives', 'Luxury Tented Camp Accommodations', 'All Park & Conservation Fees'],
    excluded: ['International Flights', 'Visa Fees', 'Guide Gratuities']
  },
  {
    id: 5,
    title: 'Amalfi Coast & Capri Dream Escape',
    destination: 'Amalfi, Positano & Capri, Italy',
    category: 'Luxury',
    durationDays: 5,
    durationNights: 4,
    price: 1620,
    rating: 4.85,
    reviewCount: 112,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'],
    description: 'Cliffside pastel villas, private yacht charter to the Blue Grotto in Capri, Ravello gardens, and Michelin-star Mediterranean dining overlooking the sparkling sea.',
    itinerary: [
      { day: 1, title: 'Naples to Positano Private Chauffeur', desc: 'Check-in to cliffside boutique hotel with prosecco welcome.' },
      { day: 2, title: 'Private Riva Yacht Charter to Capri Island', desc: 'Swim in hidden sea caves, visit Faraglioni Rocks and Capri Piazzetta.' },
      { day: 3, title: 'Path of the Gods Scenic Coastal Hike', desc: 'Breathtaking panorama above the clouds followed by lemon grove lunch.' },
      { day: 4, title: 'Ravello Villa Cimbrone & Infinity Terrace', desc: 'Classical music gardens and sunset limoncello masterclass.' },
      { day: 5, title: 'Sorrento & Naples Departure', desc: 'Scenic drive transfer to airport.' }
    ],
    highlights: ['Private Capri Yacht Day Charter', 'Cliffside Sea-View Suite', 'Limoncello Masterclass with Local Farm'],
    included: ['Luxury Sea-View Accommodation', 'Private Yacht with Skipper & Drinks', 'All Chauffeur Driven Transfers'],
    excluded: ['Flights', 'City Tourist Tax']
  },
  {
    id: 6,
    title: 'Patagonia Glacier & Torres del Paine Trek',
    destination: 'El Calafate & Torres del Paine, Chile & Argentina',
    category: 'Adventure',
    durationDays: 8,
    durationNights: 7,
    price: 2290,
    rating: 4.92,
    reviewCount: 65,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80'],
    description: 'Explore the raw edges of the earth with crampon ice walks on Perito Moreno Glacier, granite towers of Torres del Paine, and cozy Patagonian eco-domes.',
    itinerary: [
      { day: 1, title: 'Arrival in El Calafate', desc: 'Welcome dinner with traditional Patagonian roast lamb.' },
      { day: 2, title: 'Perito Moreno Glacier Ice Trekking', desc: 'Walk on blue ice formations with professional glaciologists.' },
      { day: 3, title: 'Cross Andes Border to Torres del Paine', desc: 'Scenic border crossing into Chilean national park.' },
      { day: 4, title: 'Base of the Towers Epic Hike', desc: 'Full-day trek to the iconic three granite spires.' },
      { day: 5, title: 'French Valley & Glacial Lakes', desc: 'Hike surrounded by hanging glaciers and turquoise waters.' },
      { day: 6, title: 'Grey Glacier Boat Navigation', desc: 'Cruise right up to the massive ice wall.' },
      { day: 7, title: 'Return to El Calafate & Estancia Horseback Ride', desc: 'Traditional ranch experience.' },
      { day: 8, title: 'Departure', desc: 'Airport transfer.' }
    ],
    highlights: ['Glacier Crampon Trekking Included', 'EcoCamp Dome Suite Stay', 'All Chilean & Argentine Park Fees'],
    included: ['All Park Admissions', 'Eco-Lodge & 4-Star Accommodations', 'All Transport & Glacial Navigation'],
    excluded: ['International Flights', 'Personal Trekking Equipment']
  }
];

// Initial Mock Vehicles
const INITIAL_VEHICLES = [
  {
    id: 1,
    name: 'Range Rover Velar Luxury Edition',
    type: 'SUV',
    capacity: 5,
    pricePerDay: 140,
    transmission: 'Automatic',
    fuelType: 'Mild Hybrid Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    features: ['Panoramic Glass Roof', 'All-Terrain 4WD', 'Meridian Surround Sound', 'Integrated GPS Navigation', 'Heated Leather Seats'],
    status: 'AVAILABLE',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Mercedes-Benz V-Class VIP Van',
    type: 'Van',
    capacity: 7,
    pricePerDay: 180,
    transmission: 'Automatic',
    fuelType: 'Diesel Eco',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['Captain Reclining Seats', 'Conference Table', 'High-Speed In-Car Wi-Fi', 'Large Luggage Capacity', 'Dual Zone Climate Control'],
    status: 'AVAILABLE',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Toyota Land Cruiser Prado 4x4',
    type: '4x4 Offroad',
    capacity: 6,
    pricePerDay: 125,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80',
    features: ['Snorkel & High Ground Clearance', 'Roof Rack & Tent Mounts', 'Heavy Duty Suspension', 'Emergency Satellite Beacon', 'Cooler Box Included'],
    status: 'AVAILABLE',
    rating: 4.95
  },
  {
    id: 4,
    name: 'BMW 5 Series Executive Sedan',
    type: 'Sedan',
    capacity: 4,
    pricePerDay: 110,
    transmission: 'Automatic',
    fuelType: 'Plug-in Hybrid',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    features: ['Smooth Executive Ride', 'Head-Up Display', 'Wireless Apple CarPlay / Android Auto', 'Harman Kardon Audio', 'Adaptive Cruise Control'],
    status: 'AVAILABLE',
    rating: 4.8
  },
  {
    id: 5,
    name: 'Mercedes Sprinter Luxury Tourer',
    type: 'Luxury Coach',
    capacity: 14,
    pricePerDay: 260,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    features: ['Reclining Coach Seats', 'Overhead Video Screens', 'Luggage Trailer', 'Microphone PA System', 'USB Ports at Every Seat'],
    status: 'AVAILABLE',
    rating: 4.9
  }
];

// Initial Sample Bookings
const INITIAL_BOOKINGS = [
  {
    id: 1,
    bookingReference: 'WL-2026-89421',
    userId: 'usr-traveler-1',
    userName: 'Alex Morgan',
    userEmail: 'traveler@tourist.com',
    userPhone: '+1 (555) 234-5678',
    packageId: 1,
    tourPackage: INITIAL_PACKAGES[0],
    vehicleId: 1,
    vehicle: INITIAL_VEHICLES[0],
    startDate: '2026-09-15',
    endDate: '2026-09-22',
    travelersCount: 2,
    packagePrice: 3700,
    vehiclePrice: 980,
    totalAmount: 4680,
    paymentMethod: 'Credit Card (Visa)',
    paymentStatus: 'PAID',
    bookingStatus: 'CONFIRMED',
    specialRequests: 'Vegetarian meals preferred on alpine train.',
    createdAt: '2026-08-20T10:30:00Z'
  },
  {
    id: 2,
    bookingReference: 'WL-2026-77312',
    userId: 'usr-traveler-1',
    userName: 'Alex Morgan',
    userEmail: 'traveler@tourist.com',
    userPhone: '+1 (555) 234-5678',
    packageId: 2,
    tourPackage: INITIAL_PACKAGES[1],
    vehicleId: null,
    vehicle: null,
    startDate: '2026-10-10',
    endDate: '2026-10-16',
    travelersCount: 2,
    packagePrice: 1780,
    vehiclePrice: 0,
    totalAmount: 1780,
    paymentMethod: 'Credit Card (MasterCard)',
    paymentStatus: 'PAID',
    bookingStatus: 'CONFIRMED',
    specialRequests: 'Honeymoon arrangement with flower setup in pool villa.',
    createdAt: '2026-08-24T14:15:00Z'
  }
];

// Helper to get / set LocalStorage
const getStorage = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStorage = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error', e);
  }
};

// Initialize Storage if empty
if (!localStorage.getItem('wt_packages')) {
  setStorage('wt_packages', INITIAL_PACKAGES);
}
if (!localStorage.getItem('wt_vehicles')) {
  setStorage('wt_vehicles', INITIAL_VEHICLES);
}
if (!localStorage.getItem('wt_bookings')) {
  setStorage('wt_bookings', INITIAL_BOOKINGS);
}

// ==========================================
// API EXPORT OBJECT
// ==========================================
export const api = {
  // PACKAGES
  async getPackages(filter = {}) {
    try {
      const res = await fetch(`${API_BASE_URL}/packages`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch {}

    // Fallback to local storage
    let pkgs = getStorage('wt_packages', INITIAL_PACKAGES);
    if (filter.category && filter.category !== 'All') {
      pkgs = pkgs.filter(p => p.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.destination && filter.destination.trim()) {
      const query = filter.destination.toLowerCase().trim();
      pkgs = pkgs.filter(p => 
        p.destination.toLowerCase().includes(query) || 
        p.title.toLowerCase().includes(query)
      );
    }
    if (filter.maxPrice) {
      pkgs = pkgs.filter(p => p.price <= Number(filter.maxPrice));
    }
    return pkgs;
  },

  async getPackageById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/packages/${id}`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {}

    const pkgs = getStorage('wt_packages', INITIAL_PACKAGES);
    return pkgs.find(p => String(p.id) === String(id)) || null;
  },

  async createPackage(packageData) {
    const pkgs = getStorage('wt_packages', INITIAL_PACKAGES);
    const newPkg = {
      ...packageData,
      id: Date.now(),
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString()
    };
    pkgs.unshift(newPkg);
    setStorage('wt_packages', pkgs);

    try {
      await fetch(`${API_BASE_URL}/packages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPkg),
        signal: AbortSignal.timeout(1500)
      });
    } catch {}

    return newPkg;
  },

  async updatePackage(id, packageData) {
    const pkgs = getStorage('wt_packages', INITIAL_PACKAGES);
    const index = pkgs.findIndex(p => String(p.id) === String(id));
    if (index !== -1) {
      pkgs[index] = { ...pkgs[index], ...packageData };
      setStorage('wt_packages', pkgs);
    }

    try {
      await fetch(`${API_BASE_URL}/packages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageData),
        signal: AbortSignal.timeout(1500)
      });
    } catch {}

    return pkgs[index];
  },

  async deletePackage(id) {
    const pkgs = getStorage('wt_packages', INITIAL_PACKAGES);
    const filtered = pkgs.filter(p => String(p.id) !== String(id));
    setStorage('wt_packages', filtered);

    try {
      await fetch(`${API_BASE_URL}/packages/${id}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(1500)
      });
    } catch {}

    return true;
  },

  // VEHICLES
  async getVehicles(filter = {}) {
    try {
      const res = await fetch(`${API_BASE_URL}/vehicles`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch {}

    let vehicles = getStorage('wt_vehicles', INITIAL_VEHICLES);
    if (filter.type && filter.type !== 'All') {
      vehicles = vehicles.filter(v => v.type.toLowerCase() === filter.type.toLowerCase());
    }
    if (filter.status) {
      vehicles = vehicles.filter(v => v.status === filter.status);
    }
    return vehicles;
  },

  async getVehicleById(id) {
    const vehicles = getStorage('wt_vehicles', INITIAL_VEHICLES);
    return vehicles.find(v => String(v.id) === String(id)) || null;
  },

  async createVehicle(vehicleData) {
    const vehicles = getStorage('wt_vehicles', INITIAL_VEHICLES);
    const newVeh = {
      ...vehicleData,
      id: Date.now(),
      rating: 5.0,
      status: vehicleData.status || 'AVAILABLE',
      createdAt: new Date().toISOString()
    };
    vehicles.unshift(newVeh);
    setStorage('wt_vehicles', vehicles);
    return newVeh;
  },

  async updateVehicle(id, vehicleData) {
    const vehicles = getStorage('wt_vehicles', INITIAL_VEHICLES);
    const index = vehicles.findIndex(v => String(v.id) === String(id));
    if (index !== -1) {
      vehicles[index] = { ...vehicles[index], ...vehicleData };
      setStorage('wt_vehicles', vehicles);
    }
    return vehicles[index];
  },

  async deleteVehicle(id) {
    const vehicles = getStorage('wt_vehicles', INITIAL_VEHICLES);
    const filtered = vehicles.filter(v => String(v.id) !== String(id));
    setStorage('wt_vehicles', filtered);
    return true;
  },

  // BOOKINGS
  async getBookings(userEmail = null) {
    try {
      const url = userEmail ? `${API_BASE_URL}/bookings?email=${encodeURIComponent(userEmail)}` : `${API_BASE_URL}/bookings`;
      const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch {}

    let bookings = getStorage('wt_bookings', INITIAL_BOOKINGS);
    if (userEmail) {
      bookings = bookings.filter(b => b.userEmail?.toLowerCase() === userEmail.toLowerCase());
    }
    return bookings;
  },

  async createBooking(bookingData) {
    const bookings = getStorage('wt_bookings', INITIAL_BOOKINGS);
    const refNum = Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      bookingReference: `WL-2026-${refNum}`,
      bookingStatus: 'CONFIRMED',
      paymentStatus: 'PAID',
      createdAt: new Date().toISOString()
    };
    bookings.unshift(newBooking);
    setStorage('wt_bookings', bookings);

    try {
      await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
        signal: AbortSignal.timeout(1500)
      });
    } catch {}

    return newBooking;
  },

  async updateBookingStatus(id, newStatus) {
    const bookings = getStorage('wt_bookings', INITIAL_BOOKINGS);
    const index = bookings.findIndex(b => String(b.id) === String(id));
    if (index !== -1) {
      bookings[index].bookingStatus = newStatus;
      if (newStatus === 'CANCELLED') {
        bookings[index].paymentStatus = 'REFUNDED';
      }
      setStorage('wt_bookings', bookings);
    }
    return bookings[index];
  },

  async cancelBooking(id) {
    return this.updateBookingStatus(id, 'CANCELLED');
  }
};
