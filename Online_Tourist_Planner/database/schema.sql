-- ========================================================
-- WanderLust Online Tourist Planner - Database Schema
-- Compatible with MySQL 8.0+ and PostgreSQL / H2
-- ========================================================

CREATE DATABASE IF NOT EXISTS tourist_planner_db;
USE tourist_planner_db;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'ROLE_USER',
    phone VARCHAR(25),
    country VARCHAR(80) DEFAULT 'Traveler',
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TOUR PACKAGES TABLE
CREATE TABLE IF NOT EXISTS tour_packages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Adventure, Beach, Mountain, Cultural, Wildlife, Luxury
    duration_days INT NOT NULL,
    duration_nights INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 4.8,
    review_count INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(500) NOT NULL,
    gallery_images JSON,
    description TEXT NOT NULL,
    itinerary_json JSON,
    highlights_json JSON,
    included_json JSON,
    excluded_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- SUV, Sedan, Van, Luxury Coach, 4x4 Offroad
    capacity INT NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    transmission VARCHAR(30) DEFAULT 'Automatic',
    fuel_type VARCHAR(30) DEFAULT 'Hybrid / Petrol',
    image_url VARCHAR(500) NOT NULL,
    features_json JSON,
    status VARCHAR(30) DEFAULT 'AVAILABLE', -- AVAILABLE, BOOKED, MAINTENANCE
    rating DECIMAL(2, 1) DEFAULT 4.9,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_reference VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(120) NOT NULL,
    user_phone VARCHAR(30) NOT NULL,
    package_id BIGINT NOT NULL,
    vehicle_id BIGINT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    travelers_count INT NOT NULL DEFAULT 1,
    package_price DECIMAL(10, 2) NOT NULL,
    vehicle_price DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Credit Card',
    payment_status VARCHAR(30) DEFAULT 'PAID', -- PENDING, PAID, REFUNDED
    booking_status VARCHAR(30) DEFAULT 'CONFIRMED', -- CONFIRMED, PENDING, COMPLETED, CANCELLED
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_booking_package FOREIGN KEY (package_id) REFERENCES tour_packages(id) ON DELETE CASCADE,
    CONSTRAINT fk_booking_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    package_id BIGINT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_avatar VARCHAR(500),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_package FOREIGN KEY (package_id) REFERENCES tour_packages(id) ON DELETE CASCADE
);

-- ========================================================
-- SEED DATA
-- ========================================================

-- Insert Users
INSERT INTO users (name, email, password, role, phone, country, avatar) VALUES
('Elena Rostova', 'admin@tourist.com', '$2a$10$7vj2Q.1fK9.5gG8Fk2Q8.eW/zV1dK.0pP3xO/6rV1dK0pP3xO6rV1', 'ROLE_ADMIN', '+1 (555) 888-9999', 'Switzerland', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'),
('Alex Morgan', 'traveler@tourist.com', '$2a$10$7vj2Q.1fK9.5gG8Fk2Q8.eW/zV1dK.0pP3xO/6rV1dK0pP3xO6rV1', 'ROLE_USER', '+1 (555) 234-5678', 'United States', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')
ON DUPLICATE KEY UPDATE email=email;

-- Insert Tour Packages
INSERT INTO tour_packages (id, title, destination, category, duration_days, duration_nights, price, rating, review_count, featured, image_url, gallery_images, description, itinerary_json, highlights_json, included_json, excluded_json) VALUES
(1, 'Swiss Alps Majestic Expedition', 'Interlaken & Zermatt, Switzerland', 'Mountain', 7, 6, 1850.00, 4.9, 128, TRUE, 
 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
 '["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80"]',
 'Experience the crown jewel of Europe with panoramic alpine train rides, cable cars across glacial peaks, luxury chalet stays, and guided scenic hikes across the Matterhorn and Jungfraujoch.',
 '[{"day": 1, "title": "Arrival in Zurich & Scenic Train to Interlaken", "desc": "Welcome dinner overlooking Lake Brienz and luxury hotel check-in."}, {"day": 2, "title": "Top of Europe - Jungfraujoch Excursion", "desc": "Ascend the cogwheel railway through Eiger mountain to Europe highest railway station."}, {"day": 3, "title": "Lauterbrunnen Valley & 72 Waterfalls Hike", "desc": "Stroll through the fairytale valley with traditional Swiss fondue lunch."}, {"day": 4, "title": "Glacier Express to Zermatt", "desc": "Iconic panoramic train ride across high mountain passes."}, {"day": 5, "title": "Matterhorn Sunrise & Gornergrat Summit", "desc": "Spectacular 360-degree views of 29 four-thousand-meter peaks."}, {"day": 6, "title": "Alpine Spa & Wine Tasting in Valais", "desc": "Relaxing thermal spring baths and cellar tasting."}, {"day": 7, "title": "Farewell Zurich & Departure", "desc": "Souvenir shopping and private airport transfer."}]',
 '["Jungfraujoch Glacier Train Included", "5-Star Alpine Chalet Accommodation", "Daily Gourmet Swiss Breakfast & Dinners", "Matterhorn View Balcony Suite"]',
 '["All Airport & Inter-city Transfers", "5-Star Boutique Hotels with Mountain Views", "VIP Mountain Passes & Cable Car Access", "Professional Mountain Guide", "Breakfast & 4 Premium Dinners"]',
 '["International Flights", "Personal Travel Insurance", "Alcoholic Beverages outside tastings"]'),

(2, 'Bali Tropical Paradise & Culture Oasis', 'Ubud & Nusa Penida, Indonesia', 'Beach', 6, 5, 890.00, 4.8, 94, TRUE,
 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
 '["https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"]',
 'Immerse in emerald rice terraces, sacred water temples, world-class yoga retreats, and private catamaran cruises to turquoise Nusa Penida cliffs.',
 '[{"day": 1, "title": "Arrival in Denpasar & Private Transfer to Ubud", "desc": "Check-in to jungle pool villa with traditional Balinese welcome blessing."}, {"day": 2, "title": "Tegallalang Rice Terraces & Sacred Monkey Forest", "desc": "Guided walk, jungle swing photo session, and organic coffee plantation tour."}, {"day": 3, "title": "Mount Batur Sunrise Trek & Hot Springs", "desc": "Early morning volcano climb followed by mineral volcanic soak."}, {"day": 4, "title": "Speedboat to Nusa Penida Island", "desc": "Visit Kelingking T-Rex cliff, Angel Billabong, and swim with Manta Rays."}, {"day": 5, "title": "Seminyak Beach Club & Sunset Seafood Feast", "desc": "Relaxing beach day in beachfront cabana with sunset dining in Jimbaran."}, {"day": 6, "title": "Artisan Markets & Departure Transfer", "desc": "Handicrafts shopping and departure."}]',
 '["Private Luxury Jungle Pool Villa", "Nusa Penida Manta Ray Snorkeling", "Mount Batur Sunrise Experience", "Balinese Spa Treatment Included"]',
 '["Private Air-Conditioned SUV throughout", "Private Pool Villa Stay", "All Ferry & Island Entry Tickets", "Daily Breakfast & Beach Club Vouchers"]',
 '["Flight Tickets", "Optional Water Sports", "Tipping"]'),

(3, 'Kyoto & Tokyo Blossom Wonderland', 'Kyoto, Mt. Fuji & Tokyo, Japan', 'Cultural', 8, 7, 2150.00, 4.95, 160, TRUE,
 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
 '["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80"]',
 'Blend ancient imperial shrines and tranquil bamboo groves with Shinkansen bullet trains, neon Tokyo skyline, and private onsen ryokan overlooking Mount Fuji.',
 '[{"day": 1, "title": "Tokyo Arrival & Shinjuku Neon Night Tour", "desc": "Private transfer to Tokyo Grand Hotel and Izakaya welcome tour."}, {"day": 2, "title": "Asakusa Sensoji & Shibuya Sky Observation", "desc": "Historic temple visit followed by 360-degree glass skydeck."}, {"day": 3, "title": "Bullet Train to Hakone & Mount Fuji Onsen", "desc": "Cruise Lake Ashi with views of Fuji, stay at authentic Ryokan with Kaiseki banquet."}, {"day": 4, "title": "Bullet Train to Kyoto & Gion Geisha District", "desc": "Evening lantern walking tour of preserved ancient alleys."}, {"day": 5, "title": "Fushimi Inari 10,000 Torii & Arashiyama Bamboo", "desc": "Photographic morning hike and traditional tea ceremony."}, {"day": 6, "title": "Nara Deer Park & Todai-ji Great Buddha", "desc": "Feed gentle sacred deer and explore the largest wooden temple."}, {"day": 7, "title": "Osaka Dotonbori Street Food Extravaganza", "desc": "Culinary tour of Takoyaki, Wagyu, and vibrant entertainment."}, {"day": 8, "title": "Kansai Departure", "desc": "Private bullet train transfer to airport."}]',
 '["7-Day Unlimited Japan Rail Pass included", "Traditional Ryokan with Private Onsen", "Tea Ceremony & Kimono Experience", "Kaiseki Multi-Course Dinner"]',
 '["7-Day High-Speed Shinkansen Pass", "4-Star Hotels & 1 Night Onsen Ryokan", "English Speaking Certified Master Guide", "Breakfast Daily + 2 Signature Dinners"]',
 '["International Airfare", "Personal expenses"]'),

(4, 'Serengeti & Masai Mara Wildlife Safari', 'Serengeti, Tanzania & Kenya', 'Wildlife', 7, 6, 2450.00, 4.9, 78, FALSE,
 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
 '["https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80"]',
 'Witness the Great Migration, the Big Five, and sleep under millions of stars in luxury tented camps with bush dinners and hot air balloon sunrise rides.',
 '[{"day": 1, "title": "Arusha Arrival & Briefing", "desc": "Meet your safari naturalist and transfer to luxury lodge."}, {"day": 2, "title": "Tarangire National Park Elephant Safari", "desc": "Game drive among ancient baobab trees and giant elephant herds."}, {"day": 3, "title": "Ngorongoro Crater UNESCO Wonder", "desc": "Descend into the volcanic caldera for dense predator sightings."}, {"day": 4, "title": "Serengeti Central Plains Game Drives", "desc": "Lions, leopards, and cheetah tracking in custom 4x4 pop-up roof safari land cruisers."}, {"day": 5, "title": "Hot Air Balloon Safari over Endless Plains", "desc": "Floating sunrise flight with champagne bush breakfast."}, {"day": 6, "title": "Masai Cultural Village & Mara River", "desc": "Traditional tribal dance and hippo / crocodile viewing."}, {"day": 7, "title": "Bush Flight to Kilimanjaro Airport", "desc": "Scenic light aircraft flight and international departure."}]',
 '["Hot Air Balloon Sunrise Included", "Luxury Glamping under African Skies", "Big 5 Guaranteed Sightings", "All National Park Entry Fees Included"]',
 '["All 4x4 Land Cruiser Game Drives", "Luxury Tented Camp Accommodations", "All Park & Conservation Fees", "All Meals & Bottled Water on Safari"]',
 '["International Flights", "Visa Fees", "Guide Gratuities"]'),

(5, 'Amalfi Coast & Capri Dream Escape', 'Amalfi, Positano & Capri, Italy', 'Luxury', 5, 4, 1620.00, 4.85, 112, TRUE,
 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
 '["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"]',
 'Cliffside pastel villas, private yacht charter to the Blue Grotto in Capri, Ravello gardens, and Michelin-star Mediterranean dining overlooking the sparkling sea.',
 '[{"day": 1, "title": "Naples to Positano Private Chauffeur", "desc": "Check-in to cliffside boutique hotel with prosecco welcome."}, {"day": 2, "title": "Private Riva Yacht Charter to Capri Island", "desc": "Swim in hidden sea caves, visit Faraglioni Rocks and Capri Piazzetta."}, {"day": 3, "title": "Path of the Gods Scenic Coastal Hike", "desc": "Breathtaking panorama above the clouds followed by lemon grove lunch."}, {"day": 4, "title": "Ravello Villa Cimbrone & Infinity Terrace", "desc": "Classical music gardens and sunset limoncello masterclass."}, {"day": 5, "title": "Sorrento & Naples Departure", "desc": "Scenic drive transfer to airport."}]',
 '["Private Capri Yacht Day Charter", "Cliffside Sea-View Suite", "Limoncello Masterclass with Local Farm", "Michelin Recommended Sunset Dinner"]',
 '["Luxury Sea-View Accommodation", "Private Yacht with Skipper & Drinks", "All Chauffeur Driven Transfers", "Breakfast Daily"]',
 '["Flights", "City Tourist Tax"]'),

(6, 'Patagonia Glacier & Torres del Paine Trek', 'El Calafate & Torres del Paine, Chile & Argentina', 'Adventure', 8, 7, 2290.00, 4.92, 65, FALSE,
 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
 '["https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80"]',
 'Explore the raw edges of the earth with crampon ice walks on Perito Moreno Glacier, granite towers of Torres del Paine, and cozy Patagonian eco-domes.',
 '[{"day": 1, "title": "Arrival in El Calafate", "desc": "Welcome dinner with traditional Patagonian roast lamb."}, {"day": 2, "title": "Perito Moreno Glacier Ice Trekking", "desc": "Walk on blue ice formations with professional glaciologists."}, {"day": 3, "title": "Cross Andes Border to Torres del Paine", "desc": "Scenic border crossing into Chilean national park."}, {"day": 4, "title": "Base of the Towers Epic Hike", "desc": "Full-day trek to the iconic three granite spires."}, {"day": 5, "title": "French Valley & Glacial Lakes", "desc": "Hike surrounded by hanging glaciers and turquoise waters."}, {"day": 6, "title": "Grey Glacier Boat Navigation", "desc": "Cruise right up to the massive ice wall."}, {"day": 7, "title": "Return to El Calafate & Estancia Horseback Ride", "desc": "Traditional ranch experience."}, {"day": 8, "title": "Departure", "desc": "Airport transfer."}]',
 '["Glacier Crampon Trekking Included", "EcoCamp Dome Suite Stay", "All Chilean & Argentine Park Fees", "Private Mountain Guide"]',
 '["All Park Admissions", "Eco-Lodge & 4-Star Accommodations", "All Transport & Glacial Navigation", "Full Board Meals during Treks"]',
 '["International Flights", "Personal Trekking Equipment"]');

-- Insert Vehicles Fleet
INSERT INTO vehicles (id, name, type, capacity, price_per_day, transmission, fuel_type, image_url, features_json, status, rating) VALUES
(1, 'Range Rover Velar Luxury Edition', 'SUV', 5, 140.00, 'Automatic', 'Mild Hybrid Petrol', 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', '["Panoramic Glass Roof", "All-Terrain 4WD", "Meridian Surround Sound", "Integrated GPS Navigation", "Heated Leather Seats"]', 'AVAILABLE', 4.9),
(2, 'Mercedes-Benz V-Class VIP Van', 'Van', 7, 180.00, 'Automatic', 'Diesel Eco', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', '["Captain Reclining Seats", "Conference Table", "High-Speed In-Car Wi-Fi", "Large Luggage Capacity", "Dual Zone Climate Control"]', 'AVAILABLE', 4.8),
(3, 'Toyota Land Cruiser Prado 4x4', '4x4 Offroad', 6, 125.00, 'Automatic', 'Diesel', 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80', '["Snorkel & High Ground Clearance", "Roof Rack & Tent Mounts", "Heavy Duty Suspension", "Emergency Satellite Beacon", "Cooler Box Included"]', 'AVAILABLE', 4.95),
(4, 'BMW 5 Series Executive Sedan', 'Sedan', 4, 110.00, 'Automatic', 'Plug-in Hybrid', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80', '["Smooth Executive Ride", "Head-Up Display", "Wireless Apple CarPlay / Android Auto", "Harman Kardon Audio", "Adaptive Cruise Control"]', 'AVAILABLE', 4.8),
(5, 'Mercedes Sprinter Luxury Tourer', 'Luxury Coach', 14, 260.00, 'Automatic', 'Diesel', 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80', '["Reclining Coach Seats", "Overhead Video Screens", "Luggage Trailer", "Microphone PA System", "USB Ports at Every Seat"]', 'AVAILABLE', 4.9);

-- Insert Sample Bookings
INSERT INTO bookings (id, booking_reference, user_id, user_name, user_email, user_phone, package_id, vehicle_id, start_date, end_date, travelers_count, package_price, vehicle_price, total_amount, payment_method, payment_status, booking_status, specialRequests) VALUES
(1, 'WL-2026-89421', 2, 'Alex Morgan', 'traveler@tourist.com', '+1 (555) 234-5678', 1, 1, '2026-09-15', '2026-09-22', 2, 3700.00, 980.00, 4680.00, 'Credit Card (Visa)', 'PAID', 'CONFIRMED', 'Vegetarian meals preferred on alpine train.'),
(2, 'WL-2026-77312', 2, 'Alex Morgan', 'traveler@tourist.com', '+1 (555) 234-5678', 2, NULL, '2026-10-10', '2026-10-16', 2, 1780.00, 0.00, 1780.00, 'Credit Card (MasterCard)', 'PAID', 'CONFIRMED', 'Honeymoon arrangement with flower setup.')
ON DUPLICATE KEY UPDATE id=id;
