import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PackageDetails } from './pages/user/PackageDetails';
import { BookPackage } from './pages/user/BookPackage';
import { MyBookings } from './pages/user/MyBookings';

// Admin Pages
import { Dashboard } from './pages/admin/Dashboard';
import { ManagePackages } from './pages/admin/ManagePackages';
import { ManageVehicles } from './pages/admin/ManageVehicles';
import { Reports } from './pages/admin/Reports';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

// Layout wrapper to conditionally show public header/footer
const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public & Traveler Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/book/:id" element={<BookPackage />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/packages" element={<ManagePackages />} />
          <Route path="/admin/vehicles" element={<ManageVehicles />} />
          <Route path="/admin/reports" element={<Reports />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
