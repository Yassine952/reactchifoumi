import React, { createContext, useState } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      setToken(data.token);
      setUser({ username });
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const data = await authService.register(username, password);
      setUser({ username });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
