import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentSession,
  loginUser,
  registerUser,
  sendPasswordReset,
  logoutUser,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session from storage on app load
  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setUser(session);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe = false) => {
    const sessionUser = await loginUser(email, password, rememberMe);
    setUser(sessionUser);
    return sessionUser;
  };

  const register = async (userData) => {
    return await registerUser(userData);
  };

  const forgotPassword = async (email) => {
    return await sendPasswordReset(email);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    forgotPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
