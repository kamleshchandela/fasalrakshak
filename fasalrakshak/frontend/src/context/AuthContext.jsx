import React, { createContext, useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const hasClerk = PUBLISHABLE_KEY?.startsWith('pk_');

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  let clerkUser = null;
  let signOut = null;
  
  if (hasClerk) {
    const { user: clerk, isLoaded } = useUser();
    const { signOut: clerkSignOut } = useAuth();
    clerkUser = clerk;
    signOut = clerkSignOut;
    
    useEffect(() => {
      if (isLoaded) {
        if (clerk) {
          const userData = {
            id: clerk.id,
            firstName: clerk.firstName,
            lastName: clerk.lastName,
            email: clerk.primaryEmailAddress?.emailAddress,
            imageUrl: clerk.imageUrl,
            fullName: clerk.fullName,
            totalScans: 0, 
          };
          setUser(userData);
          localStorage.setItem('fasalrakshak_user', JSON.stringify(userData));
        } else {
          const stored = localStorage.getItem('fasalrakshak_user');
          if (stored) setUser(JSON.parse(stored));
        }
        setIsLoading(false);
      }
    }, [clerk, isLoaded]);
  } else {
    useEffect(() => {
      const stored = localStorage.getItem('fasalrakshak_user');
      if (stored) setUser(JSON.parse(stored));
      setIsLoading(false);
    }, []);
  }

  const loginContext = (userData) => {
    setUser(userData);
    localStorage.setItem('fasalrakshak_user', JSON.stringify(userData));
  };

  const logoutContext = async () => {
    if (signOut) {
      try { await signOut(); } catch (err) { console.error('Logout error:', err); }
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
