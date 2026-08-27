

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

## 🔑 Demo Logins
- **Traveler Demo**: `traveler@tourist.com` (Click **"Traveler Demo"** on the Login screen)
- **Admin Demo**: `admin@tourist.com` (Click **"Admin Demo"** on the Login screen)
