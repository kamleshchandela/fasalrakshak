import React, { createContext, useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      if (clerkUser) {
        // Map Clerk user to our local user format for premium consistency
        const userData = {
          id: clerkUser.id,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          email: clerkUser.primaryEmailAddress?.emailAddress,
          imageUrl: clerkUser.imageUrl,
          fullName: clerkUser.fullName,
          totalScans: 0, 
        };
        setUser(userData);
        localStorage.setItem('fasalrakshak_user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('fasalrakshak_user');
      }
    }
  }, [clerkUser, isLoaded]);

  const loginContext = (userData) => {
    setUser(userData);
    localStorage.setItem('fasalrakshak_user', JSON.stringify(userData));
  };

  const logoutContext = async () => {
    try {
      await signOut();
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

  return (
    <AuthContext.Provider value={{
      user,
      isLoading: !isLoaded || (clerkUser && !user),
      isLoggedIn: !!user,
      login: loginContext,
      logout: logoutContext,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
