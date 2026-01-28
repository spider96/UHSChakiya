import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { getUser, saveUser, removeUser } from '../utils/storage';

export const AuthContext = createContext();

/**
 * GLOBAL LOGOUT BRIDGE
 * Allows API layer to force logout
 */
let logoutRef = null;

export const globalLogout = async (reason) => {
  if (logoutRef) {
    await logoutRef(reason);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Restore session ONCE
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const savedUser = await getUser();
        setUser(savedUser);
      } catch (err) {
        console.error('Failed to restore user:', err);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = async (userData) => {
    await saveUser(userData);
    setUser(userData);
  };

  const logout = useCallback(async (reason = null) => {
    try {
      if (reason === 'EXPIRED') {
        Alert.alert(
          'Session Expired',
          'Your session has timed out. Please login again.',
          [{ text: 'OK' }]
        );
      }

      await removeUser();
      setUser(null);

    } catch (error) {
      console.error('Logout process error:', error);
    }
  }, []);

  // 🔹 Register logout bridge SAFELY
  useEffect(() => {
    logoutRef = logout;
    return () => {
      logoutRef = null;
    };
  }, [logout]);

  // 🚨 CRITICAL FIX: DO NOT RENDER APP UNTIL AUTH IS READY
  if (loading) {
    return null; // or <SplashScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
