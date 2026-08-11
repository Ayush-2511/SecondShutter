import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // Initialize from localStorage or default to null
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('second_shutter_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (mockUserData) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 600));
    const userData = mockUserData || { id: 'user_001', name: 'John Doe', email: 'john@example.com' };
    setUser(userData);
    localStorage.setItem('second_shutter_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('second_shutter_user');
  };

  const continueAsGuest = () => {
    // Guest doesn't set a user, they just navigate away from login
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}
