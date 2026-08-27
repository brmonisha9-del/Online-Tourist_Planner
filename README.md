# 🌍 WanderLust - Online Tourist & Trip Planner

A state-of-the-art, full-stack Vacation Planning and Tourism Booking Platform built with **Spring Boot 3 (Java 17)** and **React 18 + Vite**. 

---

## 🌟 Key Features

### 👤 For Travelers & Explorers
- **Interactive Expedition Search**: Filter dream trips by destination, category (Mountain, Beach, Cultural, Wildlife, Luxury, Adventure), and budget.
- **Detailed Day-by-Day Itineraries**: Interactive schedule with photo galleries, inclusions, exclusions, and real traveler reviews.
- **Dedicated Fleet Vehicle Add-ons**: Bundle 4x4 SUVs, luxury vans, and executive sedans directly with tour packages.
- **Express Multi-Step Checkout**: Real-time price calculator, date selectors, special diet/custom requests, and instant 256-bit simulated payment.
- **Traveler Dashboard & Vouchers**: Manage bookings, print official travel vouchers, and perform instant cancellations.

### 🛡️ For Administrators & Tour Operators
- **Executive Analytics Dashboard**: Real-time KPI cards for gross revenue, active bookings, fleet utilization, and destination popularity.
- **Full Tour Package CRUD**: Create, edit, and delete vacation packages with custom itineraries and pricing.
- **Fleet Management**: Control vehicle availability, pricing, passenger capacities, and service statuses.
- **Financial Reports & Exports**: Destination revenue breakdown, booking status analytics, and 1-click CSV export.

---

## 🛠️ Project Structure

```
Online_Tourist_Planner/
├── backend/
│   ├── pom.xml                               # Spring Boot Maven configuration
│   └── src/main/
│       ├── java/com/touristplanner/
│       │   ├── TouristPlannerApplication.java # Entry point & Mock Data bootstrapper
│       │   ├── controller/                   # REST API Controllers (Auth, Package, Vehicle, Booking)
│       │   ├── entity/                       # JPA Entities (User, TourPackage, Vehicle, Booking)
│       │   ├── repository/                   # Spring Data JPA Repositories
│       │   └── service/                      # Business Logic Service Interfaces & Impl
│       └── resources/
│           └── application.properties        # Dual H2 / MySQL DB configuration
├── database/
│   └── schema.sql                            # Full MySQL / PostgreSQL schema & seed data
├── frontend/
│   ├── package.json                          # React, Vite, Lucide Icons, Canvas Confetti
│   ├── vite.config.js                        # Vite build configuration
│   ├── index.html                            # Root HTML template with Google Fonts
│   └── src/
│       ├── App.jsx                           # Application Router & Layout
│       ├── index.jsx                         # React Root render
│       ├── index.css                         # Glassmorphism Design System
│       ├── context/AuthContext.jsx           # Authentication state & 1-Click Demo Logins
│       ├── services/api.js                   # Dual-mode API (Spring Boot + localStorage fallback)
│       ├── utils/formValidation.js           # Form validation helpers
│       ├── components/                       # Navbar, Footer, Sidebar, PackageCard
│       └── pages/                            # Home, Login, Register, Details, Booking, Admin
├── run_demo.bat                              # 1-Click Windows Batch Runner
├── run_demo.ps1                              # 1-Click PowerShell Runner
└── README.md                                 # Complete Documentation
```

---

## 🚀 How to Run

### Option 1: Instant Demo (Frontend Standalone with Fallback DB)
1. Navigate to the project directory or double-click `Online_Tourist_Planner/run_demo.bat`:
   ```powershell
   cd Online_Tourist_Planner/frontend
   npm install
   npm run dev
   ```
2. Open your browser at `http://localhost:3000`.

### Option 2: Full Stack (Spring Boot Backend + React Frontend)
1. **Start the Backend**:
   ```bash
   cd Online_Tourist_Planner/backend
   mvn spring-boot:run
   ```
   *Spring Boot will start on `http://localhost:8080` with pre-loaded mock data and H2 console at `/h2-console`.*

2. **Start the Frontend**:
   ```bash
   cd Online_Tourist_Planner/frontend
   npm run dev
   ```

---

## 🔑 Demo Logins
- **Traveler Demo**: `traveler@tourist.com` (Click **"Traveler Demo"** on the Login screen)
- **Admin Demo**: `admin@tourist.com` (Click **"Admin Demo"** on the Login screen)
