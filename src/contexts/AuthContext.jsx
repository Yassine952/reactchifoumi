import React, { createContext, useState, useEffect } from 'react';
import { login as authLogin, getToken, register as authRegister, logout as authLogout } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(getToken()); 

  // Charger l'utilisateur si un token est déjà présent
  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      setToken(savedToken);
      setUser({ username: "Utilisateur" }); // À remplacer par un appel API si nécessaire
    }
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authLogin(username, password); // Appelle `authService.login`
      setUser({ username }); // Met à jour l'état utilisateur
      setToken(getToken()); // Récupère le token depuis localStorage
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const data = await authRegister(username, password);
      setUser({ username });
      setToken(getToken()); // Récupère et stocke le token après inscription
      return data;
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      throw error;
    }
  };

  const logout = () => {
    authLogout(); // Supprime le token du stockage
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
