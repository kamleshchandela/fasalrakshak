import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to fetch current user profile from backend
  const fetchMe = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        
        // Ensure localStorage is updated
        const localData = JSON.parse(localStorage.getItem('fasalrakshak_user') || '{}');
        localStorage.setItem('fasalrakshak_user', JSON.stringify({
          ...localData,
          ...data.user,
        }));
      } else {
        // Token invalid or expired
        setUser(null);
        localStorage.removeItem('fasalrakshak_user');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
      localStorage.removeItem('fasalrakshak_user');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Check localStorage for instant UI load
    const storedUser = localStorage.getItem('fasalrakshak_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Error parsing local storage user data:', err);
      }
    }

    // 2. Call /api/auth/me in background to verify token
    fetchMe();
  }, []);

  const loginContext = (userData) => {
    setUser(userData);
    localStorage.setItem('fasalrakshak_user', JSON.stringify(userData));
  };

  const logoutContext = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    setUser(null);
    localStorage.removeItem('fasalrakshak_user');
  };

  const updateUser = (newData) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...newData };
      localStorage.setItem('fasalrakshak_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const incrementTotalScans = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, totalScans: (prev.totalScans || 0) + 1 };
      localStorage.setItem('fasalrakshak_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isLoggedIn: !!user,
      login: loginContext,
      logout: logoutContext,
      updateUser,
      incrementTotalScans
    }}>
      {children}
    </AuthContext.Provider>
  );
};
