import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_TRAVELER = {
  id: 'usr-traveler-1',
  name: 'Alex Morgan',
  email: 'traveler@tourist.com',
  role: 'ROLE_USER',
  phone: '+1 (555) 234-5678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  country: 'United States'
};

const DEMO_ADMIN = {
  id: 'usr-admin-1',
  name: 'Elena Rostova',
  email: 'admin@tourist.com',
  role: 'ROLE_ADMIN',
  phone: '+1 (555) 888-9999',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  country: 'Administrator'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('wt_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('wt_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wt_auth_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);

    const emailTrimmed = email.toLowerCase().trim();

    if (emailTrimmed === 'admin@tourist.com') {
      setUser(DEMO_ADMIN);
      return DEMO_ADMIN;
    } else {
      const regularUser = {
        id: `usr-${Date.now()}`,
        name: emailTrimmed.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()),
        email: emailTrimmed,
        role: 'ROLE_USER',
        phone: '+1 (555) 019-2834',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        country: 'Traveler'
      };
      setUser(regularUser);
      return regularUser;
    }
  };

  const loginAsDemoTraveler = () => {
    setUser(DEMO_TRAVELER);
    return DEMO_TRAVELER;
  };

  const loginAsDemoAdmin = () => {
    setUser(DEMO_ADMIN);
    return DEMO_ADMIN;
  };

  const register = async (formData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);

    const newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name || 'New Traveler',
      email: formData.email.toLowerCase().trim(),
      role: 'ROLE_USER',
      phone: formData.phone || '+1 (555) 000-0000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      country: formData.country || 'Global Explorer'
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginAsDemoTraveler,
        loginAsDemoAdmin,
        register,
        logout,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
