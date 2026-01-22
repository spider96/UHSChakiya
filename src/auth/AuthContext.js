import React, { createContext, useState, useEffect } from 'react';
import { getUser, saveUser, removeUser } from '../utils/storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

/**
 * GLOBAL LOGOUT BRIDGE
 * This allows non-component files (like your API client) to 
 * trigger the logout logic inside this provider.
 */
let logoutRef;

export const globalLogout = async (reason) => {
  if (logoutRef) {
    await logoutRef(reason);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from AsyncStorage on app start
    getUser().then(savedUser => {
      setUser(savedUser);
      setLoading(false);
    });
  }, []);

  const login = async (userData) => {
    await saveUser(userData);
    setUser(userData);
  };

  const logout = async (reason = null) => {
    try {
      // Check if reason exists AND is 'EXPIRED'
      if (reason && reason === 'EXPIRED') {
        Alert.alert(
          "Session Expired",
          "Your session has timed out. Please login again.",
          [{ text: "OK" }]
        );
      }
      await removeUser();
      setUser(null);

    } catch (error) {
      console.error("Logout process error:", error);
    }

  };

  logoutRef = logout;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      loading,
      isLoggedIn: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};