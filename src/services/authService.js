import axios from 'axios';

const API_BASE_URL = 'https://reactchifoumi-5x54.vercel.app';

// Fonction pour gérer le login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password
    });

    const { token } = response.data;

    if (token) {
      localStorage.setItem('token', token); // On stocke le token JWT dans le local storage
      localStorage.setItem('username', username);
    }

    return response.data;
  } catch (error) {
    console.error('Échec de la connexion', error);
    throw new Error('Échec de la connexion');
  }
};

// Fonction pour s'enregistrer
export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      password
    });

    // Après inscription, on appelle directement la fonction login pour se co automatiquement
    return await login(username, password);
  } catch (error) {
    console.error('Échec de l’inscription', error);
    throw new Error('Échec de l’inscription');
  }
};

// Fonction pour récupérer le token stocké
export const getToken = () => {
  return localStorage.getItem('token');
};

// Fonction pour récupérer le username stocké
export const getUsername = () => {
  return localStorage.getItem('username');
};

// Fonction pour déconnexion (supprime le token)
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username'); 
  console.log('Déconnecté, token supprimé');
};
