import React, { createContext, useState, useEffect } from 'react';
import { getUser, saveUser, removeUser } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (userData) => {
    await saveUser(userData);
    setUser(userData);
  };

  const logout = async () => {
    await removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
