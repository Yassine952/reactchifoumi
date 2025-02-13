import React, { createContext, useState, useEffect } from 'react';
import { login as authLogin, getToken, register as authRegister, logout as authLogout, getUsername } from "../services/authService";
import notyf from "../../src/utils/notyf"; // Import de Notyf


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(getToken()); 

  // Charger l'utilisateur si un token est déjà présent
  useEffect(() => {
    const savedToken = getToken();
    const savedUsername = getUsername();
    if (savedToken && savedUsername) {
      setToken(savedToken);
      setUser({ username: savedUsername });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authLogin(username, password); // Appelle `authService.login`
      setUser({ username }); // Met à jour l'état utilisateur
      setToken(getToken()); // Récupère le token depuis localStorage
      notyf.success(`Bienvenue ${username} !`);
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
      notyf.error("Échec de la connexion");
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const data = await authRegister(username, password);
      setUser({ username });
      setToken(getToken()); // Récupère et stocke le token après inscription
      notyf.success(`Bienvenue ${username}`);
      return data;
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      notyf.error(error.message)
      throw error;
    }
  };

  const logout = () => {
    authLogout(); // Supprime le token du stockage
    setToken(null);
    setUser(null);
    notyf.success("Au revoir !");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
