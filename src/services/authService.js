import axios from 'axios';

const API_BASE_URL = 'https://chifoumi.kmarques.dev';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password
    });

    const { token } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    }

    return response.data;
  } catch (error) {
    console.error('Échec de la connexion', error);
    throw new Error('Échec de la connexion');
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      password
    });

    return await login(username, password);
  } catch (error) {
    console.error('Échec de l’inscription', error);
    throw new Error('Échec de l’inscription');
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username'); 
  console.log('Déconnecté, token supprimé');
};
